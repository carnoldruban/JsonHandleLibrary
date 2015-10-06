# JsonHandleLibrary
Description:
  This is a Java Script library that will assist JS developers to handle Complex Json objects effectively. This solely focus on Developers point of view  making thier job easy
  Main problem in handling Json objects is hierarchy of objects and accessing the keys. This library file can be used to handle these issues
  
Advantage:

a) Display the full structure of Json object in a organised manner so that it is easy to understand (highlighting keys)

b) Display all the root and sub keys of the Json object

c) Display the value of the given root key or any key inside the object (note: only the first occurance of the key name value will  be returned)

d) Create a new JSon object 

e) Appending a value to the existing json object 


<h2>Methods: </h2>

<b>1 ) Function jsondisplay(jsonobject, actiontype, jsonkey) </b>

 main method to route other funtion based on the request
 two parameters:
 
 Required:
 
 1)Object - to be displayed
 
 2)Actiontype -
  
  a) data - displays all data inside object
 
  b) key - displays all the keys inside object
 
  c) value - Requires the addition parameter jsonkey
      this returns the value of the given key


<b>2) Function jsonobj(operation,jsonobj,value)</b>

function to add and edit json object
has three parameter

Required

1)Operation

    a) Add - to add a new object

    b) Append - to add to an existing object

2)Jsonobject - to add or append json data from this particular object

3) value - to be added or appended in the json obj and the value must be an object (key value pairs)

