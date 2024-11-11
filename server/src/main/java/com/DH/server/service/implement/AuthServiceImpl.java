package com.DH.server.service.implement;

import com.DH.server.exception.UserException;
import com.DH.server.model.dto.request.LoginReq;
import com.DH.server.model.dto.response.AuthRes;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.enums.Role;
import com.DH.server.model.mapper.UserMapper;
import com.DH.server.service.interfaces.AuthService;
import com.DH.server.service.interfaces.UserService;
import com.DH.server.util.JwtUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
  private final PasswordEncoder encoder;
  private final AuthenticationManager authenticationManager;
  private final UserService userService;
  private final UserMapper userMapper;
  private final JwtUtils jwtutils;

  @Transactional
  @Override
  public UserEntity register(UserEntity entity) {
    try {
      UserEntity user = this.userService.getByEmail(entity.getEmail());
      if(user.getIsDeleted()){
        this.userMapper.update(user, entity);
        user.setPassword(encoder.encode(entity.getPassword()));
        user.setRole(Role.USER);
        return userService.create(user);
      }
    } catch (UserException ex) {
      entity.setPassword(encoder.encode(entity.getPassword()));
      entity.setRole(Role.USER);
      return userService.create(entity);
    }
    throw new UserException("Already exist, email: "+entity.getEmail());
  }

  @Override
  public AuthRes login(LoginReq request) {
    try {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.password()));
    UserEntity user = userService.getByEmail(request.email());
    if(user.getIsDeleted()){
      throw new UserException("this account was deleted");
    }
    return new AuthRes(jwtutils.generateToken(user),
            user.getRole().getId(),
            user.getId());
    } catch (DisabledException e){
      throw new UserException("Account not verified, email: "+request.email());
    }
    catch (BadCredentialsException e){
      throw new UserException("The password doesn't match");
    }
  }

  @Override
  public UserEntity getAuthUser() {
    return (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}
