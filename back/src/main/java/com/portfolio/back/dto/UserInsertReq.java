package com.portfolio.back.dto;

import com.portfolio.back.domain.RoleType;
import com.portfolio.back.domain.User;
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
    private String role;

    public User toEntity() {
        return User.builder()
                .name(name)
                .nickName(nickName)
                .uniqueKey(uniqueKey)
                .email(email)
                .provider(provider)
                .role(RoleType.ROLE_USER)
                .build();
    }
}
