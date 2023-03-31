package com.portfolio.back.repository;

import com.portfolio.back.domain.MainFn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MainFnRepository extends JpaRepository<MainFn,Long> {
    List<MainFn> findByProjectId(Long projectId);
}
