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
  const inputWhere = document.getElementById("inputWhere");
  inputWhere.addEventListener("change", inputWhereAndDateGet);
  const inputHowMuch = document.getElementById("inputHowMuch");
  inputHowMuch.addEventListener("change", inputHowMuchGet);
  const inputButton = document.getElementById("inputButton");
  inputButton.addEventListener("click", addElementToList);
  containertotalSum = document.getElementById("containertotalSum");
  forDeleteTotal = document.getElementById("forDeleteTotal");
  render();
}

inputWhereAndDateGet = (e) => {
  inputWhereValue = e.target.value;
  let temp = new Date().toLocaleDateString();
  temp2 = temp.split(".");
  temp2 =temp2[2]+"-"+ temp2[1]+"-"+temp2[0];
  inputDateValue = temp2;
}

inputHowMuchGet = (e) => {
  inputHowMuchValue = e.target.value;
}

addElementToList = () => {
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

ImageDelete = (index, itemWhereEdit) => {
 if(flagAllItemsChange){
   list.splice(index,1);
  localStorage.setItem("list", JSON.stringify(list));
  render();
 } else {
   console.log("sd");
   flagAllItemsChange = !flagAllItemsChange;
   editFlag = -1;
   editFlagInputWhere = -1;
   editFlagInputHowMuch = -1;
   editFlagInputDate = -1;
  render();
 }
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

blurOnitemWhereEdit = (index, itemWhereEdit) => {
  if(flagAllItemsChange){
    list[index].thing = itemWhereEdit.value;  
    localStorage.setItem("list", JSON.stringify(list));
    editFlagInputWhere = -1;
    inputWhereValue = "";
    render();
  }
}

blurOnitemDateEdit = (index, itemDateEdit) => {
  if(flagAllItemsChange){
    list[index].date = itemDateEdit.value;
    localStorage.setItem("list", JSON.stringify(list));
    editFlagInputDate = -1;
    render();
  }
}

blurOnitemHowMuchEdit = (index, itemHowMuchEdit) => {
  if(flagAllItemsChange){
    list[index].money = itemHowMuchEdit.value; 
    localStorage.setItem("list", JSON.stringify(list)); 
    editFlagInputHowMuch = -1;
    inputHowMuchValue = "";
    render();
  }
}

render = () => {
  const allItemsHere = document.getElementById('allItemsHere');
  while (allItemsHere.firstChild) {
    allItemsHere.firstChild.remove();
  }
  total = 0;
  list.map((item,index) => { 
    let listItem = document.createElement("li"); //create li
    listItem.id = `listItem_${index}`;
    listItem.className = "listItem";  
    let itemChange = document.createElement("div");//create wrapper for picture
    itemChange.className = "itemChange";
    allItemsHere.appendChild(listItem);
    //////////////////////  itemWhere /////////////////////////
    if((editFlag === index) || (editFlagInputWhere === index)){
      let itemWhereEdit = document.createElement("textarea"); //EDIT itemWhere
      itemWhereEdit.id = `itemWhereEdit_${index}`;
      itemWhereEdit.className = "itemWhereEdit";
      itemWhereEdit.value = list[index].thing;
      inputWhereValue = list[index].thing;
      itemWhereEdit.setAttribute("rows", "3");
      listItem.appendChild(itemWhereEdit);
      itemWhereEdit.focus();
      itemWhereEdit.addEventListener("change", () => {inputWhereValue = itemWhereEdit.value});  
      itemWhereEdit.addEventListener("blur", () => blurOnitemWhereEdit(index, itemWhereEdit));
    } else { 
      let itemWhere = document.createElement("p");//DON'T edit itemWhere
      itemWhere.id = `itemWhere_${index}`;
      itemWhere.className = "itemWhere";
      itemWhere.innerHTML = `${index+1}) ` + list[index].thing;
      listItem.appendChild(itemWhere);
      itemWhere.addEventListener("dblclick", () => {dbClickItemWhere(index)});
    }
    //////////////////////// itemDate /////////////////////////
    if((editFlag === index) || (editFlagInputDate === index)){
      let itemDateEdit = document.createElement("input");// EDIT itemDate
      itemDateEdit.id = `itemDateEdit_${index}`;
      itemDateEdit.className = "itemDateEdit";
      itemDateEdit.type = "date";
      itemDateEdit.value = list[index].date; 
      listItem.appendChild(itemDateEdit);
      itemDateEdit.focus();
      itemDateEdit.addEventListener("change", () => {list[index].date = itemDateEdit.value});
      itemDateEdit.addEventListener("blur", () => blurOnitemDateEdit(index, itemDateEdit));
    } else {   
      let itemDate = document.createElement("p");//If DON't itemDate   
      itemDate.id = `itemDate_${index}`;
      itemDate.className = "itemDate";       
      itemDate.innerHTML = list[index].date;
      listItem.appendChild(itemDate);
      itemDate.addEventListener("dblclick", () => {dbClickItemDate(index)});
      itemDate.addEventListener("doubletap", () => {dbClickItemDate(index)});
    }
    /////////////////////////// itemHowMuch //////////////////
    if ((editFlag === index) || (editFlagInputHowMuch === index)) {
      let itemHowMuchEdit = document.createElement("input"); // EDIT itemHowMuch
      itemHowMuchEdit.id = `itemHowMuchEdit_${index}`;
      itemHowMuchEdit.type = "number";
      itemHowMuchEdit.className = "itemHowMuchEdit";
      itemHowMuchEdit.value = list[index].money;
      inputHowMuchValue = list[index].money;
      listItem.appendChild(itemHowMuchEdit);
      itemHowMuchEdit.focus();
      itemHowMuchEdit.addEventListener("change",() => {inputHowMuchValue = itemHowMuchEdit.value});
      itemHowMuchEdit.addEventListener("blur", () => blurOnitemHowMuchEdit(index, itemHowMuchEdit));
    } else {
      let itemHowMuch = document.createElement("p"); //if DON't  edit itemHowMuch
      itemHowMuch.id = `itemHowMuch_${index}`;
      itemHowMuch.className = "itemHowMuch";
      itemHowMuch.innerHTML = list[index].money;
      listItem.appendChild(itemHowMuch);
      itemHowMuch.addEventListener("dblclick", () => {dbClickItemHowMuch(index)});
      itemHowMuch.addEventListener("doubletap", () => {dbClickItemHowMuch(index)});
    }
    //////////////// Peactures ///////////
    if (editFlag !== index){
      let imageEdit = document.createElement("img");//кладу в обертку для картинок картинку Edit
      imageEdit.src = "img/edit.svg";
      imageEdit.className = "imageEdit";
      itemChange.appendChild(imageEdit);
      imageEdit.addEventListener("click", () => {ImageEdit(index)});
    } else {
      imgDone = document.createElement("img"); //в обертку для картинок добавляю <img> Done
      imgDone.src = "img/done.svg";
      imgDone.className = "imageDone";
      imgDone.addEventListener("click", () => {ImageDone(item, index)} );
      itemChange.appendChild(imgDone);
    }
    listItem.appendChild(itemChange);//кладу обертку для картинок в конец каждого ли
    let imageDelete = document.createElement("img");//кладу в обертку для картинок картинку Delete
    imageDelete.src = "img/delete.svg";
    imageDelete.className = "imageDelete";
    itemChange.appendChild(imageDelete);
    imageDelete.addEventListener("click", () => {ImageDelete(index)});

    total = total + Number(item.money); //расчитыаю всю потраченную сумму
  })  
  const ptotal = document.getElementById("total");//кладу всю потраченную сумму в  <p>
  ptotal.innerText = `${total}  p.`;
} 