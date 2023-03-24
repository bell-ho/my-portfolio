package com.portfolio.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortfolioInsertReq {
    private String name;
    private Long userId;
}
