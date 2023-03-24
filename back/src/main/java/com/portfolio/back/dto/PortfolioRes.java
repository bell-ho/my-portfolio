package com.portfolio.back.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.portfolio.back.domain.Portfolio;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PortfolioRes {

    private Long id;
    private String name;
    @JsonFormat(pattern = "yy.MM.dd")
    private LocalDateTime createDate;
    @JsonFormat(pattern = "yy.MM.dd")
    private LocalDateTime modifiedDate;

    @Builder
    public PortfolioRes(Portfolio portfolio) {
        this.id = portfolio.getId();
        this.name = portfolio.getName();
        this.createDate = portfolio.getCreatedDate();
        this.modifiedDate = portfolio.getModifiedDate();
    }
}
