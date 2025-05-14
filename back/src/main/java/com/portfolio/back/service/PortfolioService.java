package com.portfolio.back.service;

import com.portfolio.back.domain.About;
import com.portfolio.back.domain.Portfolio;
import com.portfolio.back.dto.PortfolioBasicRes;
import com.portfolio.back.dto.PortfolioInfoRes;
import com.portfolio.back.dto.PortfolioRes;

import java.util.List;

public interface PortfolioService {

    List<PortfolioRes> getPortfolios(Long userId);

    PortfolioRes createPortfolio(String name, Long userId);

    void removePortfolio(Long portfolioId);

    void createPortfolioContent(Long portfolioId, String title, String description);

    PortfolioBasicRes detailPortfolio(Long portfolioId);

    PortfolioInfoRes detailInfoPortfolio(Long portfolioId);

    void updatePortfolioMainImage(Long portfolioId, String src);

    void updatePortfolioAbout(Long portfolioId, About about);
}
