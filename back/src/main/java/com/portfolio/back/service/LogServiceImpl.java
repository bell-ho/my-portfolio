package com.portfolio.back.service;

import com.portfolio.back.domain.Log;
import com.portfolio.back.repository.LogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Slf4j
@Service
public class LogServiceImpl implements LogService {

    private final LogRepository logRepository;

    // 항상 새로운 트랜잭션을 시작,
    // 호출자의 트랜잭션이 있으면 일시 중단되고, 호출된 메서드가 완료되면 원래 트랜잭션이 다시 시작
    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void save(Log logging) {
        logRepository.save(logging);
    }
}
