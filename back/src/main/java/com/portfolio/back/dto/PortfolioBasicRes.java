package com.portfolio.back.dto;

import com.portfolio.back.domain.About;
import com.portfolio.back.domain.Portfolio;
import lombok.*;

@Getter
@Setter
public class PortfolioBasicRes {

    private Long id;
    private String imageSrc;
    private String name;
    private String title;
    private String description;
    private AboutDTO about;

    @Builder
    public PortfolioBasicRes(Portfolio portfolio) {
        this.id = portfolio.getId();
        this.name = portfolio.getName();
        this.imageSrc = portfolio.getImage() != null ? portfolio.getImage().getSrc() : null;
        this.title = portfolio.getTitle() != null ? portfolio.getTitle() : null;
        this.description = portfolio.getDescription() != null ? portfolio.getDescription() : null;
        this.about = new AboutDTO(portfolio.getAbout() != null ? portfolio.getAbout() : null);
    }

    @Getter
    @Setter
    public static class AboutDTO {
        private String name;
        private String phone;
        private String email;

        @Builder
        public AboutDTO(About about) {
            this.name = about.getUserName();
            this.phone = about.getUserPhone();
            this.email = about.getUserEmail();
        }
    }
}
