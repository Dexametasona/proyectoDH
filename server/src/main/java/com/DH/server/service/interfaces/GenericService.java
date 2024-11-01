package com.DH.server.service.interfaces;

import java.util.List;

public interface GenericService <T>{
  T create(T entity);
  T getById(Long id);
  T updateById(Long id, T entity);
  void deleteById(Long id);
  List<T> getAll();
}
