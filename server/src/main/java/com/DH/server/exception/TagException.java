package com.DH.server.exception;

public class TagException extends EntityException{
    public TagException(String message) {
        super("Tag: "+message);

    }
}
