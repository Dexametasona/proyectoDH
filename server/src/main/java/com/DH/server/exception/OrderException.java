package com.DH.server.exception;

public class OrderException extends EntityException {
  public OrderException(String message) {
    super("Order: "+message);
  }
}
