package com.portfolio.back.service;

import com.portfolio.back.domain.Image;

import java.util.List;

public interface ImageService {
    List<Image> getImagesByProject(Long projectId);

    void updateProjectImages(Long projectId, List<String> images);

    void removeImage(Long imageId);
}
