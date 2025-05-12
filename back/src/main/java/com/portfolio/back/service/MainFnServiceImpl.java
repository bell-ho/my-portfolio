package com.portfolio.back.service;

import com.portfolio.back.domain.MainFn;
import com.portfolio.back.domain.Project;
import com.portfolio.back.exception.CustomException;
import com.portfolio.back.repository.MainFnRepository;
import com.portfolio.back.repository.ProjectRepository;
import com.portfolio.back.utils.RequestResultEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MainFnServiceImpl implements MainFnService {

    private final MainFnRepository mainFnRepository;
    private final ProjectRepository projectRepository;

    @Override
    public List<MainFn> getMainFnsByProject(Long projectId) {
        return mainFnRepository.findByProjectId(projectId);
    }

    @Override
    @Transactional
    public void createMainFn(Long projectId, String name) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
        mainFnRepository.save(
                MainFn.create()
                        .name(name)
                        .project(project)
                        .build()
        );
    }

    @Override
    @Transactional
    public void removeMainFn(Long mainFnId) {
        mainFnRepository.deleteById(mainFnId);
    }
}
