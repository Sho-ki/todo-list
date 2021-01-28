const addBtn = document.getElementById('add');
const inputText = document.getElementById('todoText');
const taskList = document.getElementById('list');
const deleteBtn = document.getElementsByClassName('delete');
const list = document.querySelector('.list');
let countLetter = document.getElementById("countLetters");


function countCharacters (){
    let count = inputText.value.length;
    countLetter.innerHTML = count + ' / 65 Chracters';
    if(count >= 66){
        countLetter.style.color= 'red';
    } else {
        countLetter.style.color= 'white';
    }
}

function editTask() {
    
    //iconの初期化
    let icon = document.createElement("i")
    let icon1 = document.createElement('i')
    icon.className="fa fa-trash fa-lg delete"
    icon1.className="fas fa-edit fa-lg edit"

    //thisのparentを取得
    let parent_li = this.parentNode;

    //編集用スペース作成
    let edit_space = document.createElement("textarea");
    edit_space.setAttribute("rows", "1");
    edit_space.setAttribute("wrap", "hard")
    edit_space.className = "editText"

    //元のtodoを編集用スペースに収納
    edit_space.innerText = parent_li.innerText
    //元のtodoを削除
    parent_li.innerHTML = ''
    
    //元todo会った場所に編集用をappend
    parent_li.appendChild(edit_space)
    
    //SAVEの作成
    let editDone = document.createElement("button");
    editDone.className = 'editDoneButton';
    editDone.innerText = 'SAVE'
    parent_li.appendChild(editDone);

    function setCursor() {
        let obj = parent_li.firstChild;
        let e = obj.value;
        obj.value = ''
        obj.focus();     //テキストボックスにフォーカスを移動
        obj.value = e; 
        }
        setCursor();

    function save(){
        let check = edit_space.value;
        let substract = check.length - 65
        if(substract >= 2) {
            alert(`Delete ${substract} Characters`); 
        } else if(substract === 1){
            alert(`Delete ${substract} Character`); 
        }
        else {
        //上でeditDoneをappendChild下からremoveChildする(displayNoneでもいいけどかっこ悪い)
        // editDone.style.display = "none";
        parent_li.removeChild(editDone)

        //新しい予定を表示
        parent_li.innerHTML = edit_space.value

        //iconを追加．
        parent_li.appendChild(icon1)
        parent_li.appendChild(icon)
        icon.addEventListener("click", deleteTask)
        icon1.addEventListener("click", editTask)
    }
    }
   
   editDone.addEventListener('click', save);
   edit_space.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        save();
    }
    
})
}

function deleteTask() {
    this.parentNode.remove()
}
 
let addTask =()=>{
    let check = inputText.value;
    if(check.length >65) alert('Too long, Text should be less') 
    else{
    let createTask = document.createElement('li')
    // let div = document.createElement("div")
    let icon = document.createElement("i")
    let icon1 = document.createElement('i')
    createTask.innerHTML = `${inputText.value}`;
    createTask.className=createTask.innerHTML
    // div.className="delete"
    icon.className="fa fa-trash fa-lg delete"
    icon1.className="fas fa-edit fa-lg edit"
    if(!check){
        alert('text needs')
    } else {
        taskList.appendChild(createTask);
        // createTask.appendChild(div)
        createTask.appendChild(icon1)
        createTask.appendChild(icon)
        
    }
    inputText.value = '';
    icon.addEventListener("click", deleteTask)
    icon1.addEventListener("click", editTask)
}
    let count = inputText.value.length;
    countLetter.innerHTML = count + ' / 65 Chracters';
}

addBtn.addEventListener('click', addTask);
inputText.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask()
    }
})

