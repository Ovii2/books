package lt.techin.ovidijus.back.dto;

import lombok.Data;

@Data
public class BookDTO {

    private Long id;
    private Long categoryId;
    private String description;
    private String title;
    private Integer isbn;
    private String image;
    private Integer pages;
}
