package com.DH.server.service.implement;

import com.DH.server.model.dto.EmailDTO;
import com.DH.server.service.interfaces.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }
    @Override
    public void sendMail(EmailDTO emailDTO, String template) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(emailDTO.recipient());
            helper.setSubject(emailDTO.subject());
            Context context = new Context();
            emailDTO.variables().forEach(context::setVariable);
            String contentHTML = templateEngine.process(template, context);
            helper.setText(contentHTML, true);
            javaMailSender.send(message);
        }catch (Exception e){
            throw new RuntimeException("Fail to send email: " + e.getMessage(), e);
        }
    }

    @Override
    public void sendMailOrder(EmailDTO emailDTO, String template) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true,"UTF-8");
            helper.setTo(emailDTO.recipient());
            helper.setSubject(emailDTO.subject());
            Context context = new Context();
            emailDTO.variables().forEach(context::setVariable);
            String contentHTML = templateEngine.process(template, context);
            helper.setText(contentHTML, true);
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Fail to send email: " + e.getMessage(), e);
        }
    }
}