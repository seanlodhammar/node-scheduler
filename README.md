<h1 align='center'>
    <strong>Node Scheduler</strong>
    <p dir='auto' align='center'></p>
</h1>

<h3 align='center'>A backend scheduler that allows you to structure calendars, schedules, roll calls and more</h3>

<br></br>

## What is it?
It is a package containing multiple classes, allowing you to create different types of schedules involving dates and any specific data that you would like to add.

It allows for you to have a consistent data structure for each scheduler object and gives you to methods that give you the ability to check certain Date and Time specific things which the built in JavaScript Date API doesn't allow for.

## How to use
#### ⚠️ **Warning**: These classes are unfinished as of now and should **not** be used in production 
There are multiple classes such as: <br>
- <a href='https://github.com/seanlodhammar/node-scheduler/blob/36dd9bdac5d19339cf14df30482163ed0c6ff71a/src/calendar.ts'>`Calendar`</a> 
- <a href=''>`Roll`</a>
- <a href=''>`Schedule`</a> 
- and more that are coming soon

When creating a new instance, use the `new` operator and set a date-format such as '`us`' or '`eu`'. You can then start modifying the special `object` that is made after the class has been initalized through methods specific to each class.

Every class has a `retrieve()` method, returning the object for that specific class, which you can then store.

We recommend modifying objects relative to the class they were made in, by creating a new instance of that class and registering them with the `register(existingObj)` method or by simply passing them in as a second parameter when initializing.

#### ⚠️ **Warning**: Don't modify objects without using a class as it may cause an inconsitent data structure

## Contact Me
- Email - <a href='mailto:contact@seanlodhammar.com'>contact@seanlodhammar.com</a>
- Twitter - <a href='https:twitter/seanlodhammar'>seanlodhammar</a>
- Discord - <a href='https://discord.com/users/797595451972386836'>seanlod</a>