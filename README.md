# conceptA

## About

API for managing classes, students and projects in an edtech.

The API is available at the link https://concept-a-api.onrender.com


### 1. Create new class
To create a new class, you must make a post in the https://concept-a-api.onrender.com/classes route with the body of the message with the following format

```bash
{ 
  "name": "Class 1"
}
```

if it is in the correct format the api will answer a message with the following format

```bash
{ 
  "id": 1,
  "name": "Class 1"
  "createdAt": 1,
}
```

### 2. List all classes

### 2. List a class

To view a class, you must get the route https://concept-a-api.onrender.com/classes/:classId. Passing the class id in place of :classId. The API will respond with a message in the following format

```bash
{ 
  "id": 1,
  "name": "Class 1"
  "createdAt": 1,
}
```