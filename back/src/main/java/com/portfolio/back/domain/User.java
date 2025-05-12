package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tmf_user", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
@Getter
@Entity
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "nick_name")
    private String nickName;

    @Column(name = "unique_key")
    private String uniqueKey;

    @Column(name = "email")
    private String email;

    @Column(name = "provider")
    private String provider;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Portfolio> portfolios = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserStackMap> userStacks = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Builder(builderMethodName = "create")
    public User(String name, String nickName, String uniqueKey, String email, String provider) {
        this.name = name;
        this.nickName = nickName;
        this.uniqueKey = uniqueKey;
        this.email = email;
        this.provider = provider;
        this.role = RoleType.ROLE_USER;
    }
}
