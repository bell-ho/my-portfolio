package com.portfolio.back.service;

import com.portfolio.back.domain.*;
import com.portfolio.back.repository.PortfolioRepository;
import com.portfolio.back.repository.ProjectRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final PortfolioRepository portfolioRepository;
    private final JPAQueryFactory queryFactory;

    @Override
    @Transactional
    public Project createProject(Long portfolioId, String name) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));

        return projectRepository.save(Project.createProject(portfolio, name));
    }

    @Override
    public List<Project> getProjects(Long portfolioId) {
        QProject project = QProject.project;
        QMainFn mainFn = QMainFn.mainFn;
        QImage image = QImage.image;

        return queryFactory
                .selectDistinct(project)
                .from(project)
                .leftJoin(project.mainFns, mainFn).fetchJoin()
                .leftJoin(project.images, image).fetchJoin()
                .orderBy(project.modifiedDate.desc())
                .fetch();
    }

    @Override
    @Transactional
    public void removeProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    @Override
    @Transactional
    public Project basicInfo(Long projectId,
                             String name,
                             String description,
                             String startDate,
                             String endDate,
                             String link) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));
        project.updateBasicInfo(name, description, startDate, endDate, link);
        return project;
    }
}
