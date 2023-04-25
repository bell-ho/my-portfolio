package com.portfolio.back.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

@Slf4j
@Aspect
public class AspectV4 {

    // 하위 패키지이면서 서비스 클래스인것
    @Around("com.portfolio.back.aop.Pointcuts.allAndService()") // 외부 포인트컷 사용
    public Object doTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            log.info("transaction start {}", joinPoint.getSignature());
            Object result = joinPoint.proceed();
            log.info("transaction commit {}", joinPoint.getSignature());
            return result;
        } catch (Exception e) {
            log.info("transaction rollback {}", joinPoint.getSignature());
            throw e;
        }finally {
            log.info("transaction release {}", joinPoint.getSignature());
        }
    }
 }
