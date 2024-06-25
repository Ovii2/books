package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.CommentDTO;
import lt.techin.ovidijus.back.exceptions.CommentNotFoundException;
import lt.techin.ovidijus.back.model.Book;
import lt.techin.ovidijus.back.model.Comment;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.BookRepository;
import lt.techin.ovidijus.back.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserService userService;
    private final BookRepository bookRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, UserService userService, BookRepository bookRepository) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.bookRepository = bookRepository;
    }

    public List<Comment> getAllComments(long id) {
        return commentRepository.findByBookId(id);
    }

    public Comment addComment(long id, CommentDTO commentDTO) {
        User user = checkAuthorized();
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Comment newComment = new Comment();
        newComment.setUser(user);
        newComment.setComment(commentDTO.getComment());
        newComment.setBook(book);
        newComment.setDate(LocalDate.now());
        return commentRepository.save(newComment);
    }

    public Comment updateComment(long id, Comment comment, long commentId) throws CommentNotFoundException {
        User user = checkAuthorized();
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comment not found"));

        if (existingComment.getBook().getId() != id) {
            throw new RuntimeException("Comment does not belong to the specified book");
        }

        Long authorId = existingComment.getUser().getId();

        if (user.getRole().equals("ADMIN") || user.getId().equals(authorId)) {
            if (comment.getComment() != null) {
                existingComment.setComment(comment.getComment());
            }
            return commentRepository.save(existingComment);
        } else {
            throw new RuntimeException("User not authorized to update this comment");
        }
    }

    public void deleteComment(long id, long commentId) throws CommentNotFoundException {
        User user = checkAuthorized();
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comment not found"));

        if (existingComment.getBook().getId() != id) {
            throw new RuntimeException("Comment does not belong to the specified book");
        }

        Long authorId = existingComment.getUser().getId();

        if (user.getRole().equals("ADMIN") || user.getId().equals(authorId)) {
            commentRepository.deleteById(commentId);
        } else {
            throw new RuntimeException("User not authorized to delete this comment");
        }
    }

    private User checkAuthorized() {
        return userService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("Not authorized"));
    }
}
