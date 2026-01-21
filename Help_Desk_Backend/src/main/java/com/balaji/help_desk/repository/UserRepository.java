package com.balaji.help_desk.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.balaji.help_desk.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long>, JpaSpecificationExecutor<UserModel>{
	Optional<UserModel> findByEmail(String email);
}
