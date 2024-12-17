package com.DH.server.exception;

public class FavoriteException extends EntityException {
  public FavoriteException(String message) {
    super("Favorite: "+message);
  }
}
