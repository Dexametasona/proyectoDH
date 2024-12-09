package com.DH.server.exception;

public class PoliticaDeUsoException extends EntityException{
    public PoliticaDeUsoException(String message) {
        super("Politica de Uso: " + message);
    }
    
}
