package com.DH.server.exception;

public class CategoryException extends EntityException{
    public CategoryException(String message) {
        super("Category"+message);
    }
}
