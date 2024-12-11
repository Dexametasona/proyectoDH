package com.DH.server.model.enums;

import lombok.Getter;

@Getter
public enum Type {

    TRANSPORTE_FACIL(1),
    APTO_INTERIOR(2),
    APTO_EXTERIOR(3),
    RESIST_AGUA(4),
    FACIL_MONTAR(5),
    LIGERO_PORT(6),
    DURABILIDAD(7),
    CONEX_ELECTR(8),
    NIÑOS(9),
    ADULTOS(10),
    TODAS_EDADES(11),
    BODAS_EVENTOS(12),
    COLORES(13),
    ACCESORIOS(14),
    COMPACTO(15),
    COMPETITIVO(16),
    ACT_INTERACTIVO(17),
    SUPERVISION(18),
    NO_ENSAMBLAJE(19),
    LIMPIEZA_MANTENIMIENTO(20);


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
