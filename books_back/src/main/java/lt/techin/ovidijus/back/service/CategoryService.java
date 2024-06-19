package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.CategoryDTO;
import lt.techin.ovidijus.back.exceptions.CategoryNotFoundException;
import lt.techin.ovidijus.back.exceptions.NotAdminException;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;
    private UserService userService;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, UserService userService) {
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }

    public List<Category> getAllCategories() throws NotAdminException {
        User user = checkAuthorized();

        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can access all categories.");
        }
        return categoryRepository.findAll();
    }


    public Category createCategory(CategoryDTO categoryDTO) throws NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can create categories!");
        }
        if (categoryRepository.existsByTitle(categoryDTO.getTitle())) {
            throw new RuntimeException("Category already exists!");
        }
        Category category = new Category(
                categoryDTO.getId(),
                categoryDTO.getTitle(),
                categoryDTO.getDescription()
        );
        return categoryRepository.save(category);
    }

    public Category updateCategory(long id, Category category) throws CategoryNotFoundException, NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can update categories!");
        }

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        if (category.getTitle() != null) {
            existingCategory.setTitle(category.getTitle());
        }
        if (category.getDescription() != null) {
            existingCategory.setDescription(category.getDescription());
        }
        return categoryRepository.save(existingCategory);
    }

    public void deleteCategory(long id) throws CategoryNotFoundException, NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can delete categories!");
        }
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        } else {
            throw new CategoryNotFoundException("Category not found!");
        }
    }

    public User checkAuthorized() {
        return userService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("Not authorized"));
    }
}
