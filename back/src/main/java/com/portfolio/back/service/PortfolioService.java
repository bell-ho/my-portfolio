package com.portfolio.back.service;

import com.portfolio.back.domain.Portfolio;
import com.portfolio.back.dto.PortfolioRes;

import java.util.List;

public interface PortfolioService {

    List<Portfolio> getPortfolios(Long userId);

    Portfolio createPortfolio(String name, Long userId);

    void removePortfolio(Long portfolioId);
}
