package com.portfolio.back.domain;
import javax.persistence.*;


@Embeddable
public class About {

    @Column(name = "about_name")
    private String name;

    @Column(name = "about_phone")
    private String phone;

    @Column(name = "about_email")
    private String email;

}
