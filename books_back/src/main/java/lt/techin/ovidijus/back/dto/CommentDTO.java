package lt.techin.ovidijus.back.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CommentDTO {

    private Long id;
    private String comment;
    private Long author_id;
    private LocalDate date;
}
