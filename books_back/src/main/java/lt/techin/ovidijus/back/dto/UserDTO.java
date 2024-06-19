package lt.techin.ovidijus.back.dto;

import lombok.Data;

@Data
public class UserDTO {

    private long id;
    private String userName;
    private String email;
    private String password;
    private String role;
}
