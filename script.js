let list = JSON.parse(localStorage.getItem("list")) || [];
let thing;
let money;
let date;
let total;
let editFlag = -1;
let editFlagInputWhere = -1;
let editFlagInputDate = -1;
let editFlagInputHowMuch = -1;

let inputWhereValue;
let inputHowMuchValue;
let inputDateValue;


window.onload = function() {

  let inputWhere = document.getElementById("inputWhere");
  inputWhere.addEventListener("change", inputWhereGet);
  inputWhere.addEventListener("change", inputDateGet);
 
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

  //создаю нумерованный список ol
  allItemsHere = document.createElement("ol");
  allItemsHere.className = "allItemsHere";
  containerForOutnput.appendChild(allItemsHere);

  render();
}

inputWhereGet = (e)=>{
  inputWhereValue = e.target.value;
}

inputHowMuchGet = (e)=>{
  inputHowMuchValue = e.target.value;
}

inputDateGet = ()=>{
  inputDateValue = new Date().toLocaleDateString();
  console.log(inputDateValue);
}

addElementToList = ()=>{
 
  if (inputWhereValue && inputHowMuchValue && editFlag < 0) {

    list.push({
      thing: inputWhereValue,
      money: inputHowMuchValue,
      date: inputDateValue
    });

    localStorage.setItem("list", JSON.stringify(list));  
    inputWhereValue = "";
    inputHowMuchValue = "";
    inputDate = "";
    inputWhere.value = "";
    inputHowMuch.value = "";
  }
  else if (inputWhereValue == "" && inputHowMuchValue){
    alert("Пожалуйста, заполните первое поле");
  }else if (inputWhereValue  && inputHowMuchValue == ""){
    alert("Пожалуйста, заполните второе поле");
  }else if (inputWhereValue == "" && inputHowMuchValue == ""){
    alert("Пожалуйста, заполните оба поля");
  } 
  render();
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
    listItem.className = "listItem";
    allItemsHere.appendChild(listItem);

    //создаю обертку для картинок //
    let itemChange = document.createElement("div");
    itemChange.className = "itemChange";

    //////////////////////  itemWhere ///////////////////////////////////////////

    if((editFlag === index) || (editFlagInputWhere === index)){
      //PEДАКТИРУЮ экземпляр itemWhere
      //в обертку добавляю <input> для вывода Kуда потрачено
     let itemWhereEdit = document.createElement("input");
     itemWhereEdit.id = `itemWhereEdit_${index}`;
     itemWhereEdit.className = "itemWhereEdit";
     itemWhereEdit.value = list[index].thing;
     inputWhereValue = list[index].thing;
     listItem.appendChild(itemWhereEdit);
     itemWhereEdit.addEventListener("change", function() {inputWhereValue = itemWhereEdit.value});
     itemWhereEdit.addEventListener("blur", function() { list[index].thing = itemWhereEdit.value;  
                                                          localStorage.setItem("list", JSON.stringify(list));
                                                          editFlagInputWhere = -1;
                                                          render();
                                                        });
    } else { //НE редактирую экземпляр itemWhere
      //в обертку добавляю <p> для вывода Kуда потрачено
      let itemWhere = document.createElement("p");
      itemWhere.id = `itemWhere_${index}`;
      itemWhere.className = "itemWhere";
      itemWhere.innerHTML = `${index+1}) ` + list[index].thing;
      listItem.appendChild(itemWhere);
      itemWhere.addEventListener("dblclick", function () {dbClickItemWhere(index)});
      
    }

    //////////////////////// itemDate //////////////////////////////////////////

    if((editFlag === index) || (editFlagInputDate === index)){
      //РЕДАКТИРУЮ itemDate
      //в обертку добавляю <input> для вывода Даты 
      let itemDateEdit = document.createElement("input");
      itemDateEdit.id = `itemDateEdit_${index}`;
      itemDateEdit.className = "itemDateEdit";
      itemDateEdit.value = list[index].date;
      listItem.appendChild(itemDateEdit);
      itemDateEdit.addEventListener("change", function() {list[index].date = itemDateEdit.value});
      itemDateEdit.addEventListener("blur", function() { list[index].date = itemDateEdit.value;
                                                         localStorage.setItem("list", JSON.stringify(list));
                                                         editFlagInputDate = -1;
                                                         render();
                                                        });
    }else{
      // НЕ редактирую itemDate
      //в обертку добавляю <p> для вывода Даты 
      let itemDate = document.createElement("p");
      itemDate.id = `itemDate_${index}`;
      itemDate.className = "itemDate";
      itemDate.innerHTML = list[index].date;
      listItem.appendChild(itemDate);
      itemDate.addEventListener("dblclick", function () {dbClickItemDate(index)})
    }

    /////////////////////////// itemHowMuch //////////////////

    if ((editFlag === index) || (editFlagInputHowMuch === index)) {
      //РЕДАКТИРУЮ itemHowMuch
      //в обертку добавляю <input> для вывода Сколько потрачено
      let itemHowMuchEdit = document.createElement("input");
      itemHowMuchEdit.id = `itemHowMuchEdit_${index}`;
      itemHowMuchEdit.type = "number";
      itemHowMuchEdit.className = "itemHowMuchEdit";
      itemHowMuchEdit.value = list[index].money;
      inputHowMuchValue = list[index].money;
      listItem.appendChild(itemHowMuchEdit);
      itemHowMuchEdit.addEventListener("change", function() {inputHowMuchValue = itemHowMuchEdit.value});
      itemHowMuchEdit.addEventListener("blur", function() {list[index].money = itemHowMuchEdit.value; 
                                                          localStorage.setItem("list", JSON.stringify(list)); 
                                                          editFlagInputHowMuch = -1;
                                                          render();
                                                        });
    }
    else{ //НЕ редактирую itemHowMuch
      //в обертку добавляю <p> для вывода Сколько потрачено
      let itemHowMuch = document.createElement("p");
      itemHowMuch.id = `itemHowMuch_${index}`;
      itemHowMuch.className = "itemHowMuch";
      itemHowMuch.innerHTML = list[index].money;
      listItem.appendChild(itemHowMuch);
      itemHowMuch.addEventListener("dblclick", function () {dbClickItemHowMuch(index)});
    }

    //////////////// Картинки ///////////

    if (editFlag !== index){
      //кладу в обертку для картинок картинку Edit
      let imageEdit = document.createElement("img");
      imageEdit.src = "img/edit.svg";
      imageEdit.className = "imageEdit";
      itemChange.appendChild(imageEdit);
      imageEdit.addEventListener("click", function () {ImageEdit(index)});
    } else {
      //в обертку для картинок добавляю <img> Done
      imgDone = document.createElement("img"); 
      imgDone.src = "img/done.svg";
      imgDone.className = "imageDone";
      imgDone.addEventListener("click", function () {ImageDone(item, index)} );
      itemChange.appendChild(imgDone);
    }

    //кладу обертку для картинок в конец каждого ли
    listItem.appendChild(itemChange);

    //кладу в обертку для картинок картинку Delete
    let imageDelete = document.createElement("img");
    imageDelete.src = "img/delete.svg";
    imageDelete.className = "imageDelete";
    itemChange.appendChild(imageDelete);
    imageDelete.addEventListener("click", function () {ImageDelete(index)});

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
  totalSum.innerHTML = total;
  forDeleteTotal.appendChild(totalSum);
} 

ImageEdit = (index) => {

  editFlag = index;
  render();
}

ImageDone = (item) => {

  item.thing = inputWhereValue;
  item.money = inputHowMuchValue;  
  localStorage.setItem("list", JSON.stringify(list));
 
  editFlag = -1;
  editFlagInputWhere = -1;
  editFlagInputHowMuch = -1;
  editFlagInputDate = -1;

  render();  
}

ImageDelete = (index) => {

  list.splice(index,1);
  localStorage.setItem("list", JSON.stringify(list));

  render();
}

dbClickItemWhere = (index) => {

  editFlagInputWhere = index;
   
  render();
}

dbClickItemDate = (index) => {
  editFlagInputDate = index;
  render();
}

dbClickItemHowMuch = (index) => {

  editFlagInputHowMuch = index;
  render();
}