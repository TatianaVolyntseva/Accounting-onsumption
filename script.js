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
let flagAllItemsChange = false;

window.onload = async () => {
  const inputWhere = document.getElementById("inputWhere");
  inputWhere.addEventListener("change", inputWhereAndDateGet);
  const inputHowMuch = document.getElementById("inputHowMuch");
  inputHowMuch.addEventListener("change", inputHowMuchGet);
  const inputButton = document.getElementById("inputButton");
  inputButton.addEventListener("click", addElementToList);
  containertotalSum = document.getElementById("containertotalSum");
  forDeleteTotal = document.getElementById("forDeleteTotal");
  const resp = await fetch("http://localhost:8000/allItems", {
    method: "GET"
  });
  let result = await resp.json();
  list = result.data;
  render();
}

inputWhereAndDateGet = (e) => {
  inputWhereValue = e.target.value;
  let temp = new Date().toLocaleDateString();
  temp2 = temp.split(".");
  temp2 = temp2[2]+"-"+ temp2[1]+"-"+temp2[0];
  inputDateValue = temp2;
}

inputHowMuchGet = (e) => {
  inputHowMuchValue = e.target.value;
}

cleanValues = () => {
  inputWhereValue = "";
  inputHowMuchValue = "";
  inputDateValue = "";
  inputWhere.value = "";
  inputHowMuch.value = "";
}

cleanFlags = () => {
  editFlag = -1;
  editFlagInputWhere = -1;
  editFlagInputHowMuch = -1;
  editFlagInputDate = -1;
}

addElementToList = async () => {
  if (inputWhereValue && inputHowMuchValue && editFlag < 0) {
    list.push({
      thing: inputWhereValue,
      money: inputHowMuchValue,
      date: inputDateValue
    });
    const resp = await fetch("http://localhost:8000/addItem", {
      method: "POST",
      headers: {
        "Content-type" : "application/json;charset=utf-8",
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({
        thing: inputWhereValue,
        money: inputHowMuchValue,
        date: inputDateValue
      })
    });
    let result = await resp.json();
    list = result.data;
    localStorage.setItem("list", JSON.stringify(list));  
    cleanValues();
  } else if (inputWhereValue === "" && inputHowMuchValue) {
    alert("Пожалуйста, заполните первое поле");
  } else if (inputWhereValue  && inputHowMuchValue === "") {
    alert("Пожалуйста, заполните второе поле");
  } else if (inputWhereValue === "" && inputHowMuchValue === "") {
    alert("Пожалуйста, заполните оба поля");
  } 
  render();
}

ImageEdit = (index) => {
  flagAllItemsChange = true;
  editFlag = index;
  render();
}

ImageDone = async (item) => {
  flagAllItemsChange = false;
  item.thing = inputWhereValue;
  item.money = inputHowMuchValue; 
  item.date = inputDateValue; 
  const resp = await fetch(`http://localhost:8000/changeItem?_id=${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type" : "application/json;charset=utf-8",
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({
        thing: inputWhereValue,
        money: inputHowMuchValue,
        date: inputDateValue
      })
    });
  localStorage.setItem("list", JSON.stringify(list));
  cleanFlags();
  cleanValues();
  render();  
}

ImageDelete = async (index) => {
  if (!flagAllItemsChange) {
    const resp = await fetch(`http://localhost:8000/deleteItem?_id=${list[index]._id} `, {
      method: "DELETE"
    });
    let result = await resp.json();
    list = result.data;
    localStorage.setItem("list", JSON.stringify(list));
    render();
  } else {
    flagAllItemsChange = false;
    cleanFlags();
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

blurOnItemWhereEdit = async (index) => {
  if (!flagAllItemsChange) {
    list[index].thing = inputWhereValue;
    const resp = await fetch(`http://localhost:8000/changeItem?_id=${list[index]._id}`, {
      method: "PUT",
      headers: {
        "Content-type" : "application/json;charset=utf-8",
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({
        thing: inputWhereValue,
      })
    });
    let result = await resp.json();
    list = result.data;
    localStorage.setItem("list", JSON.stringify(list));
    editFlagInputWhere = -1;
    inputWhereValue = "";
    render();
  }
}

blurOnItemDateEdit = async (index) => {
  if (!flagAllItemsChange) {
    list[index].date = inputDateValue;
    const resp = await fetch(`http://localhost:8000/changeItem?_id=${list[index]._id}`, {
      method: "PUT",
      headers: {
        "Content-type" : "application/json;charset=utf-8",
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({
        date: inputDateValue
      })
    });
    localStorage.setItem("list", JSON.stringify(list));
    inputDateValue  = "";
    editFlagInputDate = -1;
    render();
  }
}

blurOnItemHowMuchEdit = async (index) => {
  if (!flagAllItemsChange) {
    const resp = await fetch(`http://localhost:8000/changeItem?_id=${list[index]._id}`, {
      method: "PUT",
      headers: {
        "Content-type" : "application/json;charset=utf-8",
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({
        money: inputHowMuchValue
      })
    });
    list[index].money = inputHowMuchValue; 
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
    let itemOfList = document.createElement("li"); //create li
    itemOfList.id = `itemOfList_${index}`;
    itemOfList.className = "itemOfList";  
    let itemChange = document.createElement("div");//create wrapper for picture
    itemChange.className = "itemChange";
    allItemsHere.appendChild(itemOfList);
    //////////////////////  itemWhere ////////////////////////
    if ((editFlag === index) || (editFlagInputWhere === index)) {
      let itemWhereEdit = document.createElement("textarea"); //EDIT itemWhere
      itemWhereEdit.id = `itemWhereEdit_${index}`;
      itemWhereEdit.className = "itemWhereEdit";
      itemWhereEdit.value = list[index].thing;
      inputWhereValue = list[index].thing;
      itemWhereEdit.setAttribute("rows", "2");
      itemOfList.appendChild(itemWhereEdit);
      itemWhereEdit.focus();
      itemWhereEdit.addEventListener("change", () => {
        inputWhereValue = itemWhereEdit.value;
      });  
      itemWhereEdit.addEventListener("blur", () => blurOnItemWhereEdit(index));
    } else { 
      let itemWhere = document.createElement("p");//DON'T edit itemWhere
      itemWhere.id = `itemWhere_${index}`;
      itemWhere.className = "itemWhere";
      itemWhere.innerHTML = `${index+1}) ` + list[index].thing;
      itemOfList.appendChild(itemWhere);
      itemWhere.addEventListener("dblclick", () => dbClickItemWhere(index));
    }
    /////////////////////// itemDate /////////////////////////
    if ((editFlag === index) || (editFlagInputDate === index)) {
      let itemDateEdit = document.createElement("input");// EDIT itemDate
      itemDateEdit.id = `itemDateEdit_${index}`;
      itemDateEdit.className = "itemDateEdit";
      itemDateEdit.type = "date";
      itemDateEdit.value = list[index].date; 
      inputDateValue = list[index].date;
      itemOfList.appendChild(itemDateEdit);
      itemDateEdit.focus();
      itemDateEdit.addEventListener("change", () => {
        inputDateValue = itemDateEdit.value;
      });
      itemDateEdit.addEventListener("blur", () => blurOnItemDateEdit(index));
    } else {   
      let itemDate = document.createElement("p");// DON't edit itemDate   
      itemDate.id = `itemDate_${index}`;
      itemDate.className = "itemDate";       
      itemDate.innerHTML = list[index].date;
      itemOfList.appendChild(itemDate);
      itemDate.addEventListener("dblclick", () => dbClickItemDate(index));
    }
    ////////////////////// itemHowMuch ///////////////////////
    if ((editFlag === index) || (editFlagInputHowMuch === index)) {
      let itemHowMuchEdit = document.createElement("input"); // EDIT itemHowMuch
      itemHowMuchEdit.id = `itemHowMuchEdit_${index}`;
      itemHowMuchEdit.type = "number";
      itemHowMuchEdit.className = "itemHowMuchEdit";
      itemHowMuchEdit.value = list[index].money;
      inputHowMuchValue = list[index].money;
      itemOfList.appendChild(itemHowMuchEdit);
      itemHowMuchEdit.focus();
      itemHowMuchEdit.addEventListener("change", () => {
        inputHowMuchValue = itemHowMuchEdit.value;
      });
      itemHowMuchEdit.addEventListener("blur", () => blurOnItemHowMuchEdit(index));
    } else {
      let itemHowMuch = document.createElement("p"); //if DON't  edit itemHowMuch
      itemHowMuch.id = `itemHowMuch_${index}`;
      itemHowMuch.className = "itemHowMuch";
      itemHowMuch.innerHTML = `${list[index].money} p.`;
      itemOfList.appendChild(itemHowMuch);
      itemHowMuch.addEventListener("dblclick", () => dbClickItemHowMuch(index));
      itemHowMuch.addEventListener("doubletap", () => dbClickItemHowMuch(index));
    }
    ////////////////////// Pictures /////////////////////////
    if (editFlag !== index) {
      let imageEdit = document.createElement("img");// put Edit
      imageEdit.src = "img/edit.svg";
      imageEdit.className = "imageEdit";
      itemChange.appendChild(imageEdit);
      imageEdit.addEventListener("click", () => ImageEdit(index));
    } else {
      imgDone = document.createElement("img"); //put Done
      imgDone.src = "img/done.svg";
      imgDone.className = "imageDone";
      imgDone.addEventListener("click", () => ImageDone(item, index));
      itemChange.appendChild(imgDone);
    }
    let imageDelete = document.createElement("img");//put Delete
    imageDelete.src = "img/delete.svg";
    imageDelete.className = "imageDelete";
    itemChange.appendChild(imageDelete);
    imageDelete.addEventListener("click", () => ImageDelete(index));
    itemOfList.appendChild(itemChange);//put wrapper for picture in end of each  "li"
    total = total + Number(item.money);
  })  
  const forTotal = document.getElementById("total");
  forTotal.innerText = `Итого: ${total}  p.`;
} 