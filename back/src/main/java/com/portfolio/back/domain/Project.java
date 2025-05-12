package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static javax.persistence.FetchType.LAZY;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "tmf_project")
@Getter
@Entity
public class Project extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Builder(builderMethodName = "create")
    public Project(String name,Portfolio portfolio){
        this.name = name;
        this.portfolio = portfolio;
    }

    public void updateBasicInfo(String name,
                                String description,
                                String startDate,
                                String endDate,
                                String link) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDateLocalDate = LocalDate.parse(startDate, formatter);
        LocalDate endDateLocalDate = LocalDate.parse(endDate, formatter);

        this.name = name;
        this.description = description;
        this.startDate = startDateLocalDate.atStartOfDay();
        this.endDate = endDateLocalDate.atTime(LocalTime.MAX);
        this.link = link;
    }
}
