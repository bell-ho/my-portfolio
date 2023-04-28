package com.portfolio.back.exception;

import com.portfolio.back.utils.RequestResultEnum;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler({CustomException.class, Exception.class})
    protected ResponseEntity<ErrorResponseEntity> handleCustomException(Exception e) {

        if (e instanceof CustomException) {
            CustomException customException = (CustomException) e;
            return ErrorResponseEntity.toResponseEntity(customException.getError());
        } else {
            return ErrorResponseEntity.toResponseEntity(RequestResultEnum.CONTACT);
        }
    }
}
