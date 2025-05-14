package com.portfolio.back.config;

import com.p6spy.engine.logging.Category;
import com.p6spy.engine.spy.P6SpyOptions;
import com.p6spy.engine.spy.appender.MessageFormattingStrategy;
import org.hibernate.engine.jdbc.internal.FormatStyle;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.Locale;

@Configuration
public class P6SpySqlFormatter implements MessageFormattingStrategy {

    @PostConstruct
    public void setLogMessageFormat() {
        P6SpyOptions.getActiveInstance().setLogMessageFormat(this.getClass().getName());
    }

    @Override
    public String formatMessage(int connectionId, String now, long elapsed, String category, String prepared, String sql, String url) {
        return "\n[" + category + "] | " + elapsed + " ms | " + formatSql(category, sql);
    }

    private String formatSql(String category, String sql) {
        if (sql != null && !sql.trim().isEmpty() && Category.STATEMENT.getName().equals(category)) {
            String trim = sql.trim().toLowerCase(Locale.ROOT);
            return stackTrace() + (trim.startsWith("create") || trim.startsWith("alter") || trim.startsWith("comment") ?
                    FormatStyle.DDL.getFormatter().format(sql) :
                    FormatStyle.BASIC.getFormatter().format(sql));
        }
        return sql;
    }

    private String stackTrace() {
        return Arrays.stream(Arrays.stream(new Throwable().getStackTrace())
                .map(StackTraceElement::toString)
                .filter(string -> string.startsWith("com.portfolio.back.service") || string.startsWith("com.portfolio.back.repository"))
                .toArray(String[]::new)).findFirst().orElse(null);
    }
}
