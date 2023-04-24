package com.portfolio.back.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

@Slf4j
@Aspect
public class AspectV2 {


    // 모든 패키지
    @Pointcut("execution(* com.portfolio.back..*(..))") // 포인트컷 분리
    private void all() { // 포인트컷 시그니처

    }

    @Around("all()") // 포인트컷
    public Object doLog(ProceedingJoinPoint joinPoint) throws Throwable { // 어드바이스
        log.info("[log] {}", joinPoint.getSignature());
        return joinPoint.proceed();
    }
}
