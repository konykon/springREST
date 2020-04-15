package com.springCRUD.utilities;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.springCRUD.models.Employee;
import com.springCRUD.models.Role;
import com.springCRUD.repositories.EmployeeRepository;

@Configuration
public class LoadDatabase {
	
	@Bean
	CommandLineRunner initDatabase(EmployeeRepository repository) {
		
		return args -> {
			System.out.println("Preloading Data to memory Database");
			repository.save(new Employee("Bilbo Baggins", Role.CARPENTER, Role.CARPENTER.name(), Role.CARPENTER.getSalary()));
			repository.save(new Employee("Frodo Baggins", Role.ELECTRICIAN, Role.ELECTRICIAN.name(), Role.ELECTRICIAN.getSalary()));
			System.out.println("Data loaded");
		};
	}

}
