package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "tmf_stack")
@Getter
@Entity
public class Stack extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    private StackType code;

    @Builder(builderMethodName = "create")
    public Stack(String name, StackType code) {
        this.name = name;
        this.code = code;
    }
}
