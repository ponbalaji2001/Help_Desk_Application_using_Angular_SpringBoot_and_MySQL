package com.balaji.help_desk.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.balaji.help_desk.dto.ItemDto;
import com.balaji.help_desk.dto.UserDto;
import com.balaji.help_desk.enums.Department;
import com.balaji.help_desk.enums.Designation;
import com.balaji.help_desk.enums.Gender;
import com.balaji.help_desk.enums.Role;
import com.balaji.help_desk.enums.UserStatus;
import com.balaji.help_desk.model.UserModel;
import com.balaji.help_desk.service.UserService;

@RestController
@RequestMapping("api/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/list")
	public ResponseEntity<Map<String, Object>> getUsers(
	        @RequestParam(required = false) String search,
	        @RequestParam(required = false) Role role,
	        @RequestParam(required = false) UserStatus status,
	        @RequestParam(required = false) Department department,
	        @RequestParam(required = false) Designation designation,
	        @RequestParam(required = false) Gender gender,
	        @RequestParam(defaultValue= "-1", required = false) int page,
	        @RequestParam(defaultValue= "-1", required = false) int size,
	        @RequestParam(required = false) String sortBy,
	        @RequestParam(required = false) String sortDir
	) {
		
	    Page<UserDto> users = userService.getUsers(
	            search, role, status, department, designation, gender,
	            page, size, sortBy, sortDir
	    );
	    
	    Map<String, Object> response = Map.of(
	            "data", users.getContent(),
	            "page_index", users.getNumber(),
	            "page_size", users.getSize(),
	            "data_size", users.getTotalElements(),
	            "total_pages", users.getTotalPages()
	    );
	    
	    return ResponseEntity.ok(response);
	}

	
	@GetMapping("/{id}")
    public ResponseEntity<UserModel> getUser(@PathVariable Long id) {
        UserModel user = userService.getUser(id);
        return ResponseEntity.ok(user);
	}
	
	@PostMapping
    public ResponseEntity<UserModel> createUser(@RequestBody UserModel user) {
        UserModel savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserModel> updateUser(
            @PathVariable Long id,
            @RequestBody UserModel user
    ) {
        UserModel updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
    
    @GetMapping("/designations")
    public List<ItemDto> getDesignations() {
        return Arrays.stream(Designation.values())
                     .map(d -> new ItemDto(d.name(), d.getDisplayName())) 
                     .toList();
    }

    @GetMapping("/departments")
    public List<ItemDto> getDepartments() {
        return Arrays.stream(Department.values())
                     .map(d -> new ItemDto(d.name(), d.getDisplayName()))
                     .toList();
    }

    @GetMapping("/roles")
    public List<ItemDto> getRoles() {
        return Arrays.stream(Role.values())
                     .map(r -> new ItemDto(r.name(), r.getDisplayName()))
                     .toList();
    }
    
    @GetMapping("/statuses")
    public List<ItemDto> getStatuses() {
        return Arrays.stream(UserStatus.values())
                     .map(s -> new ItemDto(s.name(), s.getDisplayName()))
                     .toList();
    }
    
    @GetMapping("/genders")
    public List<ItemDto> getGenders() {
        return Arrays.stream(Gender.values())
                     .map(g -> new ItemDto(g.name(), g.getDisplayName()))
                     .toList();
    }
}
