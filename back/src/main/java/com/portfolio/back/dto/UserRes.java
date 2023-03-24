package com.portfolio.back.dto;

import com.portfolio.back.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRes {

    private Long id;
    private String email;
    private String token;
    private String name;
    private String nickName;
    private String role;

    @Builder
    public UserRes(User entity) {
        if (entity != null) {
            this.id = entity.getId();
            this.email = entity.getEmail() != null ? entity.getEmail() : "";
            this.name = entity.getName();
            this.nickName = entity.getNickName();
            this.role = entity.getRole().name().toLowerCase();
        }
    }

    public User toEntity() {
        return User.builder()
                .email(email)
                .name(name)
                .nickName(nickName)
                .build();
    }
}
