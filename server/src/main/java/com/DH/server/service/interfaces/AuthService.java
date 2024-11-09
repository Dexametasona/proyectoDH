package com.DH.server.service.interfaces;

import com.DH.server.model.dto.request.LoginReq;
import com.DH.server.model.dto.response.AuthRes;
import com.DH.server.model.entity.UserEntity;

public interface AuthService {
  UserEntity register(UserEntity entity);
  AuthRes login(LoginReq request);
  UserEntity getAuthUser();
}
