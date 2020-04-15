package com.springCRUD.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springCRUD.models.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Long>{


}
