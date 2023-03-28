package com.portfolio.back.repository;

import com.portfolio.back.domain.UserStackMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface UserStackMapRepository extends JpaRepository<UserStackMap, Long>, QuerydslPredicateExecutor<UserStackMap> {
    Optional<UserStackMap> findByUserIdAndStackId(Long userId, Long stackId);
}
