package com.portfolio.back.controller;

import com.portfolio.back.domain.Project;
import com.portfolio.back.dto.ProjectInsertReq;
import com.portfolio.back.dto.ProjectRes;
import com.portfolio.back.service.ProjectService;
import com.portfolio.back.utils.RequestResultEnum;
import com.portfolio.back.utils.ResponseData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("/api/v1/projects")
@RestController
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping("/portfolios/{portfolioId}")
    public ResponseEntity<?> createProject(@PathVariable("portfolioId") Long portfolioId, @RequestBody ProjectInsertReq params) {
        projectService.createProject(portfolioId, params.getName());
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/portfolios/{portfolioId}")
    public ResponseEntity<?> getProjects(@PathVariable("portfolioId") Long portfolioId) {
        List<ProjectRes> projects = projectService.getProjects(portfolioId).stream().map(ProjectRes::new).collect(Collectors.toList());
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("projects", projects);
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> removeProject(@PathVariable("projectId") Long projectId) {
        projectService.removeProject(projectId);
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        return ResponseEntity.ok(data);
    }
}
