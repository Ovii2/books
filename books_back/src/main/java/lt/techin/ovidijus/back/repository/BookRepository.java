package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

    boolean existsByTitle(String title);
}
