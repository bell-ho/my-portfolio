package com.portfolio.back.service;

import com.portfolio.back.domain.*;
import com.portfolio.back.dto.StackByProjectRes;
import com.portfolio.back.dto.StackByUserRes;
import com.portfolio.back.exception.CustomException;
import com.portfolio.back.repository.*;
import com.portfolio.back.utils.RequestResultEnum;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class StackServiceImpl implements StackService {

    private final JPAQueryFactory queryFactory;
    private final UserRepository userRepository;
    private final StackRepository stackRepository;
    private final UserStackMapRepository userStackMapRepository;
    private final ProjectRepository projectRepository;
    private final ProjectStackMapRepository projectStackMapRepository;

    @Override
    public List<StackByUserRes> getStacksWithUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));

        QStack stack = QStack.stack;
        QUserStackMap userStackMap = QUserStackMap.userStackMap;

        return queryFactory
                .select(
                        Projections.constructor(
                                StackByUserRes.class,
                                stack.id,
                                stack.name,
                                stack.code,
                                userStackMap.stack.id.coalesce(0L).as("userStackId"),
                                ExpressionUtils.as(
                                        JPAExpressions
                                                .selectOne()
                                                .from(userStackMap)
                                                .where(userStackMap.user.eq(user), userStackMap.stack.eq(stack))
                                                .exists(),
                                        "isUserStack"
                                )
                        )
                )
                .from(stack)
                .leftJoin(userStackMap)
                .on(userStackMap.user.eq(user), userStackMap.stack.eq(stack))
                .orderBy(stack.code.asc(), stack.name.asc())
                .fetch();
    }

    @Override
    public List<StackByProjectRes> getStacksWithProject(Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));

        QStack stack = QStack.stack;
        QProjectStackMap projectStackMap = QProjectStackMap.projectStackMap;

        return queryFactory
                .select(
                        Projections.constructor(
                                StackByProjectRes.class,
                                stack.id,
                                stack.name,
                                stack.code,
                                projectStackMap.stack.id.coalesce(0L).as("projectStackId"),
                                ExpressionUtils.as(
                                        JPAExpressions
                                                .selectOne()
                                                .from(projectStackMap)
                                                .where(projectStackMap.project.eq(project), projectStackMap.stack.eq(stack))
                                                .exists(),
                                        "isProjectStack"
                                )
                        )
                )
                .from(stack)
                .leftJoin(projectStackMap)
                .on(projectStackMap.project.eq(project), projectStackMap.stack.eq(stack))
                .where(stack.code.in(StackType.FE, StackType.BE, StackType.DP))
                .orderBy(stack.code.asc(), stack.name.asc())
                .fetch();
    }

    @Override
    @Transactional
    public Stack createStack(String target, Long targetId, String name, String code) {
        Stack stack = stackRepository.findByName(name)
                .orElseGet(() -> stackRepository.save(
                        Stack.create()
                                .name(name)
                                .code(StackType.valueOf(code))
                                .build()
                ));

        if (target.equals("user")) {
            User user = userRepository.findById(targetId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
            userStackMapRepository.save(UserStackMap.create()
                    .stack(stack)
                    .user(user)
                    .build());
        } else {
            Project project = projectRepository.findById(targetId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
            projectStackMapRepository.save(
                    ProjectStackMap.create()
                            .project(project)
                            .stack(stack)
                            .build()
            );
        }

        return stack;
    }

    @Override
    @Transactional
    public Stack updateTargetStacks(Long stackId, String target, Long targetId) {
        Stack stack = stackRepository.findById(stackId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));

        if (target.equals("user")) {
            User user = userRepository.findById(targetId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));

            Optional<UserStackMap> foundUserStack = userStackMapRepository.findByUserIdAndStackId(targetId, stackId);
            foundUserStack.ifPresentOrElse(
                    userStackMapRepository::delete,
                    () -> userStackMapRepository.save(UserStackMap.create()
                            .stack(stack)
                            .user(user)
                            .build())
            );

        } else {
            Project project = projectRepository.findById(targetId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
            Optional<ProjectStackMap> foundProjectStack = projectStackMapRepository.findByProjectIdAndStackId(targetId, stackId);

            foundProjectStack.ifPresentOrElse(
                    projectStackMapRepository::delete,
                    () -> projectStackMapRepository.save(
                            ProjectStackMap.create()
                                    .project(project)
                                    .stack(stack)
                                    .build()
                    )
            );
        }
        return stack;
    }
}
