package com.springCRUD.controllers;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.WebContext;

import com.springCRUD.models.Employee;
import com.springCRUD.repositories.EmployeeRepository;
import com.springCRUD.utilities.EmployeeNotFoundException;

@RestController
public class EmployeeController {
	
	@Autowired
	private final EmployeeRepository repository;
	
	EmployeeController(EmployeeRepository repository) {
		this.repository = repository;
	}
		
	@GetMapping("/employees-list")
	public ModelAndView home() {
		return new ModelAndView("employees");
	}
	
	@GetMapping("/employees")
	List<Employee> all() {
		return repository.findAll();
	}
	
	@PostMapping("/employees")
	Employee newEmployee(@RequestBody Employee newEmployee) {
		return repository.save(newEmployee);
	}
	
	@GetMapping("/employees/{id}")
	Employee one(@PathVariable Long id) {
		return repository.findById(id)
			.orElseThrow(() -> new EmployeeNotFoundException(id));
	}

	@PutMapping("/employees/{id}")
	Employee replaceEmployee(@RequestBody Employee newEmployee, @PathVariable Long id) {
		return repository.findById(id)
			.map(employee -> {
				employee.setName(newEmployee.getName());
				employee.setRole(newEmployee.getRole());
				return repository.save(employee);
			})
			.orElseGet(() -> {
				newEmployee.setId(id);
				return repository.save(newEmployee);
			});
	}
	
	@DeleteMapping("/employees/{id}")
	void deleteEmployee(@PathVariable Long id) {
		repository.deleteById(id);
	}
	
	public void process(
	        final HttpServletRequest request, final HttpServletResponse response,
	        final ServletContext servletContext, final ITemplateEngine templateEngine)
	        throws Exception {
	    
	  
	    List<Employee> all = repository.findAll(); 
	    
	    WebContext ctx = new WebContext(request, response, servletContext, request.getLocale());
	    ctx.setVariable("employees", all);
	    
	    templateEngine.process("employees", ctx, response.getWriter());
	    
	}
	
}
