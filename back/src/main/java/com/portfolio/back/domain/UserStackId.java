package com.portfolio.back.domain;

import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
public class UserStackId implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "stack_id")
    private Long stackId;

    public UserStackId(Long userId, Long stackId) {
        this.userId = userId;
        this.stackId = stackId;
    }
}
