package com.portfolio.back.service;

import com.portfolio.back.domain.*;
import com.portfolio.back.dto.StackByUserRes;
import com.portfolio.back.repository.StackRepository;
import com.portfolio.back.repository.UserRepository;
import com.portfolio.back.repository.UserStackMapRepository;
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

    @Override
    public List<StackByUserRes> getStacksWithUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));

        QStack stack = QStack.stack;
        QUserStackMap userStackMap = QUserStackMap.userStackMap;

        List<StackByUserRes> stacks = queryFactory
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

        return stacks;
    }

    @Override
    @Transactional
    public Stack createStack(Long userId, String name, String code) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));

        Stack stack = stackRepository.findByName(name)
                .orElseGet(() -> stackRepository.save(Stack.createStack(name, code)));

        userStackMapRepository.save(UserStackMap.createUserStack(user, stack));

        return stack;
    }

    @Override
    @Transactional
    public Stack updateUserStack(Long stackId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));
        Stack stack = stackRepository.findById(stackId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));

        Optional<UserStackMap> foundUserStack = userStackMapRepository.findByUserIdAndStackId(userId, stackId);
        if (foundUserStack.isPresent()) {
            userStackMapRepository.delete(foundUserStack.get());
        } else {
            userStackMapRepository.save(UserStackMap.createUserStack(user, stack));
        }
        return stack;
    }

    private boolean validDuplicateStack(String name) {
        Optional<Stack> stack = stackRepository.findByName(name);
        return stack.isPresent();
    }
}
