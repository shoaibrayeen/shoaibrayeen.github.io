---
layout: page
title: DBMS Assignment
permalink: /doc/dbms/
---

Q1 : Write an SQL query to determine the 5th highest salary from employee table without using TOP or limit method.
Query : SELECT DISTINCT (A1.SALARY) FROM EMPLOYEE A1 WHERE 5 = (SELECT COUNT(DISTINCT(A2.SALARY)) FROM EMPLOYEE A2 WHERE A1.SALARY <= A2.SALARY);

![Screenshot to Q1](./dbms_image/q1.png)


Q2 : Retrieve the first and last names of employees with the same salary.
Query : SELECT FNAME , LNAME FROM EMPLOYEE WHERE SALARY IN ( SELECT SALARY FROM EMPLOYEE GROUP BY SALARY HAVING COUNT(*) > 1);

![Screenshot to Q2](./dbms_image/q2.png)

Q3 : Retrieve department number of departments that have less than five employees in it.
Query : SELECT DNUMBER FROM DEPARTMENT WHERE DNUMBER IN ( SELECT DNO FROM EMPLOYEE GROUP BY DNO HAVING COUNT(*) < 5) OR DNUMBER NOT IN ( SELECT DNO FROM EMPLOYEE) ;

![Screenshot to Q3](./dbms_image/q3.png)
