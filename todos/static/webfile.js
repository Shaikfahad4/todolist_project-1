
let savebtn=document.getElementById("savebtn");
savebtn.addEventListener('click',function(){
    localStorage.setItem("tasklist",JSON.stringify(tasklist));
})
function retrivinglistoftask(){
    let storeditem=localStorage.getItem(("tasklist"));
    if (storeditem===''){
        return [];
    }
    else{
        return JSON.parse(storeditem);
    }
}
tasklist=retrivinglistoftask();
let activeid=document.getElementById("activeid");
let completedid=document.getElementById("completedid");
function completetask(){
let countOfCompletedData=tasklist.filter(task => task.ischecked).length;
completedid.textContent=countOfCompletedData+" Completed";
let countOfACtiveData=tasklist.filter(task => !task.ischecked).length;
activeid.textContent=countOfACtiveData+" Active";
}
completetask();

let addtaskbtn=document.getElementById("addtaskbtn");
let enteredtask=document.getElementById("enteredtask");
let nooftask=document.getElementById("nooftask");
nooftask.textContent=tasklist.length+" tasks";
addtaskbtn.addEventListener("click",function(event){
    event.preventDefault();
    if(enteredtask.value===""){
        alert("Please enter the task")
    }
    else{
    let useradddata={
        taskname:enteredtask.value,
        id:Date.now(),
        ischecked:false
    }
    tasklist.push(useradddata);
    createtaskbox(useradddata.taskname,useradddata.id,useradddata.ischecked);
    nooftask.textContent=tasklist.length+" tasks";
}
    completetask();

})





let taskboxcon=document.getElementById("taskboxcon");

function createtaskbox(name,id,ischecked){
let labelid="label"+id;

let taskboxlistcon=document.createElement("li");
taskboxlistcon.className='taskbox d-flex flex-row col-6';
taskboxcon.appendChild(taskboxlistcon);


let checkboxcon = document.createElement('div');
checkboxcon.className = 'checkboxcon';
taskboxlistcon.appendChild(checkboxcon);

let input = document.createElement('input');
input.type = 'checkbox';
input.id=labelid;
input.checked=ischecked;
let label = document.createElement('label');
label.className = 'labelstyle';
label.setAttribute('for',labelid);
label.textContent =name;
if(ischecked){
    label.classList.add("checked");

}
input.addEventListener("click",function(){
    let index=tasklist.findIndex(function(task){
        if(task.id===id){
            return true;
        }
        else{
            return false;
        }
    })
    tasklist[index].ischecked=input.checked;
    if(input.checked){
        label.classList.add("checked");
    }
    else{
        label.classList.remove("checked");
    }
    completetask();
    
})

checkboxcon.appendChild(input);
checkboxcon.appendChild(label);

let delete_btn = document.createElement('div');
delete_btn.className = 'delete_btn';
taskboxlistcon.appendChild(delete_btn)

let button = document.createElement('button');
button.className = 'btn btn-danger';
button.textContent = 'delete';

delete_btn.appendChild(button);
delete_btn.addEventListener('click',function(){
    taskboxcon.removeChild(taskboxlistcon);
    let index=tasklist.findIndex(function(task){
        if(task.id===id){
            return true;
        }
        else{
            return false;
        }
    })
    tasklist.splice(index,1);
    nooftask.textContent=tasklist.length+" tasks";
     completetask();
})

}
for (let i of tasklist){
    createtaskbox(i.taskname,i.id,i.ischecked)
}

