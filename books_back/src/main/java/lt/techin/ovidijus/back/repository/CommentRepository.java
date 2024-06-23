package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByBookId(long id);

}
