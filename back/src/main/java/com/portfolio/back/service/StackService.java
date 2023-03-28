package com.portfolio.back.service;

import com.portfolio.back.domain.Stack;
import com.portfolio.back.domain.User;
import com.portfolio.back.dto.StackByUserRes;

import java.util.List;

public interface StackService {
    List<StackByUserRes> getStacksWithUser(Long userId);

    Stack createStack(Long userId,String name,String code);

    Stack updateUserStack(Long stackId, Long userId);
}
