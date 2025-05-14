package com.portfolio.back.service;

import com.portfolio.back.domain.Image;
import com.portfolio.back.domain.Project;
import com.portfolio.back.dto.ImageRes;
import com.portfolio.back.exception.CustomException;
import com.portfolio.back.repository.ImageRepository;
import com.portfolio.back.repository.ProjectRepository;
import com.portfolio.back.utils.RequestResultEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ProjectRepository projectRepository;

    @Override
    public List<ImageRes> getImagesByProject(Long projectId) {
        return imageRepository.findByProjectId(projectId).stream().map(ImageRes::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateProjectImages(Long projectId, List<String> images) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        images.forEach(v ->
                imageRepository.save(Image.create()
                        .src(v)
                        .project(project)
                        .build())
        );
    }

    @Override
    @Transactional
    public void removeImage(Long imageId) {
        imageRepository.deleteById(imageId);
    }
}
