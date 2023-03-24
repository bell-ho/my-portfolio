package com.portfolio.back.controller;

import com.portfolio.back.dto.PortfolioInsertReq;
import com.portfolio.back.dto.PortfolioRes;
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

    @GetMapping("/{userId}")
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
    public ResponseEntity<?> removePortfolio(@PathVariable Long portfolioId) {
        ResponseData data;
        try {
            portfolioService.removePortfolio(portfolioId);
            data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        } catch (Exception e) {
            data = ResponseData.fromException(e);
        }
        return ResponseEntity.ok(data);

    }
}
