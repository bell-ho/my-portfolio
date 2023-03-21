package com.portfolio.back.controller;

import com.portfolio.back.domain.User;
import com.portfolio.back.dto.UserInsertReq;
import com.portfolio.back.dto.UserRes;
import com.portfolio.back.security.TokenProvider;
import com.portfolio.back.service.UserService;
import com.portfolio.back.utils.RequestResultEnum;
import com.portfolio.back.utils.ResponseData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@RestController
public class AuthController {

    private final UserService userService;
    private final TokenProvider tokenProvider;

    @GetMapping("/validation-user/{key}")
    public ResponseEntity<?> validationUser(@PathVariable("key") String uniqueKey, HttpServletResponse response) {
        try {
            User user = userService.findByUniqueKey(uniqueKey);

            RequestResultEnum result = (user != null) ? RequestResultEnum.SUCCESS : RequestResultEnum.NOT_FOUND;
            ResponseData data;

            if (user != null) {
                UserRes userRes = new UserRes(user);
                final String token = tokenProvider.create(userRes.toEntity());
                userRes.setToken(token);
                data = ResponseData.fromResult(result).add("user", userRes);
            } else {
                data = ResponseData.fromResult(result).add("user", null);
            }
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.ok(RequestResultEnum.NOT_FOUND);
        }
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
