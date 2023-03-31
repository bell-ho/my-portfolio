package com.portfolio.back.service;

import com.portfolio.back.domain.MainFn;
import com.portfolio.back.domain.Project;
import com.portfolio.back.repository.MainFnRepository;
import com.portfolio.back.repository.ProjectRepository;
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
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND"));
        mainFnRepository.save(MainFn.createMainFn(project, name));
    }

    @Override
    @Transactional
    public void removeMainFn(Long mainFnId) {
        mainFnRepository.deleteById(mainFnId);
    }
}
