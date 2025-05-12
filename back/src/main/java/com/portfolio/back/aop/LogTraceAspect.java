package com.portfolio.back.aop;

import com.portfolio.back.domain.Log;
import com.portfolio.back.domain.StatusType;
import com.portfolio.back.service.LogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Slf4j
@Aspect
@Component
public class LogTraceAspect {

    private final LogService logService;
    private static final long SLOW_QUERY_THRESHOLD = 1000;
    private final ThreadLocal<Long> startTime = new ThreadLocal<>();

    @Pointcut("execution(* com.portfolio.back.service.*Impl.*(..)) && !execution(* com.portfolio.back.service.Log*.*(..))")
    private void allService() {
    }

    @Before("allService()")
    public void beforeMethod() {
        startTime.set(System.currentTimeMillis());
    }

    @After("allService()")
    public void afterMethod(JoinPoint joinPoint) {
        long endTime = System.currentTimeMillis();
        long elapsedTime = endTime - startTime.get();

        if (elapsedTime > SLOW_QUERY_THRESHOLD) {

            String serviceName = joinPoint.getTarget().getClass().getName();
            String methodName = joinPoint.getSignature().getName();
            logService.save(
                    Log.create()
                            .service(serviceName)
                            .method(methodName)
                            .executionTime(elapsedTime)
                            .status(StatusType.SLOW_QUERY)
                            .exceptionMsg("")
                            .build()
            );
        }
    }

    @AfterThrowing(value = "allService()", throwing = "exception")
    public void afterThrowing(JoinPoint joinPoint, Exception exception) {
        String serviceName = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        logService.save(
                Log.create()
                        .service(serviceName)
                        .method(methodName)
                        .executionTime(null)
                        .status(StatusType.FAILURE)
                        .exceptionMsg(exception.getMessage())
                        .build()
        );
    }
}
