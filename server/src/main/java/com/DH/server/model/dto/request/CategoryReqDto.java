package com.DH.server.model.dto.request;

import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CategoryReqDto {

    @NotBlank(groups = {OnCreate.class})
    @Size(min=5, max=100, groups = {OnCreate.class, OnUpdate.class})
    String name;
}
