package com.portfolio.back.service;

import com.portfolio.back.domain.*;
import com.portfolio.back.repository.PortfolioRepository;
import com.portfolio.back.repository.ProjectRepository;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        QProjectStackMap projectStackMap = QProjectStackMap.projectStackMap;

        List<Project> projects = queryFactory.selectDistinct(project)
                .from(project)
                .leftJoin(project.mainFns,mainFn).fetchJoin()
                .leftJoin(project.images, image).fetchJoin()
                .leftJoin(project.projectStacks, projectStackMap).fetchJoin()
                .orderBy(project.modifiedDate.desc())
                .fetch();

        return projects;
    }

    @Override
    @Transactional
    public void removeProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }
}
