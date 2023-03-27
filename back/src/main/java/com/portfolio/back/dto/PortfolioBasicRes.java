package com.portfolio.back.dto;

import com.portfolio.back.domain.Portfolio;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortfolioBasicRes {

    private Long id;
    private String imageSrc;
    private String title;
    private String description;

    @Builder
    public PortfolioBasicRes(Portfolio portfolio) {
        this.id = portfolio.getId();
        this.imageSrc = portfolio.getImage() != null ? portfolio.getImage().getSrc() : null;
        this.title = portfolio.getTitle() != null ? portfolio.getTitle() : null;
        this.description = portfolio.getDescription() != null ? portfolio.getDescription() : null;
    }
}
