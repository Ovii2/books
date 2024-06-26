package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.BookDTO;
import lt.techin.ovidijus.back.exceptions.BookNotFoundException;
import lt.techin.ovidijus.back.exceptions.CategoryNotFoundException;
import lt.techin.ovidijus.back.exceptions.NotAdminException;
import lt.techin.ovidijus.back.model.Book;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.BookRepository;
import lt.techin.ovidijus.back.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final CategoryRepository categoryRepository;
    private BookRepository bookRepository;
    private UserService userService;

    @Autowired
    public BookService(BookRepository bookRepository, UserService userService, CategoryRepository categoryRepository) {
        this.bookRepository = bookRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getOneBook(Long id) {
//        return bookRepository.findById(id);
        if (id == null) {
            throw new IllegalArgumentException("Id must not be null");
        }
        return bookRepository.findById(id);
    }

    public Book addBook(BookDTO bookDTO) throws NotAdminException, CategoryNotFoundException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can add books!");
        }
        if (bookRepository.existsByTitle(bookDTO.getTitle())) {
            throw new RuntimeException("This book already exists!");
        }

        Category category =
                categoryRepository.findById(bookDTO.getCategoryId()).orElseThrow(() -> new CategoryNotFoundException(
                        "Category not found"));


        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setDescription(bookDTO.getDescription());
        book.setIsbn(bookDTO.getIsbn());
        book.setImage(bookDTO.getImage());
        book.setPages(bookDTO.getPages());
        book.setCategory(category);

        return bookRepository.save(book);
    }


    public Book updateBook(Long id, BookDTO book) throws BookNotFoundException, NotAdminException,
            CategoryNotFoundException {

        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can edit books.");
        }

        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book with id: " + id + " not found"));

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
        if (book.getCategoryId() != null) {
            Category cat = categoryRepository.findById(book.getCategoryId())
                    .orElseThrow(() -> new CategoryNotFoundException("Category with id: " + book.getCategoryId() + " not found"));
            existingBook.setCategory(cat);
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
