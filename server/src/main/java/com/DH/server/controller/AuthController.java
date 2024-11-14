package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.request.LoginReq;
import com.DH.server.model.dto.request.UserReqDto;
import com.DH.server.model.dto.response.UserResDto;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.mapper.UserMapper;
import com.DH.server.service.interfaces.AuthService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/auth")
@Tag(name = "Authentication", description = "Authentication controller")
public class AuthController {
  private final AuthService authService;
  private final UserMapper userMapper;

  @PostMapping("/register")
  public ResponseEntity<?> register(
          @Parameter(description = "User request")
          @Validated(OnCreate.class)
          @RequestBody
          UserReqDto request){
    UserEntity newUser = this.userMapper.toEntity(request);
    newUser = this.authService.register(newUser);
    UserResDto response = this.userMapper.toResponse(newUser);
    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ApiResponseDto<>(response));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(
          @Parameter(description = "Login request")
          @Validated(OnCreate.class)
          @RequestBody
          LoginReq request){
    var response = this.authService.login(request);
    return ResponseEntity.ok(new ApiResponseDto<>(response));
  }

  @GetMapping
  public ResponseEntity<?> getAuthUser(){
    UserEntity authUser = this.authService.getAuthUser();
    return ResponseEntity.ok(new ApiResponseDto<>(authUser));
  }
}
