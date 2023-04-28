package com.portfolio.back.exception;

import com.portfolio.back.utils.RequestResultEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException {
    RequestResultEnum error;
}
