package com.DH.server.service.interfaces;

import com.DH.server.model.dto.request.ChangePasswordDto;
import com.DH.server.model.dto.request.LoginReq;
import com.DH.server.model.dto.response.AuthRes;
import com.DH.server.model.entity.UserEntity;
import jakarta.transaction.Transactional;

public interface AuthService {
  UserEntity register(UserEntity entity);
  AuthRes login(LoginReq request);
  UserEntity getAuthUser();

  void verifyAccountEmail(String token);

  void resendEmailToken(String email);

  void changeEmail(LoginReq request);

  @Transactional
  void changePassword(ChangePasswordDto request);
}
