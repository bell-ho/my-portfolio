package com.portfolio.back.dto;

import com.portfolio.back.domain.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class ProjectRes {

    private Long id;
    private String name;
    private String description;
    private String period;
    private String link;
    @Builder.Default
    private List<ImageDTO> images = new ArrayList<>();
    @Builder.Default
    private List<MainFnDTO> mainFns = new ArrayList<>();
    @Builder.Default
    private List<ProjectStacksDTO> projectStacks = new ArrayList<>();

    @Builder
    public ProjectRes(Project project) {
        this.id = project.getId();
        this.name = project.getName();
        this.description = project.getDescription();
        this.period = project.getPeriod();
        this.link = project.getLink();
        this.images = project.getImages().stream().map(ImageDTO::new).collect(Collectors.toList());
        this.mainFns = project.getMainFns().stream().map(MainFnDTO::new).collect(Collectors.toList());
        this.projectStacks = project.getProjectStacks().stream().map(ProjectStacksDTO::new).collect(Collectors.toList());
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ImageDTO{
        private Long id;
        private String src;

        @Builder
        public ImageDTO(Image image) {
            this.id = image.getId();
            this.src = image.getSrc();
        }
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MainFnDTO{
        private Long id;
        private String name;

        @Builder
        public MainFnDTO(MainFn mainFn) {
            this.id = mainFn.getId();
            this.name = mainFn.getName();
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProjectStacksDTO{
        private ProjectStackId id;
        private String name;
        private String code;

        @Builder
        public ProjectStacksDTO(ProjectStackMap projectStackMap) {
            this.id = projectStackMap.getId();
            this.name = projectStackMap.getStack().getName();
            this.code = String.valueOf(projectStackMap.getStack().getCode());
        }
    }
}
