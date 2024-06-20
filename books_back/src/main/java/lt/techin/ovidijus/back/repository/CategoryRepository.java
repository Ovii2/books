package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByTitle(Category title);

    //    List<Category> findByUserId(Long userId);

    boolean existsByTitle(String title);
}
