package com.DH.server.service.implement;

import com.DH.server.exception.EmailException;
import com.DH.server.exception.UserException;
import com.DH.server.model.dto.request.UserFilters;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.enums.Role;
import com.DH.server.model.mapper.UserMapper;
import com.DH.server.persistance.UserRepository;
import com.DH.server.service.interfaces.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final UserMapper userMapper;

  @Override
  public UserEntity create(UserEntity entity) {
    return this.userRepository.save(entity);
  }

  @Override
  public UserEntity getById(Long id) {
    return this.userRepository.findById(id)
            .orElseThrow(()->new UserException("not found, id:"+id));
  }

  @Override
  public UserEntity updateById(Long id, UserEntity entity) {
    UserEntity previous = this.getById(id);
    this.userMapper.update(previous, entity);
    return this.userRepository.save(previous);
  }

  @Transactional
  @Override
  public void deleteById(Long id) {
    this.getById(id);
    int  affectedRows = this.userRepository.updateIsDeleted(id, true);
    if(affectedRows != 1){
      throw new UserException("More than one entity has been affected");
    }
  }

  @Override
  public List<UserEntity> getAll() {
    return List.of();
  }

  @Override
  public Page<UserEntity> getAll(Pageable pageable, UserFilters filters) {
    Role role = filters.role() == null ? null : Role.fromId(filters.role());
    return this.userRepository.findAllByFilter(
            pageable,
            filters.name(),
            filters.lastname(),
            role,
            filters.email(),
            filters.isDeleted());
  }

  @Override
  public UserEntity getByEmail(String email){
    return this.userRepository.findByEmail(email)
            .orElseThrow(()->new UserException("not found, email: "+email));

  }

  @Override
  public UserEntity getByEmailToken(String emailToken) {
    return this.userRepository.findByTokenEmail(emailToken)
            .orElseThrow(()->new UserException("Token already used, replaced or invalid , token: "+emailToken));
  }

  @Override
  public void updateEnabledByUserId(Long id) {
    int rowsAffect = this.userRepository.updateIsEnabled(id, true);
    if(rowsAffect != 1){
      throw new UserException("Many users were affect when update enabled. id: "+ id);
    }
  }

  @Override
  public void updateTokenEmail(String email, String token) {
    var currentUser = this.getByEmail(email);
    if(currentUser.getTokenEmail() == null){
      throw new EmailException("This account is already verified, email: "+email);
    }
    int rowsAffect = this.userRepository.updateTokenEmail(currentUser.getId(), token);
    if(rowsAffect != 1){
      throw new UserException("Many users were affect when update token. email: "+ email);
    }
  }

  @Override
  public UserEntity updateRoleById(Long id, Integer role) {
    UserEntity currentUser = this.getById(id);
    if(Objects.equals(currentUser.getEmail(), "prueba01@gmail.com")){
      throw new UserException("You can't remove permissions to MASTER user");
    }
    currentUser.setRole(Role.fromId(role));
    return this.userRepository.save(currentUser);
  }
}
