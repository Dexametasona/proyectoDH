package com.DH.server.service.implement;

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
            filters.email());
  }

  @Override
  public UserEntity getByEmail(String email){
    return this.userRepository.findByEmail(email)
            .orElseThrow(()->new UserException("not found, email: "+email));

  }

}
