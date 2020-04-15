package com.springCRUD.models;

public enum Role {
	
		ELECTRICIAN(1500), 
		PAINTER(1600), 
		CARPENTER(1700), 
		PLUMBER(1800);

		private double salary;

		private Role(double salary) {
			setSalary(salary);
		}

		public double getSalary() {
			return salary;
		}

		public void setSalary(double salary) {
			this.salary = salary;
		}
		
}
