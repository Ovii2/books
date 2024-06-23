package lt.techin.ovidijus.back.controller;

import lt.techin.ovidijus.back.dto.CommentDTO;
import lt.techin.ovidijus.back.exceptions.CommentNotFoundException;
import lt.techin.ovidijus.back.model.Comment;
import lt.techin.ovidijus.back.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/books/{bookId}")
public class CommentController {

    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable long bookId) {
        List<Comment> comments = commentService.getAllComments(bookId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Comment> addComment(@PathVariable long bookId, @RequestBody CommentDTO commentDTO) {
        Comment newComment = commentService.addComment(bookId, commentDTO);
        return new ResponseEntity<>(newComment, HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable long bookId, @PathVariable long commentId) {
        try {
            commentService.deleteComment(bookId, commentId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (CommentNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable long bookId,@PathVariable long commentId,
                                                 @RequestBody Comment comment) {
        try {
            Comment updatedComment = commentService.updateComment(bookId,comment, commentId);
            return new ResponseEntity<>(updatedComment, HttpStatus.OK);
        } catch (CommentNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
