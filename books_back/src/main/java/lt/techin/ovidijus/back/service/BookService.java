package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.BookDTO;
import lt.techin.ovidijus.back.exceptions.BookNotFoundException;
import lt.techin.ovidijus.back.exceptions.NotAdminException;
import lt.techin.ovidijus.back.model.Book;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class BookService {

    private BookRepository bookRepository;
    private UserService userService;

    @Autowired
    public BookService(BookRepository bookRepository, UserService userService) {
        this.bookRepository = bookRepository;
        this.userService = userService;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book addBook(BookDTO bookDTO) throws NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can add books!");
        }
        if (bookRepository.existsByTitle(bookDTO.getTitle())) {
            throw new RuntimeException("This book already exists!");
        }
        Book book = new Book(
                bookDTO.getId(),
                bookDTO.getTitle(),
                bookDTO.getDescription(),
                bookDTO.getIsbn(),
                bookDTO.getImage(),
                bookDTO.getPages(),
                bookDTO.getCategory()
        );
        return bookRepository.save(book);
    }


    public Book updateBook(long id, Book book) throws BookNotFoundException, NotAdminException {
        User user = checkAuthorized();
        if (user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can edit books.");
        }

        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found"));

        if (book.getTitle() != null) {
            existingBook.setTitle(book.getTitle());
        }
        if (book.getDescription() != null) {
            existingBook.setDescription(book.getDescription());
        }
        if (book.getIsbn() != null) {
            existingBook.setIsbn(book.getIsbn());
        }
        if (book.getImage() != null) {
            existingBook.setImage(book.getImage());
        }
        if (book.getPages() != null) {
            existingBook.setPages(book.getPages());
        }
        if (book.getCategory() != null) {
            existingBook.setCategory(book.getCategory());
        }
        return bookRepository.save(existingBook);

    }

    public void deleteBook(long id) throws BookNotFoundException, NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can delete books!");
        }
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
        } else {
            throw new BookNotFoundException("Book not found!");
        }
    }


    public User checkAuthorized() {
        return userService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("Not authorized"));
    }
}
