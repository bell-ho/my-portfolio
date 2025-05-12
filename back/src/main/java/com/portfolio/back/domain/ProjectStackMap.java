package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "tmf_project_stack_map")
@Getter
@Entity
public class ProjectStackMap extends BaseEntity {

    @EmbeddedId
    private ProjectStackId id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "project_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Project project;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "stack_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Stack stack;

    @Builder(builderMethodName = "create")
    public ProjectStackMap(Project project, Stack stack) {
        this.id = new ProjectStackId(project.getId(), stack.getId());
        this.project = project;
        this.stack = stack;
    }
}
