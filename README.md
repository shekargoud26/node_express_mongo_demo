# node_express_mongo_demo
A sample REST-API using node, express and mongodb

## Setup

- Clone this repo
- Start the server locally by using the command
``` nodemon start ```

## Usage

### create task  

```
curl -XPOST -H "Content-type: application/json" -d '{
  "task":"Finish this!",
  "priority": 0

}' 'localhost:3000/add-task'
```

### update task  
```
curl -XPOST -H "Content-type: application/json" -d '{
            "__id": "taskId",
            "task": "Finish this whenever. meh.",
            "priority": 4,
            "completed": false
           
        }' 'localhost:3000/update-task'
```  
*replace taskId with the id of the task to be updated*  

### read tasks  
- get all tasks  
```
curl -XGET -H "Content-type: application/json" 'localhost:3000/tasks'  
```
- get specific task  
```
curl -v -XGET -H "Content-type: application/json" 'localhost:3000/task/taskId'
```  
*replace taskId with the id of the task to be updated*  
  
 ### delete task  
 ```  
 curl -v -XDELETE -H "Content-type: application/json" 'localhost:3000/delete-task/taskId'
 ```  
 *replace taskId with the id of the task to be updated*  
