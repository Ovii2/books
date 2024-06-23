package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {

}
