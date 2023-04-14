let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, callback, async = true, data = null) {
return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log("State Changed Called, Ready state: " +
                    xhr.readyState+ "Status:" +xhr.status);
    if(xhr.status.toString().match('^[2][0-9]{2}$')) {
        resolve(xhr.responseText);
    } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
        reject({
            status: xhr.status,
            statusText: xhr.statusText
        });
        console.log("XHR Failed");
    }
}
xhr.open(methodType, url, async);
if (data) {
    console.log(JSON.stringify(data));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
} else xhr.send();
console.log(methodType+ " request sent to the server ");
});
}

const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data at: " +showTime()+ " data: " +responseText)
    })
    .catch(error => console.log("GET Error Status: " +JSON.stringify(error)));

const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted at: " +showTime()+ " data: " +responseText)
    })
    .catch(error => console.log("DELETE Error Status: " +JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const empData = {"name": "Harry", "salary": "5000"};
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        console.log("User Added at: " +showTime()+ " data: "+responseText)
    })
    .catch(error => console.log("POST Error Status: " +JSON.stringify(error)));
