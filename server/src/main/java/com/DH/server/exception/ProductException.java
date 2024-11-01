package com.DH.server.exception;

public class ProductException extends EntityException {
  public ProductException(String message) {
    super("Product: "+message);
  }
}
