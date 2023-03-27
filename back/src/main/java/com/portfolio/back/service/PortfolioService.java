package com.portfolio.back.service;

import com.portfolio.back.domain.Portfolio;
import com.portfolio.back.dto.PortfolioRes;

import java.util.List;

public interface PortfolioService {

    List<Portfolio> getPortfolios(Long userId);

    Portfolio createPortfolio(String name, Long userId);

    void removePortfolio(Long portfolioId);

    Portfolio createPortfolioContent(Long portfolioId, String title, String description);

    Portfolio detailPortfolio(Long portfolioId);

    Portfolio updatePortfolioMainImage(Long portfolioId, String src);
}
