package com.portfolio.back.service;

import com.portfolio.back.domain.*;
import com.portfolio.back.repository.ImageRepository;
import com.portfolio.back.repository.PortfolioRepository;
import com.portfolio.back.repository.UserRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
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
    private final ImageRepository imageRepository;
    private final JPAQueryFactory queryFactory;

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

    @Override
    @Transactional
    public Portfolio createPortfolioContent(Long portfolioId, String title, String description) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));
        return portfolio.update(title, description);
    }

    @Override
    public Portfolio detailPortfolio(Long portfolioId) {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return portfolioRepository.findById(portfolioId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));
    }

    @Override
    public Portfolio detailInfoPortfolio(Long portfolioId) {
        return portfolioRepository.findById(portfolioId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));
    }

    @Override
    @Transactional
    public Portfolio updatePortfolioMainImage(Long portfolioId, String src) {
        Image image = Image.createImage(src, null);
        Image savedImage = imageRepository.save(image);

        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));
        portfolio.setImage(savedImage);
        return portfolio;
    }

    @Override
    @Transactional
    public Portfolio updatePortfolioAbout(Long portfolioId, About about) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));
        portfolio.setAbout(about);
        return portfolio;
    }
}
