package com.portfolio.back.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;

@Slf4j
@Aspect
public class AspectV6 {

//    @Around("com.portfolio.back.aop.Pointcuts.service()") // 외부 포인트컷 사용
//    public Object doTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
//        try {
//            log.info("transaction start {}", joinPoint.getSignature());
//            Object result = joinPoint.proceed();
//            log.info("transaction commit {}", joinPoint.getSignature());
//            return result;
//        } catch (Exception e) {
//            log.info("transaction rollback {}", joinPoint.getSignature());
//            throw e;
//        } finally {
//            log.info("transaction release {}", joinPoint.getSignature());
//        }
//    }

    @Before("com.portfolio.back.aop.Pointcuts.allAndService()")
    public void doBefore(JoinPoint joinPoint) {
        log.info("[before] {}", joinPoint.getSignature());
    }

    @AfterReturning(value = "com.portfolio.back.aop.Pointcuts.allAndService()", returning = "result")
    public void doReturn(JoinPoint joinPoint, Object result) {
        log.info("[return] {} {}", joinPoint.getSignature(), result);
    }

    @AfterThrowing(value = "com.portfolio.back.aop.Pointcuts.allAndService()", throwing = "ex")
    public void doThrowing(JoinPoint joinPoint, Exception ex) {
        log.info("[ex] {} message={}", joinPoint.getSignature(), ex);
    }

    @After(value = "com.portfolio.back.aop.Pointcuts.allAndService()")
    public void doAfter(JoinPoint joinPoint) {
        log.info("[after] {}", joinPoint.getSignature());
    }
}
