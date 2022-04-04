import {Cloudinary} from "@cloudinary/url-gen";

// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const imgGif = document.getElementById("gif_img");
const msgBox = document.getElementById("message_box");
let linkTag = searchWrapper.querySelector("a");
let degreeOfBlur = 30;
let flag=true;
var thedate   = new Date();
var dayofweek = thedate.getDate();
var cl = new Cloudinary.Cloudinary({cloud_name: "gifcloud4pixelation", secure: true});
//Change these two to update
let movieGifName = ("Avengers Infinity War	2018").split(" ");
let gifURL="https://res.cloudinary.com/gifcloud4pixelation/image/upload/v1648203877/inf_war_wtqoci.gif";
let guesses=[];

/// Suggestion box code
// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){

        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}
//text func
function Text_Change(guess) {
    switch(guess){
        case 0: msgBox.hidden="false"; msgBox.value="Try again, you got this!"; break;
        case 1: msgBox.hidden="false"; msgBox.value="Congrats! You've guessed correctly! You've completed today's puzzle with the grade stated above!"; break;
        case 2: msgBox.hidden="false"; msgBox.value="We adjusted the image slightly for you, try again!"; break;
    }
  }
  

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    
    searchWrapper.classList.remove("active");
}

function guessButtonFunc(){
    let currentguess=inputBox.value;
    if(flag){
        guessMovie(currentguess);
    }
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}
function boolCorrect(input){
    let b=0;
    movieGifName.forEach(word => {
        if(input.includes(word)){
            b++;
        }
    });
    if(b>=movieGifName.length-1){
        return true;
    }
    else{
        return false;
    }
}
// Guessing logic
function guessMovie(guess){
    if(boolCorrect(guess)){
        document.getElementById("gif_img").src=gifURL;
        guesses.push(1);
        document.getElementById("typePlaceToDisable").disabled = true;
        flag=false;
        setCookie("solved", true, 1);
    }
    else if(guesses.length<5){
        guesses.push(0);
        degreeOfBlur=degreeOfBlur-10;
        document.getElementById("gif_img").src=cl.url(gifURL, { width: 640,  crop: "scale", effect: ("pixelate:")+degreeOfBlur.toString()});
        guessesManager(guesses.length);
    }
    else{
        guesses.push(0);
        document.getElementById("gif_img").src=gifURL;
        guessesManager(guesses.length);
    }
    Text_Change(guesses[guesses_length-1]);
}
function guessesManager(guesses_length){
    switch(guesses_length){
        case 1: document.getElementById("rank_Aplus_card").style="opacity:0.25;"
        document.getElementById("rank_A_card").style="opacity:1;";
        document.getElementById("rank_B_card").style="opacity:0.25;";
        document.getElementById("rank_C_card").style="opacity:0.25;";
        document.getElementById("rank_D").style="opacity:0.25;"; break;
        case 2: document.getElementById("rank_Aplus_card").style="opacity:0.25;";
        document.getElementById("rank_A_card").style="opacity:0.25;";
        document.getElementById("rank_B_card").style="opacity:1;"
        document.getElementById("rank_C_card").style="opacity:0.25;";
        document.getElementById("rank_D").style="opacity:0.25;"; break;
        case 3: document.getElementById("rank_Aplus_card").style="opacity:0.25;"
        document.getElementById("rank_A_card").style="opacity:0.25;";
        document.getElementById("rank_B_card").style="opacity:0.25;";
        document.getElementById("rank_C_card").style="opacity:1;";
        document.getElementById("rank_D").style="opacity:0.25;"; break;
        case 4: document.getElementById("rank_Aplus_card").style="opacity:0.25;"
        document.getElementById("rank_A_card").style="opacity:0.25;";
        document.getElementById("rank_B_card").style="opacity:0.25;";
        document.getElementById("rank_C_card").style="opacity:0.25;";
        document.getElementById("rank_D").style="opacity:1;"; break;
        case 5: document.getElementById("rank_Aplus_card").style="opacity:0.25;";
        document.getElementById("rank_A_card").style="opacity:0.25;";
        document.getElementById("rank_B_card").style="opacity:0.25;";
        document.getElementById("rank_C_card").style="opacity:0.25;";
        document.getElementById("rank_D").style="opacity:0.25;"; break;
    }
}
function clearerImg(){
    degreeOfBlur=degreeOfBlur-5;
    document.getElementById("gif_img").src=cl.url(gifURL, { width: 640,  crop: "scale", effect: ("pixelate:")+degreeOfBlur.toString()});
    guesses.push(2);
    guessesManager(guesses.length);
}

//Create cookies to track

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

//call this
function checkCookie() {
    let solved = getCookie("solved");
    if (solved != "") {
        flag=false;
        document.getElementById("typePlaceToDisable").disabled = true;
        document.getElementById("gif_img").src=gifURL;
        window.alert("You've completed today's flixl, please come back tomorrow!");
    }
    changeOnDate(dayofweek);
}
//Share function
function resultCopy(){
    let k=guesses.length;
    let res=["Daily flixl result:"];
    guesses.forEach(element => {
        switch(element){
           case 0: res.push("❌"); break;
           case 1: res.push("✔️"); break;
           case 2: res.push("🔳"); break;
        }
    });
    if(k<5 || k==0){
        for(var i=5; i>k; i--){
            res.push("⬛️");
        }
    }
    navigator.clipboard.writeText();
    navigator.clipboard.writeText(res);
}

function changeOnDate(date){
    movieGifName=queued_movies[date-1][0].split(" ");
    gifURL=queued_movies[date-1][1];
    document.getElementById("gif_img").src=gifURL;
}

//script for pop ups
document.getElementById("popup_02").style.display = "none";
document.getElementById("popup_03").style.display = "none";
document.getElementById("popup_04").style.display = "none";



document.querySelector('#head_bt_01').addEventListener('click', function () {
document.getElementById("popup_01").style.display = "block";
document.getElementById("popup_02").style.display = "none";
document.getElementById("popup_03").style.display = "none";
document.getElementById("popup_04").style.display = "none";
});
document.querySelector('#popupShut_01').addEventListener('click', function () {
document.getElementById("popup_01").style.display = "none";
});




document.querySelector('#head_bt_02').addEventListener('click', function () {
document.getElementById("popup_01").style.display = "none";
document.getElementById("popup_02").style.display = "block";
document.getElementById("popup_03").style.display = "none";
document.getElementById("popup_04").style.display = "none";
});
document.querySelector('#popupShut_02').addEventListener('click', function () {
document.getElementById("popup_02").style.display = "none";
});





document.querySelector('#head_bt_03').addEventListener('click', function () {
document.getElementById("popup_01").style.display = "none";
document.getElementById("popup_02").style.display = "none";
document.getElementById("popup_03").style.display = "block";
document.getElementById("popup_04").style.display = "none";
});
document.querySelector('#popupShut_03').addEventListener('click', function () {
document.getElementById("popup_03").style.display = "none";
});





document.querySelector('#head_bt_04').addEventListener('click', function () {
document.getElementById("popup_01").style.display = "none";
document.getElementById("popup_02").style.display = "none";
document.getElementById("popup_03").style.display = "none";
document.getElementById("popup_04").style.display = "block";
});
document.querySelector('#popupShut_04').addEventListener('click', function () {
document.getElementById("popup_04").style.display = "none";
});
