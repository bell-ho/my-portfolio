package com.portfolio.back.controller;

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

import static com.portfolio.back.utils.RequestResultEnum.SUCCESS;
import static com.portfolio.back.utils.ResponseData.fromResult;

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
        return ResponseEntity.ok(fromResult(SUCCESS));
    }

    @GetMapping("/portfolios/{portfolioId}")
    public ResponseEntity<?> getProjects(@PathVariable("portfolioId") Long portfolioId) {
        List<ProjectRes> projects = projectService.getProjects(portfolioId);
        return ResponseEntity.ok(fromResult(RequestResultEnum.SUCCESS).add("projects", projects));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> removeProject(@PathVariable("projectId") Long projectId) {
        projectService.removeProject(projectId);
        return ResponseEntity.ok(fromResult(SUCCESS));
    }

    @GetMapping("/images/{projectId}")
    public ResponseEntity<?> getProjectImages(@PathVariable("projectId") Long projectId) {
        List<ImageRes> images = imageService.getImagesByProject(projectId);
        return ResponseEntity.ok(fromResult(RequestResultEnum.SUCCESS).add("images", images));
    }

    @PutMapping("/images/{projectId}")
    public ResponseEntity<?> updateProjectImages(
            @PathVariable("projectId") Long projectId,
            @RequestBody ProjectImagesInsertReq params
    ) {
        imageService.updateProjectImages(projectId, params.getImages());
        return ResponseEntity.ok(fromResult(SUCCESS));
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
        return ResponseEntity.ok(fromResult(SUCCESS));
    }

    @PutMapping("/basic-info/{projectId}")
    public ResponseEntity<?> updateProjectBasicInfo(@PathVariable("projectId") Long projectId, @RequestBody BasicInfoInsertReq params) {
        ProjectRes project = projectService.basicInfo(projectId, params.getName(), params.getDescription(), params.getStartDate(), params.getEndDate(), params.getLink());
        return ResponseEntity.ok(fromResult(RequestResultEnum.SUCCESS).add("project", project));
    }
}
