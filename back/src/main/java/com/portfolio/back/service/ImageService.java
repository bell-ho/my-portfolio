package com.portfolio.back.service;

import com.portfolio.back.dto.ImageRes;

import java.util.List;

public interface ImageService {
    List<ImageRes> getImagesByProject(Long projectId);

    void updateProjectImages(Long projectId, List<String> images);

    void removeImage(Long imageId);
}
