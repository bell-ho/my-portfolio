package com.portfolio.back.trace.template;

import com.portfolio.back.trace.TraceStatus;
import com.portfolio.back.trace.logtrace.LogTrace;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractTemplate<T> {

    private final LogTrace trace;

    public AbstractTemplate(LogTrace trace) {
        this.trace = trace;
    }

    public T execute(String message) {
        TraceStatus status = null;

        try {
            status = trace.begin(message);
            T result = call();
            trace.end(status);
            return result;
        } catch (Exception e) {
            throw e;
        }
    }

    protected abstract T call();
}
