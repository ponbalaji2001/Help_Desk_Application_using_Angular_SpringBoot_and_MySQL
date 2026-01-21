package com.balaji.help_desk.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.balaji.help_desk.model.CategoryModel;
import com.balaji.help_desk.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	public List<CategoryModel> getCategories(){
		List<CategoryModel> categories = categoryRepository.findAll();
		return categories;
	}
}
