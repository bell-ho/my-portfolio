package com.portfolio.back.controller;

import com.portfolio.back.domain.About;
import com.portfolio.back.dto.*;
import com.portfolio.back.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.portfolio.back.utils.RequestResultEnum.SUCCESS;
import static com.portfolio.back.utils.ResponseData.fromResult;

@RequiredArgsConstructor
@RequestMapping("/api/v1/portfolios")
@RestController
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getPortfolios(@PathVariable("userId") Long userId) {
        List<PortfolioRes> portfolios = portfolioService.getPortfolios(userId);
        return ResponseEntity.ok(fromResult(SUCCESS).add("portfolios", portfolios));
    }

    @PostMapping("")
    public ResponseEntity<?> createPortfolio(@RequestBody PortfolioInsertReq params) {
        PortfolioRes newPortfolio = portfolioService.createPortfolio(params.getName(), params.getUserId());
        return ResponseEntity.ok(fromResult(SUCCESS).add("portfolio", newPortfolio));
    }

    @DeleteMapping("/{portfolioId}")
    public ResponseEntity<?> removePortfolio(@PathVariable("portfolioId") Long portfolioId) {
        portfolioService.removePortfolio(portfolioId);
        return ResponseEntity.ok(fromResult(SUCCESS));
    }

    @PutMapping("/{portfolioId}")
    public ResponseEntity<?> createPortfolioContent(@PathVariable("portfolioId") Long portfolioId, @RequestBody PortfolioContentInsertReq params) {
        portfolioService.createPortfolioContent(portfolioId, params.getTitle(), params.getDescription());
        return ResponseEntity.ok(fromResult(SUCCESS));
    }

    @GetMapping("/{portfolioId}")
    public ResponseEntity<?> detailPortfolio(@PathVariable("portfolioId") Long portfolioId) {
        PortfolioBasicRes portfolio = portfolioService.detailPortfolio(portfolioId);
        return ResponseEntity.ok(fromResult(SUCCESS).add("portfolio", portfolio));
    }

    @GetMapping("/info/{portfolioId}")
    public ResponseEntity<?> detailInfoPortfolio(@PathVariable("portfolioId") Long portfolioId) {
        PortfolioInfoRes portfolio = portfolioService.detailInfoPortfolio(portfolioId);
        return ResponseEntity.ok(fromResult(SUCCESS).add("portfolio", portfolio));
    }

    @PutMapping("/image/{portfolioId}")
    public ResponseEntity<?> updatePortfolioMainImage(@PathVariable("portfolioId") Long portfolioId, @RequestBody ImageInsertReq params) {
        portfolioService.updatePortfolioMainImage(portfolioId, params.getSrc());
        return ResponseEntity.ok(fromResult(SUCCESS));
    }

    @PutMapping("/about/{portfolioId}")
    public ResponseEntity<?> updatePortfolioAbout(@PathVariable("portfolioId") Long portfolioId, @RequestBody AboutInsertReq params) {
        About about = new About(params.getName(), params.getPhone(), params.getEmail());
        portfolioService.updatePortfolioAbout(portfolioId, about);
        return ResponseEntity.ok(fromResult(SUCCESS));
    }
}
