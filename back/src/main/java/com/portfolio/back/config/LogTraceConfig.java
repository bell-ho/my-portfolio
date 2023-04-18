package com.portfolio.back.config;

import com.portfolio.back.trace.logtrace.FieldLogTrace;
import com.portfolio.back.trace.logtrace.LogTrace;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LogTraceConfig {

    @Bean
    public LogTrace logTrace() {
        return new FieldLogTrace();
    }
}
