const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);
let globalStore = [];  // Array of objects

 const generateNewCard = (task) =>   `
    <div class="col-sm-12 col-md-6 col-lg-4" >
       <div class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
    <button type="button" class="btn btn-outline-danger" id=${task.id} 
    onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${task.id}    onclick="deleteCard.apply(this,arguments)"></i></button>
      </div>
      <div class="card-body">
      <img src="${task.imageUrl}" class="card-img-top" alt="...">
        <h5 class="card-title mt-3 fw-bolder text-primary">${task.taskTitle}</h5>
        <p class="card-text">${task.taskDescription}.</p>
        <a href="#" class="btn btn-primary">${task.taskType}</a>
      </div>
    </div>
       </div>
    `
 ;

const loadInitialCardData = () => {
  //local storage to get tasky card data
 const getCardData = localStorage.getItem("tasky");


  //convert to normal object
 const {cards} = JSON.parse(getCardData);


  //loop over those array of task object and create HTML card , inject it to DOM
cards.map((cardObject)=> {taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

    //update our localStore
    globalStore.push(cardObject);
  }
  )

  
};



const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id != targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if(tagname === "BUTTON"){
      taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
      taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode)
  }
};



const saveChanges = () => {
    const task = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value
    };

    

taskContainer.insertAdjacentHTML("beforeend", generateNewCard(task));

globalStore.push(task);
localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

};

















//Page refreshes causes the data to get deleted
//API
//local storage->Accessing applications via local storage
//Interface -> Interface means middle man
