package com.portfolio.back.controller;

import com.portfolio.back.domain.Stack;
import com.portfolio.back.dto.StackByUserRes;
import com.portfolio.back.dto.StackInsertReq;
import com.portfolio.back.service.StackService;
import com.portfolio.back.utils.RequestResultEnum;
import com.portfolio.back.utils.ResponseData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/stacks")
@RestController
public class StackController {

    private final StackService stackService;

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getPortfolios(@PathVariable("userId") Long userId) {
        List<StackByUserRes> stacks = stackService.getStacksWithUser(userId);

        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("stacks", stacks);

        return ResponseEntity.ok(data);
    }

    @PostMapping("")
    public ResponseEntity<?> createStackByUser(@RequestBody StackInsertReq params) {
        Stack stack = stackService.createStack(params.getUserId(), params.getName(), params.getCode());
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("stack", stack);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/{stackId}/users/{userId}")
    public ResponseEntity<?> updateUserStacks(@PathVariable("stackId") Long stackId, @PathVariable("userId") Long userId) {
        stackService.updateUserStack(stackId, userId);

        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        return ResponseEntity.ok(data);
    }
}
