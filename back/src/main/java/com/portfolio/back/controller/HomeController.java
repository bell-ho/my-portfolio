package com.portfolio.back.controller;

import com.portfolio.back.utils.RequestResultEnum;
import com.portfolio.back.utils.ResponseData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/")
@RestController
public class HomeController {

    @GetMapping("")
    public ResponseEntity<?> hello() {
        try {
            ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS)
                    .add("result", "success");

            return ResponseEntity.ok(data);
        } catch (Exception e) {
            ResponseData error = ResponseData.fromException(e);
            return ResponseEntity.status(error.getStatus()).body(e);
        }
    }
}
