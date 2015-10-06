
/*
This is a Java Script library to handle Json object effectivley this is the library which main focus on assisting
the devlopers to parse and view Json object effectivley */

/*function to create a json data in table format accepts a object as a parameter to pass through it
 user use an appropriate css style for displaying the data effectively
 */


//global variables to assign the global information to be prefixed
var tabledata = "<table>";
var trowcount = 1;
var tablekey = "<table>";

function jsontable(jsonobject) {
    // converting the json object data into string for traversing it using string operations.
    var stringdata = JSON.stringify(jsonobject,undefined,1);
    // using length function to find the length of the string
    var stringdatalen = stringdata.length;
    /* using start and end variables as 2 and 3 since the the json object data start with "{" and "/n" which is unnecessary
     to traverse. Used substring to fetch a character and regex the character and process accordingly*/
    var end = 3;
    for (var start=2 ; start<stringdatalen ; start++,end++) {
        var substringchar = stringdata.substring(start, end);
        //to add a new row if new line is found
        if (/[\n\r]/.test(substringchar)){
            addtablerow();
        }
        //evaluate if a character is found
        else if (/\d|\w|"|\{|\}|\[|\]/.test(substringchar)) {
            //use temp start and end to find a data by incrementing temp variables till we find a space
            tempstart = start + 1;
            tempend = end + 1;
            var data = substringchar;
            // check for word until space or new line character is found
            while (!(/[\n\r]|\s/.test(stringdata.substring(tempstart,tempend)))
                && tempstart < stringdatalen) {
                data += stringdata.substring(tempstart,tempend);
                tempstart++;
                tempend++;
            }

            if (data) {
                addtabledata(data);
                //change the start and end value to skip the captured data by setting the temp variable to it
                start = tempstart - 1;
                end = tempend - 1;
            }
        }
        // if a space is found create an empty data
        else if (/\s/.test(substringchar)) {
            addtabledata();
        }
    }
    tabledata = tabledata + "</table>";
    tablekey = tablekey + "</table>";
}

//function to retrive key from the object
function getkeys(obj){
    var keys = [];
    for(var key in obj){keys.push(key)};
    return keys;
}

// keyvalue object is a global object that is used to display all key value variables of a given variable
var keyvalue = {} ;
// function take all key values from the given object pass object as a parameter
function allvalues(obj) {
    // using reduce method to traverse through all the keys of an object and making it as an self calling function
    return getkeys(obj).reduce(function(objlist, objkey){
        var val = obj[objkey];
        // if the value of key is object self iterate the object using push method
        if(typeof val === 'object') { objlist.push.apply(objlist, allvalues(val)); }
        // else push the value to the all value array
        else { objlist.push(objkey + '=' + val);
            keyvalue[objkey] = val;
        }
        return objlist;
    }, []);
}

// function to display the value for the given key which takes two parameters jsonobj and jsonkey

function displayvalue (jsonobj,jsonkey) {
    // check if the key matches with the main keys else search look for all key values inside the object
    for (var key in jsonobj) {
        if (key == jsonkey) {
            return jsonobj[key];
        }
    }
    var allvalue = allvalues(jsonobj);
    // make sure the key value object is not null
    if (keyvalue) {
        for (var key in keyvalue) {
            if (key == jsonkey) {
                return keyvalue[key];
            }
        }
    }
    return "no value found";
}


//function to add table data
function addtabledata(value) {
    //add tabledata if value is found
    if (value) {
        //highlight the keys of the json object
        if (/:$/.test(value)) {
            tabledata = tabledata + "<td style='color:blue;text-align:center'>" + value + "</td>";
            tablekey = tablekey + "<td style='color:red;text-align:center'>" + value + "</td>";
        }
        // just add a value if the tabledata is not a key
        else {
            tabledata = tabledata + "<td>" + value + "</td>";
        }
    }
    // added a requested data parameter to avoid unnessary running of codes while only keys are requested
    else {
        tabledata = tabledata + "<td></td>";
        tablekey = tablekey + "<td></td>";
    }

}
//function to add table row
function addtablerow() {
    //using global variable to trowcount to create the tabletow for the first time
    if (trowcount == 1) {
        tabledata = tabledata + "<tr></tr><tr>";
        tablekey = tablekey + "<tr></tr><tr>";
        trowcount++;
    }
    else {
        tabledata = tabledata + "</tr><tr>";
        tablekey = tablekey + "</tr><tr>";
    }
}
/* main method to route other funtion based on the request
 two parameters:
 Required:
 1)Object - to be displayed
 2)Actiontype -
 a) data - displays all data inside object
 b) key - displays all the keys inside object
 c) value - Requires the addition parameter jsonkey
 this returns the value of the given key
 */
function jsondisplay(jsonobject, actiontype, jsonkey) {
    // validate the parameters that has been passed
    if (!jsonobject
        && typeof jsonobject != 'object') {

        return "Error !!! Send the first parameter as a JSON object that is to be parsed"
    }
    else if (actiontype != 'data'
        && actiontype != 'keys'
        && actiontype != 'value') {

        return "Error !!! The second parameter action type can only contain the values data,key,and value";
    }

    if (actiontype == 'data') {
        jsontable(jsonobject);
        return tabledata;
        //re-initialize the global variables
        tabledata = "<table>";
        trowcount = 1;
        tablekey = "<table>";
    }

    if (actiontype == 'keys') {
        jsontable(jsonobject);
        return tablekey;
        //re-initialize the global variables
        tabledata = "<table>";
        trowcount = 1;
        tablekey = "<table>";
    }
    if (actiontype == 'value') {
        if (!jsonkey) {
            return "Error !!! for value action type. key must be passed as an parameter";
        }
        var value = displayvalue(jsonobject, jsonkey);
        return value;
    }
}

/* function to add and edit json object
has three parameter
1)Operation
    a) Add - to add a new object
    b) Append - to add to an existing object
2)Jsonobject - to add or append json data from this particular object
3) value - to be added or appended in the json obj and the value must be an object (key value pairs)
 */


function jsonobj(operation,jsonobj,value) {
    // validate the parameters that are passed
    if (operation != ""
        && operation != "add"
        && operation != "append") {

        return "the first operand should specify the operation add or append as parameters";
    }

    if (!jsonobj) {
        return "Json object name is needs as second parameter";
    }

    if (!value
        || !typeof value == 'object') {
        return "specify the value as the third parameter and value should be in key value pairs (objects)" ;
    }
    // if add is a operation create a new object and return it
    if (operation == "add") {
        if (typeof jsonobj == 'object') {
            return "for add operation only pass the new object name as a parameter";
        }
        var jsonobj = value;
        return jsonobj;
    }
    // else add the data to an existing object
    else if (operation == "append") {
        if (!typeof jsonobj == 'object') {
            return "for update operation an json object should be passed as parameter";
        }
        // merge the value properties to the json obj
        for (var key in value) {
            jsonobj[key] = value[key];
        }
        return jsonobj;
    }
}
