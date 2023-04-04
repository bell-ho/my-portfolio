package com.portfolio.back.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.portfolio.back.domain.*;
import com.portfolio.back.dto.ProjectRes.ImageDTO;
import com.portfolio.back.dto.ProjectRes.MainFnDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class PortfolioInfoRes {

    private Long id;
    private String name;
    private String imageSrc;
    private String title;
    private String description;
    private AboutDTO about;
    @Builder.Default
    private List<UserStackDTO> userSkills = new ArrayList<>();
    @Builder.Default
    private List<ProjectDTO> projects = new ArrayList<>();

    @Builder
    public PortfolioInfoRes(Portfolio portfolio) {
        this.id = portfolio.getId();
        this.name = portfolio.getName();
        this.imageSrc = portfolio.getImage() != null ? portfolio.getImage().getSrc() : null;
        this.title = portfolio.getTitle() != null ? portfolio.getTitle() : null;
        this.description = portfolio.getDescription() != null ? portfolio.getDescription() : null;
        this.about = new AboutDTO(portfolio.getAbout());
        this.userSkills = portfolio.getUser().getUserStacks().stream().map(UserStackDTO::new).collect(Collectors.toList());
        this.projects = portfolio.getProjects().stream().map(ProjectDTO::new).collect(Collectors.toList());
    }

    @Getter
    @Setter
    public static class ProjectDTO{
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
        @Builder.Default
        private List<ProjectStackDTO> projectSkills = new ArrayList<>();
        @Builder
        public ProjectDTO(Project project) {
            this.id = project.getId();
            this.name = project.getName();
            this.description = project.getDescription();
            this.startDate = project.getStartDate();
            this.endDate = project.getEndDate();
            this.link = project.getLink();
            this.images = project.getImages().stream().map(ImageDTO::new).collect(Collectors.toList());
            this.mainFns = project.getMainFns().stream().map(MainFnDTO::new).collect(Collectors.toList());
            this.projectSkills = project.getProjectStacks().stream().map(ProjectStackDTO::new).collect(Collectors.toList());
        }

        @Getter
        @Setter
        public static class ProjectStackDTO{
            private Long id;
            private String name;
            private String code;

            @Builder
            public ProjectStackDTO(ProjectStackMap userStack) {
                this.id = userStack.getStack().getId();
                this.name = userStack.getStack().getName();
                this.code = String.valueOf(userStack.getStack().getCode());
            }
        }
    }

    @Getter
    @Setter
    public static class UserStackDTO{
        private Long id;
        private String name;
        private String code;

        @Builder
        public UserStackDTO(UserStackMap userStack) {
            this.id = userStack.getStack().getId();
            this.name = userStack.getStack().getName();
            this.code = String.valueOf(userStack.getStack().getCode());
        }
    }


    @Getter
    @Setter
    public static class AboutDTO {
        private String name;
        private String phone;
        private String email;

        @Builder
        public AboutDTO(About about) {
            this.name = about.getUserName();
            this.phone = about.getUserPhone();
            this.email = about.getUserEmail();
        }
    }
}
