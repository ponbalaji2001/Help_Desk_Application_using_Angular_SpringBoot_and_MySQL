package com.balaji.help_desk.spec;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

import com.balaji.help_desk.enums.Department;
import com.balaji.help_desk.enums.Designation;
import com.balaji.help_desk.enums.Role;
import com.balaji.help_desk.enums.UserStatus;
import com.balaji.help_desk.model.UserModel;

public class UserSpecification {

    public static Specification<UserModel> filterUsers(
            String search,
            Department department,
            Designation designation,
            Role role,
            UserStatus status
    ) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {
                String pattern = "%" + search.toLowerCase() + "%";

                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), pattern),
                        cb.like(cb.lower(root.get("email")), pattern),
                        cb.like(cb.lower(root.get("code")), pattern)
                ));
            }

            if (role != null)
                predicates.add(cb.equal(root.get("role"), role));

            if (status != null)
                predicates.add(cb.equal(root.get("status"), status));

            if (department != null)
                predicates.add(cb.equal(root.get("department"), department));

            if (designation != null)
                predicates.add(cb.equal(root.get("designation"), designation));


            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

