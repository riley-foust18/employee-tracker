INSERT INTO departments (name)
  VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
  VALUES 
      ("Sales Lead", 100000, 1),    
      ("Salesperson", 80000, 1),
      ("Lead Engineer", 150000, 2),
      ("Software Engineer", 120000, 2),
      ("Account Manager", 200000, 3),
      ("Accountant", 125000, 3),
      ("Legal Team Lead", 250000, 4),
      ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES
    ("Benny", "Foster", 1),
    ("Pamela", "Myers", 2, 1),
    ("Vicky", "Hanson", 3),
    ("Simon", "Price", 4, 3),
    ("Roxanne", "Brady", 5),
    ("Emanuel", "Brewer", 6, 5),
    ("Josefina", "Jefferson", 7),
    ("Rogelio", "Rodriguez", 8, 7);