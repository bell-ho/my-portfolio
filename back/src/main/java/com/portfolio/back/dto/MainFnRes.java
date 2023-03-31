package com.portfolio.back.dto;

import com.portfolio.back.domain.MainFn;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MainFnRes {

    private Long id;
    private String name;

    @Builder
    public MainFnRes(MainFn mainFn) {
        this.id = mainFn.getId();
        this.name = mainFn.getName();
    }
}
