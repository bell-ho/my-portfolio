package com.portfolio.back.trace.callback;

import com.portfolio.back.trace.TraceStatus;
import com.portfolio.back.trace.logtrace.LogTrace;

public class TraceTemplate {

    private final LogTrace trace;

    public TraceTemplate(LogTrace trace) {
        this.trace = trace;
    }

    public <T> T execute(String msg, TraceCallback<T> callback) {
        TraceStatus status = null;

        try {
            status = trace.begin(msg);
            T result = callback.call();
            trace.end(status);
            return result;
        } catch (Exception e) {
            throw e;
        }
    }

}
