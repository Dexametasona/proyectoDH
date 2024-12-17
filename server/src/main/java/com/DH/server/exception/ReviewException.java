package com.DH.server.exception;

public class ReviewException extends EntityException{
    public ReviewException(String message) {
        super("Review: "+message);
    }
}
