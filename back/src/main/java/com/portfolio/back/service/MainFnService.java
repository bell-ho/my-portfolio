package com.portfolio.back.service;

import com.portfolio.back.domain.MainFn;

import java.util.List;

public interface MainFnService {
    List<MainFn> getMainFnsByProject(Long projectId);

    void createMainFn(Long projectId, String name);

    void removeMainFn(Long mainFnId);
}
