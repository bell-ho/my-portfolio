package com.portfolio.back.controller;

import com.portfolio.back.dto.ProjectInsertReq;
import com.portfolio.back.service.ImageService;
import com.portfolio.back.utils.RequestResultEnum;
import com.portfolio.back.utils.ResponseData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/v1/images")
@RestController
public class ImageController {

    private final ImageService imageService;

    @DeleteMapping("/{imageId}")
    public ResponseEntity<?> removeImage(@PathVariable("imageId") Long imageId) {
        imageService.removeImage(imageId);
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        return ResponseEntity.ok(data);
    }
}
