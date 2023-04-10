const  apiKey = "56220b-51ed88-98b0bd-b8308c-9887b3";
var oldURL = "https://cse204.work/todos";

window.onload = (event) => {listFunc()};

function updateFunc(object){
    console.log(object);
    const elements = document.getElementsByClassName("newClass");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    for(var key in object){
        createFunc(object[key].text, object[key].id, object[key].completed);
    }
}

function listFunc(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var object = JSON.parse(this.responseText);
            updateFunc(object);
        }
        else{
        }
    };
    request.open("GET", "https://cse204.work/todos", true);
    request.setRequestHeader("x-api-key", apiKey);
    request.send();
    request.onreadystatechange();
}

function removeFunc(id){
    return function(){
        console.log("removed " + id)
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                listFunc();
            } else if (this.readyState == 4) {
                console.log(this.responseText);
            }
        };
        var url = "https://cse204.work/todos/" + id;
        request.open("DELETE", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("x-api-key", apiKey);
        request.send();
        request.onreadystatechange();
        
    }
}

function addFunc(item){
    var request = new XMLHttpRequest();
    var data = {
        text: item
    }
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todo = JSON.parse(this.responseText);
            listFunc();
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    request.open("POST", oldURL, true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("x-api-key", apiKey);
    request.send(JSON.stringify(data));
}


function createFunc(text, id, completed){
    console.log("made " + id)
    const newDiv = document.createElement("div");
    newDiv.classList.add("newClass")
    const formDiv = document.createElement("div");
    formDiv.setAttribute("id", "form");
    const newForm = document.createElement("form");
    const newCheck = document.createElement("input");
    newCheck.setAttribute("type", "checkbox");
    newCheck.setAttribute("id", "check");
    newCheck.setAttribute("name", "check");
    newCheck.setAttribute("value", "check");
 
    const newLabel = document.createElement("label");
    const newContent = document.createTextNode(text);
    newCheck.addEventListener('change',function(){
        console.log("checked box")
        if(this.checked){
           checkFunc(id,true);
        }
        else{
            checkFunc(id,false);
        }
    });
    newCheck.checked=completed;
    if(completed){
        newLabel.style.textDecoration = "line-through";
    }
    else{
        newLabel.style.textDecoration = "none";
    }
    newLabel.appendChild(newContent);
    const closeDiv = document.createElement("div");
    closeDiv.classList.add("delete")
    closeDiv.setAttribute("id", id);
    closeDiv.addEventListener('click',removeFunc(id));
    const closeConst = document.createTextNode("X");
    closeDiv.appendChild(closeConst);
    
    newForm.appendChild(newCheck);
    newForm.appendChild(newLabel);
    formDiv.appendChild(newForm);
    newDiv.appendChild(formDiv);
    newDiv.appendChild(closeDiv);

    const parentDiv = document.getElementById("current");
    const currentDiv = document.getElementById("last-item");
    parentDiv.insertBefore(newDiv, currentDiv);
}

const form  = document.getElementById('add-todo');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    var todoText = form.elements['input-text'].value;
    form.elements['input-text'].value = "";
    addFunc(todoText);
});

function checkFunc(id,value){
    var data = {
        completed: value
    }
    console.log("removed " + id)
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                listFunc();
            } else if (this.readyState == 4) {
                console.log(this.responseText);
            }
        };
        var url = "https://cse204.work/todos/" + id;
        request.open("PUT", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader("x-api-key", apiKey);
        request.send(JSON.stringify(data));
        request.onreadystatechange();
}