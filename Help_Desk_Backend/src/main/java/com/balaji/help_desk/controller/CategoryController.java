package com.balaji.help_desk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.balaji.help_desk.model.CategoryModel;
import com.balaji.help_desk.service.CategoryService;

@RestController
@RequestMapping("api/category")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping
	public ResponseEntity<List<CategoryModel>> getCategories() {
		List<CategoryModel> categories = categoryService.getCategories();
		return ResponseEntity.ok(categories);
	}
}
