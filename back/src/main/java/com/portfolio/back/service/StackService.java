package com.portfolio.back.service;

import com.portfolio.back.domain.Stack;
import com.portfolio.back.domain.User;
import com.portfolio.back.dto.StackByProjectRes;
import com.portfolio.back.dto.StackByUserRes;

import java.util.List;

public interface StackService {
    List<StackByUserRes> getStacksWithUser(Long userId);

    List<StackByProjectRes> getStacksWithProject(Long userId);

    Stack createStack(String target, Long targetId, String name, String code);

    Stack updateTargetStacks(Long stackId, String target, Long targetId);
}
