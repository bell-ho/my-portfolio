package com.portfolio.back.service;

import com.portfolio.back.domain.User;
import com.portfolio.back.exception.CustomException;
import com.portfolio.back.repository.UserRepository;
import com.portfolio.back.utils.RequestResultEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User findByUniqueKey(String uniqueKey) {
        return userRepository.findByUniqueKey(uniqueKey).orElseThrow(() -> new CustomException(RequestResultEnum.NOT_FOUND));
    }

    @Override
    @Transactional
    public User join(User user) {
        try {
            userRepository.save(user);
            return user;
        } catch (Exception e) {
            throw e;
        }
    }
}
