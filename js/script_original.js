// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const imgGif = document.getElementById("gif_img");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
let degreeOfBlur = 40;
let flag=true;
//Change these two to update
const movieGifName = "Avengers Infinity War	2018";
let gifURL="https://res.cloudinary.com/gifcloud4pixelation/image/upload/v1648203877/inf_war_wtqoci.gif";
let guesses=[];

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            /*webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();*/
            guessMovie(userData);
        }
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

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        /*webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();*/
        if(flag){
            guessMovie(selectData);
        }
    }
    searchWrapper.classList.remove("active");
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

function guessMovie(guess){
    if(guess==movieGifName){
        document.getElementById("gif_img").src=`https://res.cloudinary.com/demo/image/fetch/${gifURL}`;
        guesses.push(1);
        document.getElementById("typePlaceToDisable").disabled = true;
        flag=false;
    }
    else if(guesses.length<5){
        guesses.push(0);
        degreeOfBlur=degreeOfBlur-10;
        document.getElementById("gif_img").src=`https://res.cloudinary.com/demo/image/fetch/e_pixelate:${degreeOfBlur}/${gifURL}`;
    }
    else{
        guesses.push(0);
        document.getElementById("gif_img").src=`https://res.cloudinary.com/demo/image/fetch/${gifURL}`;
    }
    guessesManager(guesses.length);
}
function guessesManager(guesses_length){
    switch(guesses_length){
        case 1: document.getElementById("1stG").src=guessImgChange(guesses[0]); break;
        case 2: document.getElementById("2ndG").src=guessImgChange(guesses[1]); break;
        case 3: document.getElementById("3rdG").src=guessImgChange(guesses[2]); break;
        case 4: document.getElementById("4thG").src=guessImgChange(guesses[3]); break;
        case 5: document.getElementById("5thG").src=guessImgChange(guesses[4]); break;
    }
}
function clearerImg(){
    degreeOfBlur=degreeOfBlur-10;
    guesses.push(2);
}
function guessImgChange(indexOfGuess){
    if(indexOfGuess==1){
        return 'https://res.cloudinary.com/gifcloud4pixelation/image/upload/v1648568235/placeholders/right_wcs11d.png';
    }
    else if(indexOfGuess==2){
        return 'https://res.cloudinary.com/gifcloud4pixelation/image/upload/v1648568235/placeholders/pixelate_wxcsaf.png'
    }
    else{
        return 'https://res.cloudinary.com/gifcloud4pixelation/image/upload/v1648568235/placeholders/wrong_t64zte.png';
    }
}
