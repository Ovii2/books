package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.CommentDTO;
import lt.techin.ovidijus.back.exceptions.BookNotFoundException;
import lt.techin.ovidijus.back.exceptions.CommentNotFoundException;
import lt.techin.ovidijus.back.exceptions.NotAdminException;
import lt.techin.ovidijus.back.model.Book;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.Comment;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.BookRepository;
import lt.techin.ovidijus.back.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private CommentRepository commentRepository;
    private UserService userService;
    private BookRepository bookRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
    }

    public List<Comment> getAllComments() {
//        User user = checkAuthorized();
//
//        if (!user.getRole().equals("ADMIN")) {
//            throw new NotAdminException("Only admins can access all categories.");
//        }
        return commentRepository.findAll();
    }

    public Comment addComment(CommentDTO commentDTO, long id) throws BookNotFoundException {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("Book doesn't exist");
        }
        Comment newComment = new Comment();
        newComment.setComment(commentDTO.getComment());
        return commentRepository.save(newComment);
    }

    public Comment updateComment(Comment comment, long id) throws CommentNotFoundException {
        Comment existingComment = commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException(
                "Comment not found"));
        if (comment.getComment() != null) {
            existingComment.setComment(comment.getComment());
        }
        return commentRepository.save(existingComment);
    }

    public User checkAuthorized() {
        return userService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("Not authorized"));
    }
}
