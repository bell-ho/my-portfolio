package com.portfolio.back.dto;

import lombok.Getter;

@Getter
public class StackInsertReq {

    private String target;
    private Long targetId;
    private String name;
    private String code;
}
