package com.portfolio.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BasicInfoInsertReq {

    private String name;
    private String description;
    private String period;
    private String link;
}
