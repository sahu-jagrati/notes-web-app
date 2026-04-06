const notesContainer= document.querySelector(".notes-container");
const createBtn=document.querySelector(".btn");
let notes=document.querySelectorAll(".input-box");


// when we close the browser and open the browser it should check the local storage and if there is any data in the local storage then it should display that particular data as a note so
function showNotes(){
  notesContainer.innerHTML=localStorage.getItem("notes"); // getItem with name notes that we wstore during setItem
}
showNotes(); // always call and it will display the local storage in the container innerHTML

// for storing in local storage
// so whenever we call updatestorage it will update the data in our browser
function updateStorage(){
  localStorage.setItem("notes",notesContainer.innerHTML); // so whatever is written in the notesContainer innerHtml that will ne stored in the browser with the name notes
}


createBtn.addEventListener("click",()=>{
  let inputBox=document.createElement("p"); // create elt with tagname p 
  let img=document.createElement("img"); // create elt with tagname img and it will storeed as img now
  inputBox.className="input-box"; // now in the p elt which is inputBox it will add one class name called input-box
  inputBox.setAttribute("contenteditable","true"); // one more thing also added in p elt 
  img.src="images/delete.png";
  // inputBox is displayed inside the notesContainer and the img is displayed inside the p tag i.e inputBox
  notesContainer.appendChild(inputBox).appendChild(img);
});

// contenteditable- 

// An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:
// true or the empty string, which indicates that the element must be editable;
// false, which indicates that the element must not be editable.

// so we added notesContainer event listener click so when we will click within this notesContainer and if the target elt is IMG then it will remove that parent elt

notesContainer.addEventListener("click",function(e){
  if(e.target.tagName ==="IMG"){
    e.target.parentElement.remove();
    // after deleting it should be updated so
    updateStorage();
  }
  // if we write anything in the P elt then also it should update the data in the browser so here we will add another condition
  else if(e.target.tagName==="P"){
    notes=document.querySelectorAll(".input-box");
    // nt is short for notes
    notes.forEach(nt=>{
      // so it will update the storage when we will start typing, edit anything in the P tag 
      nt.onkeyup=function(){
        updateStorage();
      }
    })
  }
});

// here we are adding document listener keydown, event and  if the event key is ENTER then the document.execcommand is insertLineBreak and event prevent default it means when we wil click ENTER in our keyboard then it will add one line break in the P tag and it will prevent the default feature of the enter key  
document.addEventListener("keydown",event=>{
   if(event.key ==="Enter"){
    document.execCommand("insertLineBreak");
    event.preventDefault();
   }
})
// onkeyup is a DOM event handler that fires when the user releases a keyboard key while the element is focused.

// In this code:

// notes is a collection of elements (likely contenteditable divs)
// For each note element, whenever the user releases a key while typing, updateStorage() is called to save the current content
// Flow: User types a character → key is pressed down → key is released → onkeyup fires → updateStorage() runs

// It's essentially an auto-save trigger — every keystroke saves the notes to storage (likely localStorage).