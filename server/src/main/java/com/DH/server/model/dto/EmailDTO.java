package com.DH.server.model.dto;


import java.util.Map;

public record EmailDTO
        (String recipient,
         String subject,
         Map<String, String> variables) {

}