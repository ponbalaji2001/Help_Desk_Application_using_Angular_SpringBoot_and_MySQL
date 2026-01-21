package com.balaji.help_desk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.balaji.help_desk.model.UserModel;
import com.balaji.help_desk.repository.UserRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserModel user = userRepository.findByEmail(email)
		.orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
		
		return new User(user.getEmail(), user.getPassword(), null);
	}

}
