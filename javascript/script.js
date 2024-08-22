function exitMask(){
    const mask = document.getElementById('maskDiv');
    mask.style.display = 'none';
}

function add() {
    const main = document.getElementById('main');
    const input_text = document.getElementById('inputTxt');

    const input_value = input_text.value.trim();

    if (input_value == "") {
        alert("هیچ برنامه ای رو وارد نکردی !")
        return;
    }

    const new_value = createNewItem(input_value);
    main.appendChild(new_value);

    input_text.value = "";

    save_browser_storage();
}

function createNewItem(data) {

    const new_item = document.createElement('div');
    new_item.className = 'div_item';

    const new_span = document.createElement('span');
    new_span.textContent = data; //function's parameter//

    const edit_button = document.createElement('button');
    edit_button.onclick = function () {
        edit_item(new_item)
    }
    const edit_icon = document.createElement('i');
    edit_icon.className = "fa-solid fa-pen";
    edit_button.appendChild(edit_icon);


    const remove_button = document.createElement('button');
    remove_button.onclick = function () {
        remove_item(new_item)
    }
    const remove_icon = document.createElement('i');
    remove_icon.className = "fa-solid fa-trash-can";
    remove_button.appendChild(remove_icon);

    new_item.appendChild(new_span);
    new_item.appendChild(edit_button);
    new_item.appendChild(remove_button);

    return new_item;
}

function edit_item(item) {
    const target_span = item.querySelector('span');
    const new_data = prompt("اینجا عنوان برنامت رو تغییر بده :" , target_span.textContent);
    if(new_data==null || new_data=="")
        alert("عنوان جدیدی اضافه نشد !");
    else
        target_span.textContent = new_data;

    save_browser_storage();
}

function remove_item(item) {
    const target_div = item;
    target_div.remove();

    save_browser_storage();
}

function save_browser_storage(){
    const allSpans = document.querySelectorAll('.div_item span');// it returns an Array //
    var spansArray = []

    for(let i = 0 ; i<allSpans.length ; ++i){
        spansArray.push(allSpans[i].textContent)
    }
    // save 'spansArray' in browser's local storage as a String seperated by ',' //
    localStorage.setItem('spansText' , spansArray.join(',')) 
}

function load_browser_storage(){
    const saved_item = localStorage.getItem('spansText');
    const mainDiv = document.getElementById('main');

    if(saved_item!=""){
        const saved_array = saved_item.split(',');

        for(let i = 0 ; i<saved_array.length ; ++i){
        const text = saved_array[i];
        const repeat_div = createNewItem(text);
        mainDiv.appendChild(repeat_div)
        } 
    }     
}

document.addEventListener('DOMContentLoaded' , load_browser_storage);
