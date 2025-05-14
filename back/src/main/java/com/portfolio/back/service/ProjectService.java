package com.portfolio.back.service;

import com.portfolio.back.domain.Project;
import com.portfolio.back.dto.ProjectRes;

import java.time.LocalDateTime;
import java.util.List;

public interface ProjectService {

    void createProject(Long portfolioId, String name);

    List<ProjectRes> getProjects(Long portfolioId);

    void removeProject(Long projectId);

    ProjectRes basicInfo(Long projectId, String name, String description, String startDate, String endDate, String link);
}
