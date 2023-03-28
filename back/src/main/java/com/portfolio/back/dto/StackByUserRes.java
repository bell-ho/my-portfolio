package com.portfolio.back.dto;

import com.portfolio.back.domain.StackType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StackByUserRes {
    private Long id;
    private String name;
    private String code;
    private Long userStackId;
    private boolean isUserStack;

    public StackByUserRes(Long id, String name, StackType code, Long userStackId, Boolean isUserStack) {
        this.id = id;
        this.name = name;
        this.code = String.valueOf(code);
        this.userStackId = userStackId;
        this.isUserStack = isUserStack;
    }
}
