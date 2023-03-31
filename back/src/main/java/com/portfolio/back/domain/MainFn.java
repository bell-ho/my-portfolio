package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@NoArgsConstructor
@AllArgsConstructor
@Table(name = "main_fn")
@Builder
@Getter
@Setter
@Entity
public class MainFn  extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    public static MainFn createMainFn(Project project, String name) {
        MainFn mainFn = new MainFn();
        mainFn.setProject(project);
        mainFn.setName(name);
        return mainFn;
    }
}
