package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "tmf_user_stack_map")
@Getter
@Entity
public class UserStackMap extends BaseEntity {

    @EmbeddedId
    private UserStackId id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "stack_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Stack stack;

    @Builder(builderMethodName = "create")
    public UserStackMap(User user, Stack stack) {
        this.id = new UserStackId(user.getId(), stack.getId());
        this.user = user;
        this.stack = stack;
    }
}
