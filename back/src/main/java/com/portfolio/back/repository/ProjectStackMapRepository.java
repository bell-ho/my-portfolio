package com.portfolio.back.repository;

import com.portfolio.back.domain.ProjectStackMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectStackMapRepository extends JpaRepository<ProjectStackMap,Long>, QuerydslPredicateExecutor<ProjectStackMap> {
    Optional<ProjectStackMap> findByProjectIdAndStackId(Long projectId, Long stackId);
}
