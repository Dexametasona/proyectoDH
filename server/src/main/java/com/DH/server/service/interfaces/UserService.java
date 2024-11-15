package com.DH.server.service.interfaces;

import com.DH.server.model.dto.request.UserFilters;
import com.DH.server.model.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService extends GenericService<UserEntity>{
  Page<UserEntity> getAll(Pageable pageable, UserFilters filters);

  UserEntity getByEmail(String email);

  UserEntity getByEmailToken(String emailToken);
  void updateEnabledByUserId(Long id);
  void updateTokenEmail(String email, String token);

  UserEntity updateRoleById(Long id, Integer role);
}
