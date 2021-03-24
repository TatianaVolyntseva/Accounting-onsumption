let list = JSON.parse(localStorage.getItem("list"))|| [];
let thing;
let money;
let isCheck;
let total;

let editFlag;

let inputWhereValue = "";
let inputHowMuchValue = "";


window.onload = function() {

  let inputWhere = document.getElementById("inputWhere");
  inputWhere.addEventListener("change", inputWhereGet);
 
  let inputHowMuch = document.getElementById("inputHowMuch");
  inputHowMuch.addEventListener("change", inputHowMuchGet);
  
  let inputButton = document.getElementById("inputButton");
  inputButton.addEventListener("click", addElementToList);

  containertotalSum = document.getElementById("containertotalSum");
  forDeleteTotal = document.getElementById("forDeleteTotal");

  //создаю контейнер для всех OutPut'ов
  wrapper = document.getElementById("wrapper");
  containerForOutnput = document.createElement("div");
  containerForOutnput.className = "containerForOutnput";
  wrapper.appendChild(containerForOutnput);

  //создаю нумерованный список 
  allItemsHere = document.createElement("ol");
  allItemsHere.className = "allItemsHere";
  containerForOutnput.appendChild(allItemsHere);

  render()
}


inputWhereGet = (e)=>{
  inputWhereValue = e.target.value;
}

inputHowMuchGet = (e)=>{
  inputHowMuchValue = e.target.value;
}

addElementToList = ()=>{
 
  if (inputWhereValue && inputHowMuchValue) {
    list.push({
      thing: inputWhereValue,
      money: inputHowMuchValue,
      isCheck: false,
    })
    localStorage.setItem("list", JSON.stringify(list));  
    console.log(list)
    inputWhereValue = "";
    inputHowMuchValue = "";
    inputWhere.value = "";
    inputHowMuch.value = "";
  }
  else if (inputWhereValue == "" && inputHowMuchValue){
    alert("Пожалуйста, заполните первое поле");
  }else if (inputWhereValue  && inputHowMuchValue == ""){
    alert("Пожалуйста, заполните второе поле");
  }

  render()
}

render = () => {
 
  while (allItemsHere.firstChild) {
    allItemsHere.firstChild.remove();
  }

  total = 0;
  list.map((item,index) => {
    
    //создаю экземпляр списка li
    let listItem = document.createElement("li");
    listItem.id = `listItem_${index}`;
    listItem.className = "listItem"
    allItemsHere.appendChild(listItem);

    //создаю обертку для картинок //по ходу костыль...надо придумать другой путь
    let itemChange = document.createElement("div");
    itemChange.className = "itemChange";

    if(editFlag === index){//если РЕдактирую экземпляр

      //в обертку добавляю <input> для вывода Kуда потрачено
      let itemWhereEdit = document.createElement("input");
      itemWhereEdit.id = `itemWhereEdit_${index}`
      itemWhereEdit.className = "itemWhereEdit";
      itemWhereEdit.value = list[index].thing;
      inputWhereValue = list[index].thing;
      listItem.appendChild(itemWhereEdit)
      itemWhereEdit.addEventListener("change", function() {inputWhereValue = itemWhereEdit.value})

      //в обертку добавляю <input> для вывода Сколько потрачено
      let itemHowMuchEdit = document.createElement("input");
      itemHowMuchEdit.id = `itemHowMuchEdit_${index}`;
      itemHowMuchEdit.type = "number";
      itemHowMuchEdit.className = "itemHowMuchEdit";
      itemHowMuchEdit.value = list[index].money;
      inputHowMuchValue = list[index].money;
      listItem.appendChild(itemHowMuchEdit);
      itemHowMuchEdit.addEventListener("change", function() {inputHowMuchValue = itemHowMuchEdit.value})

      //в обертку добавляю <img> сделано
      imgDone = document.createElement("img"); 
      imgDone.src = "img/done.svg";
      imgDone.className = "imageDone";
      imgDone.addEventListener("click", function () {ImageDone(item, index)} );
      itemChange.appendChild(imgDone);

    }else{ //если НЕ редактирую экземпляр:
      //в обертку добавляю <p> для вывода Kуда потрачено
      let itemWhere = document.createElement("p");
      itemWhere.id = `itemWhere_${index}`
      itemWhere.className = "itemWhere";
      itemWhere.innerHTML = `${index+1}) ` + list[index].thing;
      listItem.appendChild(itemWhere)

      //в обертку добавляю <p> для вывода Сколько потрачено
      let itemHowMuch = document.createElement("p");
      itemHowMuch.id = `itemHowMuch_${index}`;
      itemHowMuch.className = "itemHowMuch";
      itemHowMuch.innerHTML = list[index].money;
      listItem.appendChild(itemHowMuch);

      //кладу в обертку картинку для Edit
      let imageEdit = document.createElement("img");
      imageEdit.src = "img/edit.svg";
      imageEdit.className = "imageEdit";
      itemChange.appendChild(imageEdit);
      imageEdit.addEventListener("click", function () { ImageEdit(index)});

    }

    //кладу обертку для картинок в конец каждого ли
    listItem.appendChild(itemChange);

    //кладу в обертку картинку для Delet
    let imageDelete = document.createElement("img");
    imageDelete.src = "img/delete.svg";
    imageDelete.className = "imageDelete";
    itemChange.appendChild(imageDelete);
    imageDelete.addEventListener("click", function () { ImageDelete(index)});

    //расчитыаю всю потраченную сумму
    total = total + Number(item.money);
  }) 

  //кладу всю потраченную сумму в  <p>
  while (forDeleteTotal.firstChild) {
    forDeleteTotal.firstChild.remove();
  }
  totalSum = document.createElement("p");
  totalSum.id = "totalSum";
  totalSum.innerHTML = "";
  totalSum.innerHTML = Number(total);
  forDeleteTotal.appendChild(totalSum)
} 

ImageEdit = (index) => {

  editFlag = index;

  render();
}

ImageDone = (item) => {

  item.thing = inputWhereValue;
 
  item.money = inputHowMuchValue;
  
  localStorage.setItem("list", JSON.stringify(list));

  editFlag = "";

  render();
}

ImageDelete = (index) => {

  list.splice(index,1);
  localStorage.setItem("list", JSON.stringify(list));
  console.log(list);

  render();
}

// let AllTasks = JSON.parse(localStorage.getItem("AllTasks"))|| [];
// let InputValue = "";
// let isCheck;
// let input;
// let text;
// let flagEdit;

// window.onload = async function() {

//   input = document.getElementById("into");
//   input.addEventListener("change", inputChange);
//   input.addEventListener("keydown", keyDownSave);

//   let button = document.getElementsByTagName('button')[0]
//   button.addEventListener("click", onClickButton)

//   divMain = document.getElementById('main');

//   // divMini = document.createElement("div");
//   // divMini.className = "divMini";
//   // divMain.appendChild(divMini);
  
//   if(AllTasks !== []){
//     removeAll = document.createElement("button");
//     removeAll.innerHTML = "Delete all Tasks";
//     divMain.appendChild(removeAll);
//     removeAll.addEventListener("click", onClickDeleteAll);
//   }
  
//   let resp = await fetch("http://localhost:8000/allTasks", {metod: "GET"});
//   let result = await resp.json();
//   AllTasks = result.data;
//   console.log("загрузка с сервера", result.data);
  
//   render()
  
// };

// inputChange = async (e) => {
//   InputValue = e.target.value;
// }

// keyDownSave = (e) => {
//   if(e.keyCode === 13) {
//     InputValue = e.target.value;
//     onClickButton();
//   }
// }

// //добавление нового задания связала с сервером и Базой Данных:
// onClickButton = async () => {
//   if (Boolean(InputValue)) {
//     AllTasks.push({
//       text: InputValue,
//       isCheck: false,
//     });
    
//     const resp = await fetch("http://localhost:8000/createTask", {
//       method: "POST",
//       headers: {
//         "Content-type":"application/json;charset=utf-8",
//         'Access-Control-Allow-Origin': "*"
//       },
//       body: JSON.stringify({
//         text: InputValue,
//         isCheck: false,
//       })
      
//     });
   
//     let result = await resp.json();
//     console.log("загрузка на сервер", result.data);
//     AllTasks = result.data;
    
    
   

//     localStorage.setItem("AllTasks", JSON.stringify(AllTasks));  
//     InputValue = "";
//     input.value = "";
     
//     render();
//   }
  
// }

// render = () => {
//   let divMini = document.getElementById('divMini');
//   while (divMini.firstChild){
//     divMini.firstChild.remove();
//   }

//   AllTasks.map((item, index) => {
        
//     let divForOut = document.createElement("div");
//     divForOut.className = "divforOut";
//     divForOut.id = `task_${index}`;


//     if(flagEdit !== index){// убираем чекбокс, если редактируем инпут
//       checkBox = document.createElement("input");
//       checkBox.type = "checkbox";
//       divForOut.appendChild(checkBox);
//       checkBox.checked = item.isCheck? true : false;
//       checkBox.addEventListener("click", function () {onClickCheckBox(index)} )
//     }
   
    
//     if (flagEdit !== index){// создаем <p>, если не редактируем
//       text = document.createElement("p");
//       text.innerHTML = item.text;
//       text.className = item.isCheck? "textDone" : "text";
//       divForOut.appendChild(text);
//     } else{//создаем <input> куда вложим новое значение 
//       //вешаем на инпут функцию что делать, когда отредактировали
//       taskEdit = document.createElement("input");
//       taskEdit.value = item.text;
//       taskEdit.addEventListener("change", function () {doneTaskEdit(item, index)});
//       divForOut.appendChild(taskEdit);

//       imgDone = document.createElement("img"); //картинка для окончания редактирования
//       imgDone.src = "img/done.svg";
//       imgDone.className = "imageEdit";
//       imgDone.addEventListener("click", function () {doneTaskEdit(item, index)});
//       divForOut.appendChild(imgDone);
//     }
//     //картинка для редактирования
//     if(flagEdit !== index){
//       let imageEdit = document.createElement("img");
//       imageEdit.src = "img/edit.svg";
//       imageEdit.className = "imageEdit";
//       imageEdit.hidden = item.isCheck? true : false;
//       imageEdit.addEventListener("click", function () { onClickImageEdit(index)});
//       divForOut.appendChild(imageEdit);
//     }
    
//     //картинка для удаления
//     let imageDelete = document.createElement("img");
//     imageDelete.src = "img/delete.svg";
//     imageDelete.className = "imageEdit";
//     imageDelete.addEventListener("click", function () { onClickImageDelete(index)});
//     divForOut.appendChild(imageDelete);
    
//     divMini.appendChild(divForOut);
//   })
// }

// onClickImageEdit = (index) => {

//   flagEdit = index;
//   localStorage.setItem("AllTasks", JSON.stringify(AllTasks));
//   render();
// }

// //изменение Задания связала с сервером
// doneTaskEdit = async (item, index) => {

//   if(taskEdit.value){

//     InputValue = taskEdit.value;
//     AllTasks[index].text = InputValue;

//     let resp = await fetch(`http://localhost:8000/updateTask`, {
//       method: "PATCH", 
//       headers: {
//         "Content-type":"application/json;charset=utf-8",
//         'Access-Control-Allow-Origin': "*"
//       },
//       body: JSON.stringify({
//         _id: AllTasks[index]._id,
//         text: taskEdit.value,
//       })
//     });

//     let result = await resp.json();
//     AllTasks = result.data;
//     console.log("загрузка с сервера после изменения Задания", result.data);

//     InputValue = "";
//     flagEdit = !flagEdit;
//     localStorage.setItem("AllTasks", JSON.stringify(AllTasks));
//     render();
    
//   }else{
//     AllTasks[index].text = item.text;
//     InputValue = "";
//     flagEdit = !flagEdit;
//     localStorage.setItem("AllTasks", JSON.stringify(AllTasks));
//     render();
//   }
  
// }

// //изменение Чексбокса связала с сервером и БД
// onClickCheckBox = async (index) => {
//   let resp = await fetch(`http://localhost:8000/updateTask`, {
//     method: "PATCH", 
//     headers: {
//       "Content-type":"application/json;charset=utf-8",
//       'Access-Control-Allow-Origin': "*"
//     },
//     body: JSON.stringify({
//       _id: AllTasks[index]._id,
//       isCheck: !AllTasks[index].isCheck,
//     })
//   });
//   let result = await resp.json();
//   AllTasks = result.data;
//   localStorage.setItem("AllTasks", JSON.stringify(AllTasks));
//   console.log("загрузка с сервера после изменения Chekbox'a", AllTasks);
  
//   render();
// }

// //удаление 1 задания связала с сервером и Базой Данных:
// onClickImageDelete = async (index) => {
 
//   const resp = await fetch(`http://localhost:8000/deleteTask?_id=${AllTasks[index]._id}`, {
//       method: "DELETE",
//   });


//   let result = await resp.json();
//   console.log("после удаления на сервере",result.data);
  
//   AllTasks.splice(index,1);

//   localStorage.setItem("AllTasks", JSON.stringify(AllTasks));
//   // let t = document.getElementById(`task_${index}`)

//   // t.remove();
//   render();  
// }

// //удаление ВСЕХ заданий связала с сервером и Базой Данных:
// onClickDeleteAll = () =>{
 
//   AllTasks.map( async (item, index) => {

//     const resp = await fetch(`http://localhost:8000/deleteTask?_id=${item._id}`, {
//       method: "DELETE",
//       });
//       let result = await resp.json();
//       console.log(result.data)
//   });

//   AllTasks = [];
//   localStorage.removeItem("AllTasks");
//   render();
// };