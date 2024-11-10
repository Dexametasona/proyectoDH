package com.DH.server.model.dto.response;

<<<<<<< Updated upstream
public class CategoryResDto {
    long id;
    String name;
=======
import com.DH.server.model.entity.Photo;

public record CategoryResDto(
        long ID, String title, String description, String photoUrl) {

>>>>>>> Stashed changes
}
