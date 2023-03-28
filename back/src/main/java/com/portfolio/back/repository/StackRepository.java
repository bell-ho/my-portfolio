package com.portfolio.back.repository;

import com.portfolio.back.domain.Stack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StackRepository extends JpaRepository<Stack, Long>, QuerydslPredicateExecutor<Stack> {
    Optional<Stack> findByName(String name);
}
