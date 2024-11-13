package com.DH.server.model.dto;

import com.DH.server.model.dto.response.UserResDto;

public class EmailDTO {
    private String recipient;
    private String subject="Confirmation mail";
    private String message="Se ha registrado exitosamente";

    public EmailDTO(UserResDto userResDto){
        this.recipient = userResDto.getEmail();
    }
    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


}