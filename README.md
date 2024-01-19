# k6 Demo Project

This is a simple k6 demo project. The Load test are create for the [K6 REST Crocodiles API Endpoints](https://test-api.k6.io/).

## Description
The Load Test includes 4 test describe as follow:
 - Login in a existent account.
 - Get all the existent Crocodiles.
 - Get a single Crocodile.
 - Try getting a non-existen Crocodile.

 ## SetUp

 * Install k6 in your system
  - [K6 Installation guide](https://k6.io/docs/get-started/installation/)

 ## Dependecies
 
 * K6 Reporter
  - [HTML Report](https://github.com/benc-uk/k6-reporter)


## How to run

To run the Load test execute the following command line:

```bash
k6 run ./tests/crocodilesTest.js
```

## Check Test Summary Report

The Test Summary Report will be generated at the end of every run and saved in the `reports` folder. 


## Project Naming Conventions 

- Use `camelCase` for variable
- Use prefix like `is`, `are`, or `has` for bool variables.
- Use self explanatory names for variables.
- Start functions with a verb and the entity being affect by it.