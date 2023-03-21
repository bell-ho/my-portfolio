package com.portfolio.back.service;

import com.portfolio.back.domain.User;

public interface UserService {
    User findByUniqueKey(String uniqueKey);

    User join(User user);

}
