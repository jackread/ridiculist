RIDICULIST
===========

Probably the most ridiculous list you've ever seen.

INSTALLATION

install node dependancies
    ```npm install```
    
start the server
    ```npm start```
    

USAGE

currently, you manage tasks using the console in your browser.

adding a task
```
todoAPI.addItem({
  "title" : "short description",
  "para"  : "this is a much longer description for this task",
  "assigned" : "@joel + @jack"
});
```

remove a task
```
todoAPI.removeDoneItem(item_id);
todoAPI.removeDoingItem(item_id);
```
