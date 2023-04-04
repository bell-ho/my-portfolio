package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static javax.persistence.FetchType.LAZY;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "project")
@Builder
@Getter
@Setter
@Entity
public class Project extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "link")
    private String link;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectStackMap> projectStacks = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MainFn> mainFns = new HashSet<>();

    public static Project createProject(Portfolio portfolio, String name) {
        Project project = new Project();
        project.setPortfolio(portfolio);
        project.setName(name);
        return project;
    }

    public void updateBasicInfo(String name,
                                String description,
                                LocalDateTime startDate,
                                LocalDateTime endDate,
                                String link) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.link = link;
    }
}
