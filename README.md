# API Documentation

This document provides the API details for the backend 

Node Version: 18.20.4 LTS
npm Version: 9.3.0

## Base URL

The API endpoints described below are accessible via the base URL:
```
http://localhost:3000/api/auth
http://localhost:3000/api/assignments

```
Default username and Password: `admin : password`

### Authentication
POST ``/auth/login``: Authenticates a user and returns a JWT token.

### Assignments
GET ``/assignments``: Retrieves a list of all assignments.

GET ``/assignments/:id``: Retrieves details of a single assignment by ID.

POST ``/assignments``: Creates a new assignment.

PUT ``/assignments/:id``: Updates an existing assignment by ID.

DELETE ``/assignments/:id``: Deletes an assignment by ID


## Run with Docker

Make sure your in root of the directory:

Step 1: 

``` docker build -t my_microservice . ```

Step 2: 

``` docker run -p 3000:3000 my_microservice ```

Done!!

