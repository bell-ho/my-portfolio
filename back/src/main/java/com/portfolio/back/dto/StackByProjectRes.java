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
public class StackByProjectRes {

    private Long id;
    private String name;
    private String code;
    private Long projectStackId;
    private boolean isProjectStack;

    public StackByProjectRes(Long id, String name, StackType code, Long projectStackId, Boolean isProjectStack) {
        this.id = id;
        this.name = name;
        this.code = String.valueOf(code);
        this.projectStackId = projectStackId;
        this.isProjectStack = isProjectStack;
    }
}
