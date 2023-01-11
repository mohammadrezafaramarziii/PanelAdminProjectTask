
// ****************************************************************************
// open or close side bar
const toggleMenu = () =>{
    const { classList } = document.body;
    if (classList.contains("openMenu")) {
        classList.remove("openMenu");
        classList.add("closedMenu");
    } else {
        classList.remove("closedMenu");
        classList.add("openMenu");
    }
};
// ****************************************************************************
// turn on or off transport input
function transportFare(){
    if(document.getElementById("switch").checked){
        document.getElementById("transport-price-box").disabled = false;
    }else{
        document.getElementById("transport-price-box").disabled = true;
    }
}
// ****************************************************************************
// tag input 
const ul = document.querySelector("ul"),
input = ul.querySelector("input"),
countNump = document.querySelector(".details span");

let maxTags = 15,
tags = [];

countTag();

function countTag(){
    input.focus();
    countNump.innerText = maxTags - tags.length; // subtracting max value with tags length
}

function createTag(){
    // removing all li tags before adding so there will be no  duplicate tags
    ul.querySelectorAll("li").forEach(li => li.remove());
    console.log(tags);
    tags.slice().reverse().forEach(tag =>{
        let liTag = `<li><img src="./Img/close-icon.svg" onclick="remove(this, '${tag}')"> ${tag} </li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);    // inserting or adding li inside ul tag
    })
    countTag();
}

function remove(element, tag){
    let index = tags.indexOf(tag); // getting removing tag index
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)]; // removing selected tag from an array
    element.parentElement.remove(); // removing li of removed tag
    countTag();
}

function addTag(e){
    if(e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g, ' ');  //removing unwanted spaces from user tag
        if(tag.length > 1 && !tags.includes(tag)){     // if tag length is greater than 1 and the tag isn`t exist already
            if(tags.length < 15){
                tag.split(',').forEach(tag =>{     // spliting each tag from comma (,)
                    tags.push(tag);          // adding each taginside array
                    createTag();
                });
            }
        }
        e.target.value = "";
    }
}

input.addEventListener("keyup", addTag);