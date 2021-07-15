
// VARIABLES PARA EL FUNCIONAMIENTO
var content = document.getElementById("content");
var subContent1 = document.getElementById("sub-content-1");
var subContent2 = document.getElementById("sub-content-2");
var subContent3 = document.getElementById("sub-content-3");
var subContent3miniCards = document.getElementById("sub-content-3-miniCards");
var images;
var results;
var banlist = "tcg";
var value2;
var yugiohPricesResult;
var allCards;

//  CUANTO VA A CARGAR
var resultsPerPage = 18;

// LOCALSTORAGE

function save2localStorage(value1, value2) {
  localStorage.setItem(value1, JSON.stringify(value2));
  console.log(value1 + " was saved with a value of " + value2);
}

function readLocalStorage(value1) {
  if (localStorage.getItem(value1)) {
    value2 = JSON.parse(localStorage.getItem(value1));
    console.log("searching '" + value1 + "' with a result of :" + value2);
  } else {
    console.log("value not found!");
  }
  return value2;
}



function copyCardID(e){
	e = e || window.event;
	e = e.target || e.srcElement
	//console.log('cardArchetype :' +e.id)
    cardID = e.id
    // document.getElementById('bodyAdv').classList.add('d-none')
	cardShareURL= `${host}#/cardID/${cardID}`
	changeButtonColor(e.id)
	copy(cardShareURL)
}


function clearScreen(){
  subContent1.innerHTML=""
  subContent2.innerHTML=""
  subContent3miniCards.innerHTML=""
}