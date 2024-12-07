package com.DH.server.model.enums;

import lombok.Getter;

@Getter
public enum Type {

    TRANSPORTE(0),
    INFLADOR(1),
    IMPERMEABLE(2);

    private final int id;

    Type(int id) {this.id = id;}

    public static Type fromId(int id){
        for(Type type: values()){
            if( type.getId() == id){
                return type;
            }
        }
        throw new IllegalArgumentException("Type not found, id: "+id);
    }
}
