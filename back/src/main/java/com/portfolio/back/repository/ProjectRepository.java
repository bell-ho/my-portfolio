package com.portfolio.back.repository;

import com.portfolio.back.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long>, QuerydslPredicateExecutor<Project> {
}
