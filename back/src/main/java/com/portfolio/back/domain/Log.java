package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "log_collection")
@Builder
@Getter
@Setter
@Entity
public class Log {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "service")
    private String service;

    @Column(name = "method")
    private String method;

    @Column(name = "execution_time")
    private Long executionTime;

    @Enumerated(EnumType.STRING)
    private StatusType status;

    @Column(name = "exception_message")
    private String exceptionMsg;

    public static Log createLog(String service,
                                String method,
                                Long executionTime,
                                StatusType status,
                                String exceptionMsg) {
        Log log = new Log();

//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH");
//        LocalDate startDateLocalDate = LocalDate.parse(LocalDateTime.now(), formatter);

        log.setService(service);
        log.setMethod(method);
        log.setExecutionTime(executionTime);
        log.setStatus(status);
        log.setExceptionMsg(exceptionMsg);
        return log;
    }
}
