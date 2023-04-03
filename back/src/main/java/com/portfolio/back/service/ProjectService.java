package com.portfolio.back.service;

import com.portfolio.back.domain.Project;

import java.util.List;

public interface ProjectService {

    Project createProject(Long portfolioId, String name);

    List<Project> getProjects(Long portfolioId);

    void removeProject(Long projectId);

    Project basicInfo(Long projectId, String name, String description, String period, String link);
}
