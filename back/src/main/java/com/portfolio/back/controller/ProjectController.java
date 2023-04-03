package com.portfolio.back.controller;

import com.portfolio.back.domain.Project;
import com.portfolio.back.dto.*;
import com.portfolio.back.service.ImageService;
import com.portfolio.back.service.MainFnService;
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
    private final ImageService imageService;
    private final MainFnService mainFnService;

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

    @GetMapping("/images/{projectId}")
    public ResponseEntity<?> getProjectImages(@PathVariable("projectId") Long projectId) {
        List<ImageRes> images = imageService.getImagesByProject(projectId).stream().map(ImageRes::new).collect(Collectors.toList());
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("images", images);
        return ResponseEntity.ok(data);
    }

    @PutMapping("/images/{projectId}")
    public ResponseEntity<?> updateProjectImages(@PathVariable("projectId") Long projectId,
                                                 @RequestBody ProjectImagesInsertReq params) {
        imageService.updateProjectImages(projectId, params.getImages());
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/main-fn/{projectId}")
    public ResponseEntity<?> getProjectMainFns(@PathVariable("projectId") Long projectId) {
        List<MainFnRes> mainFns = mainFnService.getMainFnsByProject(projectId).stream().map(MainFnRes::new).collect(Collectors.toList());
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("mainFns", mainFns);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/main-fn/{projectId}")
    public ResponseEntity<?> createMainFns(@PathVariable("projectId") Long projectId, @RequestBody MainFnInsertReq params) {
        mainFnService.createMainFn(projectId, params.getName());
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        return ResponseEntity.ok(data);
    }

    @PutMapping("/basic-info/{projectId}")
    public ResponseEntity<?> updateProjectBasicInfo(@PathVariable("projectId") Long projectId, @RequestBody BasicInfoInsertReq params) {
        ProjectRes project = new ProjectRes(projectService.basicInfo(projectId, params.getName(), params.getDescription(), params.getPeriod(), params.getLink()));
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("project", project);
        return ResponseEntity.ok(data);
    }
}
