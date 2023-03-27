package com.portfolio.back.domain;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Embeddable
public class About {

    @Column(name = "about_name")
    private String userName;

    @Column(name = "about_phone")
    private String userPhone;

    @Column(name = "about_email")
    private String userEmail;

}
