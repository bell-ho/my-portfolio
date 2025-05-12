package com.portfolio.back.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "tmf_log_collection")
@Getter
@Entity
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Builder(builderMethodName = "create")
    public Log(
            String service,
            String method,
            Long executionTime,
            StatusType status,
            String exceptionMsg
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String currentDateTimeFormatted = LocalDateTime.now().format(formatter);

        this.createdDate = LocalDateTime.parse(currentDateTimeFormatted, formatter);
        this.service = service;
        this.method = method;
        this.executionTime = executionTime;
        this.status = status;
        this.exceptionMsg = exceptionMsg;
    }
}
