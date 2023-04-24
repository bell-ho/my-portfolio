package com.portfolio.back.aop;

import org.aspectj.lang.annotation.Pointcut;

public class Pointcuts {

    // 모든 패키지
    @Pointcut("execution(* com.portfolio.back..*(..))") // 포인트컷 분리
    public void all() { // 포인트컷 시그니처

    }

    // 클래스 이름 패턴이 서비스
    @Pointcut("execution(* *..*Service.*(..))")
    public void service() {

    }

    @Pointcut("all() && service()")
    public void allAndService() {

    }
}
