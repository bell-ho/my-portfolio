package com.portfolio.back.utils;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public enum RequestResultEnum {
    SUCCESS(200, 0, "처리에 성공하였습니다."),
    WRONG_HEADER(400, 11, "필요한 Header 값이 누락되었습니다."),
    WRONG_PARAMETER(400, 12, "요청 파라미터를 확인하세요."),
    NO_COOKIE(400, 13, "필요한 쿠키가 없습니다."),
    DUPLICATED(400, 14, "이미 존재하는 데이터입니다."),
    TOKEN_INVALID(401, 21, "유효하지 않은 토큰입니다."),
    TOKEN_EXPIRED(401, 22, "만료된 토큰입니다."),
    LOGIN_REQUIRED(401, 23, "로그인이 필요한 작업입니다."),

    // 402 : PAYMENT_REQUIRED
    // 405 : METHOD_NOT_ALLOWED

    FORBIDDEN(403, 24, "권한이 없습니다."),
    NOT_FOUND(404, 15, "존재하지 않는 데이터입니다."),
    UNSUPPORTED_MEDIA_TYPE(415, 16, "지원되지 않는 형식입니다."),
    INTERNAL_SERVER_ERROR(500, 500, "서버 오류 입니다."),
    USER_NOT_FOUND(404, 404, "해당하는 사용자를 찾을 수 없습니다."),
    SERVICE_NOT_FOUND(404, 404, "해당 서비스를 사용중이지 않습니다."),
    PASSWORD_VALIDATE_FAIL(403, 403, "패스워드가 맞지 않습니다."),
    FAIL(500, 1, "처리에 실패하였습니다."),
    CONTACT(999, 999, "ERROR");

    private int status;
    private int code;
    private String message;

    public int getStatus() {
        return this.status;
    }

    public int getCode() {
        return this.code;
    }

    public String getMessage() {
        return this.message;
    }

}
