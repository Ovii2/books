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
@CrossOrigin(origins = "*")
@RequestMapping("/books")
public class CommentController {

    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable long id) {
        List<Comment> comments = commentService.getAllComments(id);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable long id, @RequestBody CommentDTO commentDTO) {
        Comment newComment = commentService.addComment(id, commentDTO);
        return new ResponseEntity<>(newComment, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable long id, @PathVariable long commentId) {
        try {
            commentService.deleteComment(id, commentId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (CommentNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/comments/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable long id, @PathVariable long commentId,
                                                 @RequestBody Comment comment) {
        try {
            Comment updatedComment = commentService.updateComment(id, comment, commentId);
            return new ResponseEntity<>(updatedComment, HttpStatus.OK);
        } catch (CommentNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
