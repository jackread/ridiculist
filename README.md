RIDICULIST
===========

Probably the most ridiculous list you've ever seen.

![RIDCULIST splash screen](https://cloud.githubusercontent.com/assets/5861451/6541815/834c6964-c4b2-11e4-9b06-cc968b2e09c6.png)

![RIDICULIST in action](https://cloud.githubusercontent.com/assets/5861451/6541814/833f9d60-c4b2-11e4-8aa2-50c7ce16100a.png)

**INSTALLATION**

**install node dependancies**

```npm install```
    
**start the server**

```npm start```
    

**USAGE**

currently, you manage tasks using the console in your browser.

**adding a task**
```
todoAPI.addItem({
  "title" : "short description",
  "para"  : "this is a much longer description for this task",
  "assigned" : "@joel + @jack"
});
```

**remove a task**
```
todoAPI.removeDoneItem(item_id);
todoAPI.removeDoingItem(item_id);
```
