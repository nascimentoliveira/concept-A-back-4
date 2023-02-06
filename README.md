# conceptA-2

## About

API for managing classes, students and projects in an edtech.

The API deploy is available at the link https://concept-a-api-2.onrender.com


### **1. Create new class**
To create a new class, you must do a `post` method in the route https://concept-a-api-2.onrender.com/classes with the body of the message with the following format:

```bash
{
  "name": "Class 1"
}
```

if it is in the correct format the api will answer a message with the following format

```bash
{
  "id": 1,
  "name": "Class 1",
  "createdAt": "2023-01-22T22:32:37.746Z"
}
```

### **2. List all classes**

To view all classes, you must do a `get` method in the https://concept-a-api-2.onrender.com/classes route. The API will respond with a message in the following format:

```bash
[
  {
    "id": 1,
    "name": "Class 1",
    "numberOfProjects": "8",
    "numberOfStudents": "10",
    "createdAt": "2023-01-22T22:32:37.746Z"
  },
  {
    "id": 2,
    "name": "Class 2",
    "numberOfProjects": "4",
    "numberOfStudents": "15",
    "createdAt": "2023-01-22T22:33:26.393Z"
  },
  ...,
]
```
### **3. List a class**

To view a class, you must do a `get` method at the  https://concept-a-api-2.onrender.com/classes/:classId route, passing the class id in place of `:classId`. The API will respond with a message in the following format:

```bash
{
    "id": 1,
    "name": "Class 1",
    "numberOfProjects": "8",
    "numberOfStudents": "10",
    "createdAt": "2023-01-22T22:32:37.746Z"
  },
```
### **4. Edit a class**

To edit a class, you must make a `patch` method in the https://concept-a-api-2.onrender.com/classes/:classId route, passing the class id in place of `:classId` with the body of the message with the following format:

```bash
{
  "name": "New Class 1"
}
```
if it is in the correct format the api will answer a message with the following format

```bash
{
  "id": 1,
  "name": "New Class 1",
  "createdAt": "2023-01-22T22:32:37.746Z"
}
```

### **5. Delete a class**

To delete a class, you must make a `delete` method in the https://concept-a-api-2.onrender.com/classes/:classId route, passing the class id in place of `:classId`. The api will answer a message with the following format:

```bash
{
  "id": 1
}
```
### **6. Assign a project to a class**

To assign a project to a class, you must make a `post` method in the route https://concept-a-api-2.onrender.com/classes/:classId/projects/:projectId, replacing `:classId` with the id class and `:projectId` with the id of the project you want to assign. The body of the request must have the following format

```bash
{
  "deadline": "2023-02-28T20:58:53.822Z"
}
```
if it is in the correct format the api will answer a message with the following format


The api will answer a message with the following format:

```bash
{
  "id": 1,
  "projectId": 1,
  "classId": 1,
  "deadline": "2023-02-28T20:58:53.822Z",
  "createdAt": "2023-01-30T14:00:16.506Z"
}
```

### **7. Unassign a project to a class**

To unassign a project to a class, you must make a `delete` method in the route https://concept-a-api-2.onrender.com/classes/:classId/projects/:projectId, replacing `:classId` with the id class and `:projectId` with the id of the project you want to assign. The api will answer a message with the following format:

```bash
{
  "id": 1
}
```

### **8. List the projects of a class**

To list projects assigned to a class,you must make a `get` method in the https://concept-a-api-2.onrender.com/classes/:classId/projects route, passing the class id in place of `:classId`. The API will respond with a message in the following format:

```bash
{
  "id": 1,
  "className": "Class 1",
  "projects": [
    {
      "projectId": 1,
      "projectName": "Project 1",
      "deadline": "2023-02-28T20:58:53.822Z"
    },
    {
      "projectId": 2,
      "projectName": "Project 2",
      "deadline": "2023-02-28T20:58:53.822Z"
    },
  ],
  "createdAt": "2023-01-29T20:58:53.796Z"
}
```
### **9. List the students of a class**

To list students assigned to a class, you must make a `get` method in the https://concept-a-api-2.onrender.com/classes/:classId/students route, passing the class id in place of `:classId`. The API will respond with a message in the following format:

```bash
{
  "id": 1,
  "className": "Class 1",
  "students": [
    {
      "studentId": 1,
      "studentName": "Student 1"
    },
    {
      "studentId": 2,
      "studentName": "Student 2"
    }
  ],
  "createdAt": "2023-01-29T20:58:53.796Z"
}
```

### **10. Create new student**
To create a new student, you must do a `post` method in the route https://concept-a-api-2.onrender.com/students with the body of the message with the following format:

```bash
{
  "name": "Student 1",
  "classId": "1"
}
```

if it is in the correct format the api will answer a message with the following format

```bash
{
  "id": 1,
  "name": "Student 1",
  "classId": 1,
  "createdAt": "2023-01-22T23:08:43.954Z"
}
```

### **11. List all students**

To view all students, you must do a `get` method in the https://concept-a-api-2.onrender.com/students route. The API will respond with a message in the following format:

```bash
[
  {
    "id": 1,
    "name": "Student 1",
    "classId": 1,
    "createdAt": "2023-01-22T23:08:43.954Z"
  },
  {
    "id": 2,
    "name": "Student 2",
    "classId": 1,
    "createdAt": "2023-01-22T23:10:49.299Z"
  },
  ...,
]
```
### **12. List a student**

To view a student, you must do a `get` method at the  https://concept-a-api-2.onrender.com/students/:studentId route, passing the student id in place of `:studentId`. The API will respond with a message in the following format:

```bash
{
  "id": 1,
  "name": "Student 1",
  "classId": 1,
  "createdAt": "2023-01-22T23:08:43.954Z"
}
```
### **13. Edit a student**

To edit a student, you must make a `patch` method in the https://concept-a-api-2.onrender.com/students/:studentId route, passing the student id in place of `:studentId` with the body of the message with the following format:

```bash
{
  "name": "New student 1",
  "classId": "1"
}
```
if it is in the correct format the api will answer a message with the following format

```bash
{
  "id": 1,
  "name": "New student 1",
  "classId": 1,
  "createdAt": "2023-01-22T23:08:43.954Z"
}
```

### **14. Delete a student**

To delete a student, you must make a `delete` method in the https://concept-a-api-2.onrender.com/students/:studentId route, passing the student id in place of `:studentId`. The api will answer a message with the following format:

```bash
{
  "id": 1
}
```

### **15. List the students of a class**

To list students assigned to a class, as in item 9, you must make a `get` method in the https://concept-a-api-2.onrender.com/students/classes/:classId route, passing the class id in place of `:classId`. The API will respond with a message in the following format:

```bash
{
  "id": 1,
  "className": "Class 1",
  "students": [
    {
      "studentId": 1,
      "studentName": "Student 1"
    },
    {
      "studentId": 2,
      "studentName": "Student 2"
    },
    ...,
  ],
  "createdAt": "2023-01-29T20:58:53.796Z"
}
```

### **16. Create new project**
To create a new project, you must do a `post` method in the route https://concept-a-api-2.onrender.com/projects with the body of the message with the following format:

```bash
{
  "name": "Project 1",
}
```

if it is in the correct format the api will answer a message with the following format

```bash
{
  "id": 1,
  "name": "Project 1",
  "createdAt": "2023-01-22T23:08:43.954Z"
}
```

### **17. List all projects**

To view all Projects, you must do a `get` method in the https://concept-a-api-2.onrender.com/projects route. The API will respond with a message in the following format:

```bash
[
  {
    "id": 1,
    "name": "Project 1",
    "createdAt": "2023-01-22T23:08:43.954Z"
  },
  {
    "id": 2,
    "name": "Project 2",
    "createdAt": "2023-01-22T23:10:49.299Z"
  },
  ...,
]
```
### **18. List a project**

To view a project, you must do a `get` method at the  https://concept-a-api-2.onrender.com/projects/:projectId route, passing the project id in place of `:projectId`. The API will respond with a message in the following format:

```bash
{
  "id": 1,
  "name": "Project 1",
  "createdAt": "2023-01-22T23:08:43.954Z"
}
```
### **19. Edit a project**

To edit a project, you must make a `patch` method in the https://concept-a-api-2.onrender.com/projects/:projectId route, passing the project id in place of `:projectId` with the body of the message with the following format:

```bash
{
  "name": "New project 1"
}
```
if it is in the correct format the api will answer a message with the following format

```bash
{
  "id": 1,
  "name": "New project 1",
  "createdAt": "2023-01-22T23:08:43.954Z"
}
```

### **20. Delete a project**

To delete a project, you must make a `delete` method in the https://concept-a-api-2.onrender.com/projects/:projectId route, passing the project id in place of `:projectId`. The api will answer a message with the following format:

```bash
{
  "id": 1
}
```