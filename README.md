# Node Scheduler
A backend scheduler that allows you to structure calendars, schedules, roll calls and more

## What is it?
`node-scheduler` is a package containing multiple classes, allowing you to create different types of object structures with dates and any specific data that you would like to add.

Each class allows you to have a consistent data structure for it's given object and has methods that give you the ability to make certain Date and Time specific queries which the built in JavaScript Date API doesn't allow for.

## How to use
#### ⚠️ **Warning**: These classes are unfinished as of now and should **not** be used in production 
There are multiple classes such as: <br>
- <a href='https://github.com/seanlodhammar/node-scheduler/blob/36dd9bdac5d19339cf14df30482163ed0c6ff71a/src/calendar.ts'>`Calendar`</a> 
- <a href=''>`Roll`</a>
- <a href=''>`Schedule`</a> 
- and more that are coming soon

When creating a new instance, use the `new` operator and set a date-format such as '`us`' or '`eu`' (soon to be changed to allow custom formats such as `'dd-mm-yyyy'`). You can then start modifying the special `object` that is made after the class has been initalized through methods specific to each class.

Every class has a `retrieve()` method, returning the object for that specific class, which you can then store.

We recommend modifying objects relative to the class they were made in, by creating a new instance of that class and registering them with the `register(existingObj)` method or by simply passing them in as a second parameter when initializing.

#### ⚠️ **Warning**: Don't modify objects without using a class as it may cause an inconsistent data structure

## Contact Me
- Email - <a href='mailto:contact@seanlodhammar.com'>contact@seanlodhammar.com</a>
- Twitter - <a href='https://twitter.com/seanlodhammar'>seanlodhammar</a>
- Discord - <a href='https://discord.com/users/797595451972386836'>seanlod</a>