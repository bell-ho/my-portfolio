package com.portfolio.back.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BasicInfoInsertReq {

    private String name;
    private String description;
    private String link;
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDateTime startDate;
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDateTime endDate;
}
