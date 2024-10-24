package com.DH.server.model.enums;

import lombok.Getter;

@Getter
public enum ProductStatus {
  AVAILABLE(0), MAINTENANCE(1), BOOKED(2);
  private final int id;

  ProductStatus(int id) {
    this.id = id;
  }
  public static ProductStatus fromId(int id){
    for(ProductStatus status: values()){
      if(status.getId() == id){
        return status;
      }
    }
    throw new IllegalArgumentException("product status not found, id: "+id);
  }
}
