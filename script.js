let list = JSON.parse(localStorage.getItem("list")) || [];
let thing = null;
let money = null;
let date = null;
let total = null;
let inputWhereValue = null;
let inputHowMuchValue = null;
let inputDateValue = null;
let editFlag = -1;
let editFlagInputWhere = -1;
let editFlagInputDate = -1;
let editFlagInputHowMuch = -1;
let flagAllItemsChange = true;

window.onload = function() {

  let inputWhere = document.getElementById("inputWhere");
  inputWhere.addEventListener("change", inputWhereAndDateGet);
  
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

inputWhereAndDateGet = (e) =>{

  inputWhereValue = e.target.value;

  let temp = new Date().toLocaleDateString();
  temp2 = temp.split(".");
  temp2 =temp2[2]+"-"+ temp2[1]+"-"+temp2[0];
  inputDateValue = temp2;
}

inputHowMuchGet = (e) =>{
  inputHowMuchValue = e.target.value;
}

addElementToList = () =>{
 
  if (inputWhereValue && inputHowMuchValue && editFlag < 0) {
    list.push({
      thing: inputWhereValue,
      money: inputHowMuchValue,
      date: inputDateValue
    });

    localStorage.setItem("list", JSON.stringify(list));  
    inputWhereValue = "";
    inputHowMuchValue = "";
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

    //////////////////////  itemWhere /////////////////////////
    if((editFlag === index) || (editFlagInputWhere === index)){
      //PEДАКТИРУЮ экземпляр itemWhere
     let itemWhereEdit = document.createElement("textarea");
     itemWhereEdit.id = `itemWhereEdit_${index}`;
     itemWhereEdit.className = "itemWhereEdit";
     itemWhereEdit.value = list[index].thing;
     inputWhereValue = list[index].thing;
     itemWhereEdit.setAttribute("rows", "3");
     listItem.appendChild(itemWhereEdit);
     itemWhereEdit.focus();
     itemWhereEdit.addEventListener("change", function() {inputWhereValue = itemWhereEdit.value});  
     if(flagAllItemsChange){
        itemWhereEdit.addEventListener("blur", function() { list[index].thing = itemWhereEdit.value;  
                                                            localStorage.setItem("list", JSON.stringify(list));
                                                            editFlagInputWhere = -1;
                                                            render();
                                                          });
      }

    } else { //НE редактирую экземпляр itemWhere
      let itemWhere = document.createElement("p");
      itemWhere.id = `itemWhere_${index}`;
      itemWhere.className = "itemWhere";
      itemWhere.innerHTML = `${index+1}) ` + list[index].thing;
      listItem.appendChild(itemWhere);
      itemWhere.addEventListener("dblclick", function () {dbClickItemWhere(index)});
    }

    //////////////////////// itemDate /////////////////////////
    if((editFlag === index) || (editFlagInputDate === index)){
      //Если РЕДАКТИРУЮ itemDate
      let itemDateEdit = document.createElement("input");
      itemDateEdit.id = `itemDateEdit_${index}`;
      itemDateEdit.className = "itemDateEdit";
      itemDateEdit.type = "date";
      itemDateEdit.value = list[index].date; 
      listItem.appendChild(itemDateEdit);
      itemDateEdit.focus();
      itemDateEdit.addEventListener("change", function() {list[index].date = itemDateEdit.value});
      if(flagAllItemsChange){
        itemDateEdit.addEventListener("blur", function() {list[index].date = itemDateEdit.value;
                                                            localStorage.setItem("list", JSON.stringify(list));
                                                            editFlagInputDate = -1;
                                                            render();
                                                          });
      } 

    }else{//Если НЕ редактирую itemDate      
      let itemDate = document.createElement("p");
      itemDate.id = `itemDate_${index}`;
      itemDate.className = "itemDate";       
      itemDate.innerHTML = list[index].date;
      listItem.appendChild(itemDate);
      itemDate.addEventListener("dblclick", function () {dbClickItemDate(index)});
      itemDate.addEventListener("doubletap", function () {dbClickItemDate(index)});
    }

    /////////////////////////// itemHowMuch //////////////////
    if ((editFlag === index) || (editFlagInputHowMuch === index)) {
      //Eсли РЕДАКТИРУЮ itemHowMuch
      let itemHowMuchEdit = document.createElement("input");
      itemHowMuchEdit.id = `itemHowMuchEdit_${index}`;
      itemHowMuchEdit.type = "number";
      itemHowMuchEdit.className = "itemHowMuchEdit";
      itemHowMuchEdit.value = list[index].money;
      inputHowMuchValue = list[index].money;
      listItem.appendChild(itemHowMuchEdit);
      itemHowMuchEdit.focus();
      itemHowMuchEdit.addEventListener("change", function() {inputHowMuchValue = itemHowMuchEdit.value});
      if(flagAllItemsChange){
      itemHowMuchEdit.addEventListener("blur", function() {list[index].money = itemHowMuchEdit.value; 
                                                              localStorage.setItem("list", JSON.stringify(list)); 
                                                              editFlagInputHowMuch = -1;
                                                              render();
                                                            });
      }
    }
    else{ //Если НЕ редактирую itemHowMuch
      let itemHowMuch = document.createElement("p");
      itemHowMuch.id = `itemHowMuch_${index}`;
      itemHowMuch.className = "itemHowMuch";
      itemHowMuch.innerHTML = list[index].money;
      listItem.appendChild(itemHowMuch);
      itemHowMuch.addEventListener("dblclick", function () {dbClickItemHowMuch(index)});
      itemHowMuch.addEventListener("doubletap", function () {dbClickItemHowMuch(index)});
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
  
  flagAllItemsChange = !flagAllItemsChange;
  editFlag = index;
  render();
}

ImageDone = (item) => {

  flagAllItemsChange = !flagAllItemsChange;
  item.thing = inputWhereValue;
  item.money = inputHowMuchValue;  
  localStorage.setItem("list", JSON.stringify(list));
 
  editFlag = -1;
  editFlagInputWhere = -1;
  editFlagInputHowMuch = -1;
  editFlagInputDate = -1;

  inputWhereValue = "";
  inputHowMuchValue = "";
  inputWhere.value = "";
  inputHowMuch.value = "";

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