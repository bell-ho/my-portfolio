package com.portfolio.back.service;

import com.portfolio.back.domain.About;
import com.portfolio.back.domain.Image;
import com.portfolio.back.domain.Portfolio;
import com.portfolio.back.domain.User;
import com.portfolio.back.dto.PortfolioBasicRes;
import com.portfolio.back.dto.PortfolioInfoRes;
import com.portfolio.back.dto.PortfolioRes;
import com.portfolio.back.exception.CustomException;
import com.portfolio.back.repository.ImageRepository;
import com.portfolio.back.repository.PortfolioRepository;
import com.portfolio.back.repository.UserRepository;
import com.portfolio.back.utils.RequestResultEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PortfolioServiceImpl implements PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    @Override
    public List<PortfolioRes> getPortfolios(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        return portfolioRepository.findAllByUserOrderById(user).stream()
                .map(PortfolioRes::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PortfolioRes createPortfolio(String name, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        return new PortfolioRes(portfolioRepository.save(
                Portfolio.create()
                        .name(name)
                        .user(user)
                        .build())
        );
    }

    @Override
    @Transactional
    public void removePortfolio(Long portfolioId) {
        portfolioRepository.deleteById(portfolioId);
    }

    @Override
    @Transactional
    public void createPortfolioContent(Long portfolioId, String title, String description) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        portfolio.update(title, description);
    }

    @Override
    public PortfolioBasicRes detailPortfolio(Long portfolioId) {
        return new PortfolioBasicRes(portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND)));
    }

    @Override
    public PortfolioInfoRes detailInfoPortfolio(Long portfolioId) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        return new PortfolioInfoRes(portfolio);
    }

    @Override
    @Transactional
    public void updatePortfolioMainImage(Long portfolioId, String src) {
        Image image = Image.create().src(src).project(null).build();
        Image savedImage = imageRepository.save(image);

        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        portfolio.updateImage(savedImage);
    }

    @Override
    @Transactional
    public void updatePortfolioAbout(Long portfolioId, About about) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        portfolio.updateAbout(about);
    }
}
