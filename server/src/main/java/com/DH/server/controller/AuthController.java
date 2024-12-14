package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.request.ChangePasswordDto;
import com.DH.server.model.dto.request.LoginReq;
import com.DH.server.model.dto.request.UserReqDto;
import com.DH.server.model.dto.response.UserResDto;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.mapper.UserMapper;
import com.DH.server.service.interfaces.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/auth")
@Tag(name = "Authentication", description = "Authentication controller")

public class AuthController {
  private final AuthService authService;
  private final UserMapper userMapper;

  @Value("${api.redirectUrlEmailVerify}")
  private String redirectUrl;

  @Operation(summary = "Register new user", description = "This endpoint is public")
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
  @Operation(summary = "Login user", description = "Login user with email and password")
  public ResponseEntity<?> login(
          @Parameter(description = "Login request")
          @Validated(OnCreate.class)
          @RequestBody
          LoginReq request){
    var response = this.authService.login(request);
    return ResponseEntity.ok(new ApiResponseDto<>(response));
  }

  @GetMapping
  @Operation(summary = "Get authenticated user", description = "Get a user authenticated into token",
  security = {@SecurityRequirement(name = "bearerAuth")})
  public ResponseEntity<?> getAuthUser(){
    UserEntity authUser = this.authService.getAuthUser();
    return ResponseEntity.ok(new ApiResponseDto<>(
            this.userMapper.toResponse(authUser)));
  }

  @GetMapping("/verify")
  @Operation(summary = "Verify email", description = "verify email token")
  public ResponseEntity<?> verifyEmail(
          @Parameter(description = "Email token", required = true)
          @RequestParam String token){
    this.authService.verifyAccountEmail(token);

    URI redirectUri = URI.create(this.redirectUrl);
    HttpHeaders headers = new HttpHeaders();
    headers.setLocation(redirectUri);
    return ResponseEntity.status(HttpStatus.FOUND).headers(headers).build();
  }

  @GetMapping("/resend-email")
  @Operation(summary = "Resend email", description = "Resend email verification")
  public ResponseEntity<?> resendEmail(
          @Parameter(description = "Email", required = true)
          @RequestParam String email){
    this.authService.resendEmailToken(email);
    return ResponseEntity.ok(new ApiResponseDto<>("Email send successfully"));
  }

  @PostMapping("/change-email")
  @Operation(summary = "Change email", description = "Change email for user, and set user as unable")
  public ResponseEntity<?> changeEmail(
          @Parameter(description = "new email and current password")
          @Validated(OnCreate.class)
          @RequestBody
          LoginReq request){
    this.authService.changeEmail(request);
    return ResponseEntity.ok(new ApiResponseDto<>("The email changed"));
  }

  @PostMapping("/change-password")
  @Operation(summary = "Change password", description = "Change password for user")
  public ResponseEntity<?> changePassword(
          @Parameter(description = "old password and new password")
          @Validated(OnCreate.class)
          @RequestBody
          ChangePasswordDto request){
    this.authService.changePassword(request);
    return ResponseEntity.ok(new ApiResponseDto<>("The password changed"));
  }
}
