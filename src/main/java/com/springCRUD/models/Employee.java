package com.springCRUD.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Employee {

	private @Id @GeneratedValue Long id;
	private String name;

	@Enumerated(EnumType.STRING)
	private Role role;

	public Employee() {

	}

	public Employee(String name, Role role, String roleName, Double salary) {
		setName(name);
		setRole(role);
		setRoleName(roleName);
		setSalary(salary);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRoleName() {
		return role.name();
	}

	public void setRoleName(String roleName) {
		role.name();
	}

	public double getSalary() {
		return role.getSalary();
	}

	public void setSalary(double salary) {
		role.getSalary();
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

}
