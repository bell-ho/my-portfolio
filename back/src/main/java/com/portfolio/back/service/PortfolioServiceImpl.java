package com.portfolio.back.service;

import com.portfolio.back.domain.Portfolio;
import com.portfolio.back.domain.User;
import com.portfolio.back.repository.PortfolioRepository;
import com.portfolio.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PortfolioServiceImpl implements PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    @Override
    public List<Portfolio> getPortfolios(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));

        return portfolioRepository.findAllByUserOrderById(user);
    }

    @Override
    @Transactional
    public Portfolio createPortfolio(String name, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));
        return portfolioRepository.save(Portfolio.createPortfolio(name, user));
    }

    @Override
    @Transactional
    public void removePortfolio(Long portfolioId) {
        portfolioRepository.deleteById(portfolioId);
    }
}
