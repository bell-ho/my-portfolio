package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "user_stack_map")
@Builder
@Getter
@Setter
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
}
