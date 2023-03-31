package com.portfolio.back.service;

import com.portfolio.back.domain.Image;
import com.portfolio.back.domain.Project;
import com.portfolio.back.repository.ImageRepository;
import com.portfolio.back.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ProjectRepository projectRepository;

    @Override
    public List<Image> getImagesByProject(Long projectId) {
        return imageRepository.findByProjectId(projectId);
    }

    @Override
    @Transactional
    public void updateProjectImages(Long projectId, List<String> images) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));

        images.forEach(v -> {
            imageRepository.save(Image.createImage(v, project));
        });
    }

    @Override
    @Transactional
    public void removeImage(Long imageId) {
        imageRepository.deleteById(imageId);
    }
}
