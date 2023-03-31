package com.portfolio.back.controller;

import com.portfolio.back.service.MainFnService;
import com.portfolio.back.utils.RequestResultEnum;
import com.portfolio.back.utils.ResponseData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1/mainFns")
@RestController
public class MainFnController {

    private final MainFnService mainFnService;

    @DeleteMapping("/{mainFnId}")
    public ResponseEntity<?> removeMainFn(@PathVariable("mainFnId") Long mainFnId) {
        mainFnService.removeMainFn(mainFnId);
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        return ResponseEntity.ok(data);
    }
}
