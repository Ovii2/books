package lt.techin.ovidijus.back.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CommentDTO {

    private Long id;
    private String comment;
    private String author;
    private LocalDate date;
}
