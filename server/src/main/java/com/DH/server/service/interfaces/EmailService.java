package com.DH.server.service.interfaces;

import com.DH.server.model.dto.EmailDTO;
import jakarta.mail.MessagingException;
public interface EmailService {
    public void sendMail(EmailDTO emailDTO) throws MessagingException;
}
