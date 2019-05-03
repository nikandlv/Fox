### Fox state manager

#### Logic

keep everything simple, share functions and data you want from a component either `set` or `get` and keep track of their update on other components!

every item has a key that you can access directly from `fox` object or get it from the manager

`fox` object is the big object that contains everything we publish

`manager` is the functions that we use to interact with `fox`

#### Usage

import it

`import {fox,manager} from '@nikandlv/fox'`

use it!

you can publish what ever you want

`manager.publish(key,value)`

`manager.publish("test",()=> { console.log("test") })`

`manager.publish("test1","im just a string")`

and you can unPublish them when you have to (when the component is not mounted anymore)

`manager.unpublish(key)`

`manager.unpublish("test")`

`manager.unpublish("test2")`

then you can get them where you want like so

`manager.get(key,default_value)`

`manager.get("test",null)`

`manager.get("test2","test2 not found!")`

the second parameter is the default value if the key does not exist

or if you are sure you can access it directly at

`fox.key`

`fox.test`

`fox.test2`

the key can also be as you want. for example

`manager.publish("foo.bar","im just a string")`

will be

`fox.foo.bar`

#### Events

Listener when key is published 

`manager.onPublish(key,event_function)`

runs once and asap when the key is available

Listener when key is unpublished 

`manager.onUnpublish(key,event_function)`

runs once and asap when the key is available

Listener when key is updated 

`manager.onUpdate(key,event_function)`

runs every time and asap when the key is updated