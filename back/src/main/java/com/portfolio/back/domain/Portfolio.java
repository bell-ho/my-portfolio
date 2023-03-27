package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "portfolio")
@Builder
@Getter
@Setter
@Entity
public class Portfolio extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = "about_name")),
            @AttributeOverride(name = "email", column = @Column(name = "about_email")),
            @AttributeOverride(name = "phone", column = @Column(name = "about_phone"))
    })
    private About about;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects = new ArrayList<>();

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "image_id")
    private Image image;

    public static Portfolio createPortfolio(String name, User user) {
        Portfolio portfolio = new Portfolio();
        portfolio.setUser(user);
        portfolio.setName(name);

        return portfolio;
    }

    public Portfolio update(String title, String description) {
        this.title = title;
        this.description = description;
        return this;
    }
}
