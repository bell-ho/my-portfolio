package com.portfolio.back.controller;

import com.portfolio.back.dto.UserInsertReq;
import com.portfolio.back.dto.UserRes;
import com.portfolio.back.security.TokenProvider;
import com.portfolio.back.service.UserService;
import com.portfolio.back.trace.callback.TraceTemplate;
import com.portfolio.back.trace.logtrace.LogTrace;
import com.portfolio.back.utils.RequestResultEnum;
import com.portfolio.back.utils.ResponseData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final LogTrace trace;

    @GetMapping("/validation-user/{key}")
    public ResponseEntity<?> validationUser(@PathVariable("key") String uniqueKey) {
        ResponseData data;
        try {
            UserRes userRes = new UserRes(userService.findByUniqueKey(uniqueKey));
            final String token = tokenProvider.create(userRes.toEntity());
            userRes.setToken(token);
            data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("user", userRes);
        } catch (Exception e) {
            data = ResponseData.fromException(e).add("user", null);
        }
        return ResponseEntity.ok(data);
    }

    @PostMapping("/signup")
    public ResponseEntity<ResponseData> createUser(@RequestBody UserInsertReq dto) {
        UserRes user = new UserRes(userService.join(dto.toEntity()));

        final String token = tokenProvider.create(user.toEntity());
        user.setToken(token);

        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("user", user);
        return ResponseEntity.ok(data);
    }
}
