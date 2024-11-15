package com.DH.server.exception;

public class EmailException extends ApplicationException {
  public EmailException(String message) {
    super("Email: "+message);
  }
}
