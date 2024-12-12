package com.DH.server.model.enums;

import lombok.Getter;

@Getter
public enum Type {

    PORTABILIDAD(1),
    UBICACION(2),
    RESISTENCIA(3),
    MONTAJE(4),
    USO(5),
    ESTETICA(6),
    OTROS(7);


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
