package com.portfolio.back.service;

import com.portfolio.back.domain.*;
import com.portfolio.back.dto.ProjectRes;
import com.portfolio.back.exception.CustomException;
import com.portfolio.back.repository.PortfolioRepository;
import com.portfolio.back.repository.ProjectRepository;
import com.portfolio.back.utils.RequestResultEnum;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final PortfolioRepository portfolioRepository;
    private final JPAQueryFactory queryFactory;

    @Override
    @Transactional
    public void createProject(Long portfolioId, String name) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        projectRepository.save(Project.create().name(name).portfolio(portfolio).build());
    }

    @Override
    public List<ProjectRes> getProjects(Long portfolioId) {
        QProject project = QProject.project;
        QMainFn mainFn = QMainFn.mainFn;
        QImage image = QImage.image;

        return queryFactory
                .selectDistinct(project)
                .from(project)
                .leftJoin(project.mainFns, mainFn).fetchJoin()
                .leftJoin(project.images, image).fetchJoin()
                .where(project.portfolio.id.eq(portfolioId))
                .orderBy(project.modifiedDate.desc())
                .fetch().stream().map(ProjectRes::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void removeProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    @Override
    @Transactional
    public ProjectRes basicInfo(
            Long projectId,
            String name,
            String description,
            String startDate,
            String endDate,
            String link
    ) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        project.updateBasicInfo(name, description, startDate, endDate, link);
        return new ProjectRes(project);
    }
}
