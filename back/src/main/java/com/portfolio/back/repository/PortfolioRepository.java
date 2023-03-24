package com.portfolio.back.repository;

import com.portfolio.back.domain.Portfolio;
import com.portfolio.back.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long>, QuerydslPredicateExecutor<Portfolio> {
    List<Portfolio> findAllByUserOrderById(User user);
}
