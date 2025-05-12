package com.portfolio.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInsertReq {
    private String name;
    private String nickName;
    private String uniqueKey;
    private String email;
    private String provider;
}
