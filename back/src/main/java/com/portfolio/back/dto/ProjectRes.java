package com.portfolio.back.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.portfolio.back.domain.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class ProjectRes {

    private Long id;
    private String name;
    private String description;
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDateTime startDate;
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDateTime endDate;
    private String link;
    @Builder.Default
    private List<ImageDTO> images = new ArrayList<>();
    @Builder.Default
    private List<MainFnDTO> mainFns = new ArrayList<>();

    @Builder
    public ProjectRes(Project project) {
        this.id = project.getId();
        this.name = project.getName();
        this.description = project.getDescription();
        this.startDate = project.getStartDate();
        this.endDate = project.getEndDate();
        this.link = project.getLink();
        this.images = project.getImages().stream().map(ImageDTO::new).collect(Collectors.toList());
        this.mainFns = project.getMainFns().stream().map(MainFnDTO::new).collect(Collectors.toList());
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
}
