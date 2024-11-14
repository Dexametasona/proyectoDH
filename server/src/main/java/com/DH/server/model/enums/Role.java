package com.DH.server.model.enums;

import lombok.Getter;

@Getter
public enum Role {
  ADMIN(0),
  USER(1);
  private final int id;
  Role( int id) {
    this.id = id;
  }

  public static Role fromId(int id){
    for(Role role: values()){
      if(role.getId() == id){
        return role;
      }
    }
    throw new IllegalArgumentException("Role not found, id: "+id);
  }
}
