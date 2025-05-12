package com.portfolio.back.service;

import com.portfolio.back.domain.About;
import com.portfolio.back.domain.Image;
import com.portfolio.back.domain.Portfolio;
import com.portfolio.back.domain.User;
import com.portfolio.back.exception.CustomException;
import com.portfolio.back.repository.ImageRepository;
import com.portfolio.back.repository.PortfolioRepository;
import com.portfolio.back.repository.UserRepository;
import com.portfolio.back.utils.RequestResultEnum;
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

    @Override
    public List<Portfolio> getPortfolios(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        return portfolioRepository.findAllByUserOrderById(user);
    }

    @Override
    @Transactional
    public Portfolio createPortfolio(String name, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        return portfolioRepository.save(
                Portfolio.create()
                        .name(name)
                        .user(user)
                        .build()
        );
    }

    @Override
    @Transactional
    public void removePortfolio(Long portfolioId) {
        portfolioRepository.deleteById(portfolioId);
    }

    @Override
    @Transactional
    public Portfolio createPortfolioContent(Long portfolioId, String title, String description) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        return portfolio.update(title, description);
    }

    @Override
    public Portfolio detailPortfolio(Long portfolioId) {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
    }

    @Override
    public Portfolio detailInfoPortfolio(Long portfolioId) {
        return portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
    }

    @Override
    @Transactional
    public Portfolio updatePortfolioMainImage(Long portfolioId, String src) {
        Image image = Image.create().src(src).project(null).build();
        Image savedImage = imageRepository.save(image);

        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        portfolio.updateImage(savedImage);
        return portfolio;
    }

    @Override
    @Transactional
    public Portfolio updatePortfolioAbout(Long portfolioId, About about) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        portfolio.updateAbout(about);
        return portfolio;
    }
}
