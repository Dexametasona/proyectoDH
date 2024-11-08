package com.DH.server.exception;

public class UserException extends EntityException{
  public UserException(String message) {
    super("User: "+message);
  }
}
