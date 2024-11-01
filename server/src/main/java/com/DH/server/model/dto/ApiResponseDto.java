package com.DH.server.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApiResponseDto<T> {
  private boolean isSuccess;
  private String message;
  private T data;

  public ApiResponseDto(T data) {
    this.data = data;
    this.message = "Operation successful";
    this.isSuccess = true;
  }

  public ApiResponseDto(String message, T data) {
    this.message = message;
    this.isSuccess = false;
    this.data = data;
  }
}