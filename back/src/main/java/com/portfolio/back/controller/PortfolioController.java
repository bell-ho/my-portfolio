package com.portfolio.back.controller;

import com.portfolio.back.domain.About;
import com.portfolio.back.dto.*;
import com.portfolio.back.service.PortfolioService;
import com.portfolio.back.utils.RequestResultEnum;
import com.portfolio.back.utils.ResponseData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("/api/v1/portfolios")
@RestController
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getPortfolios(@PathVariable("userId") Long userId) {

        List<PortfolioRes> portfolios =
                portfolioService.getPortfolios(userId).stream()
                        .map(PortfolioRes::new).collect(Collectors.toList());

        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("portfolios", portfolios);

        return ResponseEntity.ok(data);
    }

    @PostMapping("")
    public ResponseEntity<?> createPortfolio(@RequestBody PortfolioInsertReq params) {
        ResponseData data;
        try {
            PortfolioRes newPortfolio = new PortfolioRes(portfolioService.createPortfolio(params.getName(), params.getUserId()));
            data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("portfolio", newPortfolio);
        } catch (Exception e) {
            data = ResponseData.fromException(e);
        }
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/{portfolioId}")
    public ResponseEntity<?> removePortfolio(@PathVariable("portfolioId") Long portfolioId) {
        ResponseData data;
        try {
            portfolioService.removePortfolio(portfolioId);
            data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        } catch (Exception e) {
            data = ResponseData.fromException(e);
        }
        return ResponseEntity.ok(data);
    }

    @PutMapping("/{portfolioId}")
    public ResponseEntity<?> createPortfolioContent(@PathVariable("portfolioId") Long portfolioId, @RequestBody PortfolioContentInsertReq params) {
        ResponseData data;
        try {
            portfolioService.createPortfolioContent(
                    portfolioId,
                    params.getTitle(),
                    params.getDescription());

            data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        } catch (Exception e) {
            data = ResponseData.fromException(e);
        }
        return ResponseEntity.ok(data);
    }

    @GetMapping("/{portfolioId}")
    public ResponseEntity<?> detailPortfolio(@PathVariable("portfolioId") Long portfolioId) {
        ResponseData data;
        try {
            PortfolioBasicRes portfolio = new PortfolioBasicRes(portfolioService.detailPortfolio(portfolioId));
            data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("portfolio", portfolio);
        } catch (Exception e) {
            data = ResponseData.fromException(e);
        }
        return ResponseEntity.ok(data);
    }

    @PutMapping("/image/{portfolioId}")
    public ResponseEntity<?> updatePortfolioMainImage(@PathVariable("portfolioId") Long portfolioId, @RequestBody ImageInsertReq params) {
        ResponseData data;
        try {
            portfolioService.updatePortfolioMainImage(portfolioId, params.getSrc());
            data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        } catch (Exception e) {
            data = ResponseData.fromException(e);
        }
        return ResponseEntity.ok(data);
    }

    @PutMapping("/about/{portfolioId}")
    public ResponseEntity<?> updatePortfolioAbout(@PathVariable("portfolioId") Long portfolioId, @RequestBody AboutInsertReq params) {
        ResponseData data;
        try {
            About about = new About(params.getName(), params.getPhone(), params.getEmail());
            portfolioService.updatePortfolioAbout(portfolioId, about);
            data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        } catch (Exception e) {
            data = ResponseData.fromException(e);
        }
        return ResponseEntity.ok(data);
    }
}
