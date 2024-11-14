package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.EmailDTO;
import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.request.LoginReq;
import com.DH.server.model.dto.request.UserReqDto;
import com.DH.server.model.dto.response.UserResDto;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.mapper.UserMapper;
import com.DH.server.service.interfaces.AuthService;
import com.DH.server.service.interfaces.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
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
  private final EmailService emailService;

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
  @Operation(summary = "Login user", description = "This endpoint is public")
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

  @GetMapping("/prueba")
  public ResponseEntity<?> prueba(){
    UserEntity user = new UserEntity();
    user.setEmail("usblibros72@gmail.com");
    user.setName("Lucho");
    user.setLastname("Portuano");
    try {
      this.emailService.sendMail(new EmailDTO(user));
    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
    return ResponseEntity.ok("Hola");
  }
}
