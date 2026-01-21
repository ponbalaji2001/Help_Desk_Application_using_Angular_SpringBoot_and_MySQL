package com.balaji.help_desk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.balaji.help_desk.model.CategoryModel;

public interface CategoryRepository extends JpaRepository<CategoryModel, Long> {

}
