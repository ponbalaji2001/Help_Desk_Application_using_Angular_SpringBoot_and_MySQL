package com.balaji.help_desk.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.balaji.help_desk.dto.UserDto;
import com.balaji.help_desk.enums.Department;
import com.balaji.help_desk.enums.Designation;
import com.balaji.help_desk.enums.Gender;
import com.balaji.help_desk.enums.Role;
import com.balaji.help_desk.enums.UserStatus;
import com.balaji.help_desk.model.UserModel;
import com.balaji.help_desk.repository.UserRepository;
import com.balaji.help_desk.spec.UserSpecification;
import com.balaji.help_desk.util.PasswordGeneratorUtil;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public Page<UserDto> getUsers(
            String search,
            Role role,
            UserStatus status,
            Department department,
            Designation designation,
            Gender gender,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {
        
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        if (sortBy != null && !sortBy.isBlank()) {
            sort = Sort.by(sortBy); 
            if ("desc".equalsIgnoreCase(sortDir)) {
                sort = sort.descending();
            }else {
                sort = sort.ascending();
            }
        }

        Pageable pageable = ((page >= 0) &&  (size > 0)) ? PageRequest.of(page, size, sort) : Pageable.unpaged();
        
        Page<UserModel> users = userRepository.findAll(
                UserSpecification.filterUsers(search, department, designation, role, status),
                pageable
        );
        
        List<UserDto> usersDto = users.stream().map(this::convertToDto).collect(Collectors.toList());

        return new PageImpl<>(usersDto, pageable, users.getTotalElements());
    }
	
	public UserModel getUser(Long id) {
		return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id " + id));
	}
	
	public UserModel saveUser(UserModel user) {
		user.setPassword(PasswordGeneratorUtil.generate());
		UserModel savedUser = userRepository.save(user); 
		savedUser.setCode(String.format("U%04d", savedUser.getId()));
		savedUser = userRepository.save(savedUser); 
		
        return savedUser;
    }
	
	public UserModel updateUser(Long id, UserModel user) {
	    UserModel existing = userRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("User not found with id " + id));

	    if (user.getName() != null) existing.setName(user.getName());
	    if (user.getEmail() != null) existing.setEmail(user.getEmail());
	    if (user.getMobileNo() != null) existing.setMobileNo(user.getMobileNo());
	    if (user.getDob() != null) existing.setDob(user.getDob());
	    if (user.getGender() != null) existing.setGender(user.getGender());
	    if (user.getDepartment() != null) existing.setDepartment(user.getDepartment());
	    if (user.getDesignation() != null) existing.setDesignation(user.getDesignation());
	    if (user.getRole() != null) existing.setRole(user.getRole());
	    if (user.getStatus() != null) existing.setStatus(user.getStatus());
	    if (user.getAddress() != null) existing.setAddress(user.getAddress());

	    return userRepository.save(existing);
	}
	
	public void deleteUser(Long id) { 
		
		if (!userRepository.existsById(id)) { 
			throw new RuntimeException("User not found with id " + id); 
		} 
		
		userRepository.deleteById(id); 
	}
	
	public UserDto convertToDto(UserModel user) {
		UserDto dto = new UserDto();
		dto.setId(user.getId());
		dto.setCode(user.getCode());
		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		dto.setMobileNo(user.getMobileNo());
		dto.setDob(user.getDob());
		dto.setGender(user.getGender());
		dto.setDepartment(user.getDepartment());
		dto.setDesignation(user.getDesignation());
		dto.setRole(user.getRole());
		dto.setStatus(user.getStatus());
		dto.setAddress(user.getAddress());
		
		return dto;
	}
	
		
}
