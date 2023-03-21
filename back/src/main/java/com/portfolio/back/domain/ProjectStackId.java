package com.portfolio.back.domain;

import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
public class ProjectStackId implements Serializable {

    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "stack_id")
    private Long stackId;

    public ProjectStackId(Long projectId, Long stackId) {
        this.projectId = projectId;
        this.stackId = stackId;
    }
}
