package com.portfolio.back.repository;
import javax.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;
import com.portfolio.back.domain.Stack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StackRepository extends JpaRepository<Stack, Long>, QuerydslPredicateExecutor<Stack> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Stack> findByName(String name);
}
