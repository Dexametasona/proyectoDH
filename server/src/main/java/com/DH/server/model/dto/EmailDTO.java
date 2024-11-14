package com.DH.server.model.dto;


import com.DH.server.model.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmailDTO {
    private String recipient;
    private String subject="Confirmation mail";
    private String username;

    public EmailDTO(UserEntity user){
        this.recipient = user.getEmail();
        this.username = user.getName() + " " + user.getLastname();

    }
}