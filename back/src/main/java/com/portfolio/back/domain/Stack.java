package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "stack")
@Builder
@Getter
@Setter
@Entity
public class Stack extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    private StackType code;

    public static Stack createStack(String name, String code) {
        Stack stack = new Stack();
        stack.setName(name);
        stack.setCode(StackType.valueOf(code));
        return stack;
    }
}
