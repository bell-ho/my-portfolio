package com.portfolio.back.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProjectImagesInsertReq {

    private List<String> images = new ArrayList<>();
}
