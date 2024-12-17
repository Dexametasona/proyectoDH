package com.DH.server.exception;

public class CharacteristicsException extends EntityException{

    public CharacteristicsException(String message) {
        super("Character: "+message);
    }
}
