package com.portfolio.back.controller;

import com.portfolio.back.domain.Stack;
import com.portfolio.back.dto.StackByProjectRes;
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

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<?> getProjectStacks(@PathVariable("projectId") Long projectId) {

        List<StackByProjectRes> stacks = stackService.getStacksWithProject(projectId);

        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("stacks", stacks);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getUserStacks(@PathVariable("userId") Long userId) {
        List<StackByUserRes> stacks = stackService.getStacksWithUser(userId);

        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("stacks", stacks);

        return ResponseEntity.ok(data);
    }

    @PostMapping("")
    public ResponseEntity<?> createStack(@RequestBody StackInsertReq params) {
        Stack stack = stackService.createStack(params.getTarget(), params.getTargetId(), params.getName(), params.getCode());
        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS).add("stack", stack);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/{stackId}/{target}/{userId}")
    public ResponseEntity<?> updateUserStacks(@PathVariable("stackId") Long stackId,
                                              @PathVariable("target") String target,
                                              @PathVariable("userId") Long targetId) {

        stackService.updateTargetStacks(stackId, target, targetId);

        ResponseData data = ResponseData.fromResult(RequestResultEnum.SUCCESS);
        return ResponseEntity.ok(data);
    }
}
