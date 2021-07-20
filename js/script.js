
// VARIABLES PARA EL FUNCIONAMIENTO
var content = document.getElementById("content");
var subContent1 = document.getElementById("sub-content-1");
var subContent2 = document.getElementById("sub-content-2");
var subContent3 = document.getElementById("sub-content-3");
var subContent_about = document.getElementById("sub-content-about");
var subContent_advancedMode = document.getElementById("sub-content-advancedMode");
var subContent_miniCards = document.getElementById("sub-content-3-miniCards");
var subContent_filterBar = document.getElementById("sub-content-filterBar");
var images;
var results;
var banlist = "tcg";
var value2;
var yugiohPricesResult;
var allCards;

//  CUANTO VA A CARGAR
var resultsPerPage = 18;

// LOCALSTORAGE

// SAVE
function save2localStorage(value1, value2) {
  localStorage.setItem(value1, JSON.stringify(value2));
  // console.log(value1 + " was saved with a value of " + value2);
}

// READ
function readLocalStorage(value1) {
  if (localStorage.getItem(value1)) {
    value2 = JSON.parse(localStorage.getItem(value1));
    // console.log("searching '" + value1 + "' with a result of :" + value2);
  } else {
    // console.log("value not found!");
  }
  return value2;
}


// COPY CARD ID

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

// CLEAR SCREEN CONTENT

function clearScreen(){
  subContent1.innerHTML=""
  subContent2.innerHTML=""
  subContent_miniCards.innerHTML=""
  // subContent_advancedMode.innerHTML=""
  subContent_about.innerHTML=""
  subContent_filterBar.innerHTML=""
}

// CLEAR CONTENT FOR SETS AND ARCHETYPES

function clearScreenForSetsAndArchetypes(){
  subContent2.innerHTML=""
  subContent_miniCards.innerHTML=""
  subContent_advancedMode.innerHTML=""
  subContent_about.innerHTML=""
}

// WHAT TYPE OF CARD TO LOAD (CARD, MINI CARD)

var whatType

function changeView (newType) {
  whatType = newType
  console.log("Current view is set to "+whatType)
}

// LOAD MORE CARDS BUTTON

 
var moreCardsbtn = $('#loadMoreCards');

$(window).scroll(function() {
  if ($(window).scrollTop() > 6000) {
    moreCardsbtn.addClass('show');
  } else {
    moreCardsbtn.removeClass('show');
  }
});


// BACK TO TOP BUTTON
 
var btn = $('#back2top');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


// LOAD MORE CARDS

var loadedCards = resultsPerPage
var loadThisManyCards = 12
var moreResults

function resetMoreResults(){
  moreResults=0
  loadedCards = resultsPerPage
}

function loadMoreCards(whatType){

  moreResults = loadedCards+loadThisManyCards;

  for (b = loadedCards; b < moreResults ; b++) {
      if (b >= results.data.length){
          console.log('No more cards!');
          
          moreCardsbtn.removeClass('show');
          resetMoreResults()
          return} 
      else {
   
      whatType(results.data[b])
      loadedCards++
      }
  }
}