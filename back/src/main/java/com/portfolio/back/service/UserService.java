package com.portfolio.back.service;

import com.portfolio.back.domain.User;
import com.portfolio.back.dto.UserInsertReq;

public interface UserService {
    User findByUniqueKey(String uniqueKey);

    User join(UserInsertReq params);
}
