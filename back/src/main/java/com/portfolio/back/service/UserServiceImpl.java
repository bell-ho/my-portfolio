package com.portfolio.back.service;

import com.portfolio.back.domain.User;
import com.portfolio.back.dto.UserInsertReq;
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
    public User join(UserInsertReq params) {
        return userRepository.save(
                User.create()
                        .name(params.getName())
                        .nickName(params.getNickName())
                        .uniqueKey(params.getUniqueKey())
                        .email(params.getEmail())
                        .provider(params.getProvider())
                        .build()
        );
    }
}
