
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
var scrollingValue = 6000;
var language;
var view;

//  CUANTO VA A CARGAR
var resultsPerPage = 20;
var setsPerPage = 50;

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
  subContent_advancedMode.innerHTML=""
  subContent_about.innerHTML=""
  subContent_filterBar.innerHTML=""
  advancedModeToggle = 1
}

// CLEAR SCREEN FOR VIEW CHANGE

function clearScreenForViewChange(){
  subContent2.innerHTML="";
  subContent_miniCards.innerHTML=""
  subContent_about.innerHTML=""
  subContent_filterBar.innerHTML=""
}


// CLEAR SCREEN CONTENT FOR ADVANCED MODE

function clearScreenForAdvancedMode(){
  subContent1.innerHTML=""
  subContent2.innerHTML=""
  subContent_miniCards.innerHTML=""
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

function changeView () {
  clearScreenForViewChange()
  view++
  if (view > 2) {
    view = 1
    console.log(view)
    whatType = createCard
    save2localStorage("view", view);

  } else if (view==1) {
    whatType = createCard
    scrollingValue = 6000
    save2localStorage("view", view);

  } else if (view == 2) {
    whatType = createMiniCard
    scrollingValue = 1000
    save2localStorage("view", view);
    view = 0
  }

  if (results.data){
  for (var b = 0; b < resultsPerPage; b++) {
    whatType(results.data[b])}

  // console.log("Current view is set to "+ whatType)
  } else if (!(results.data)){
    for (var b = 0; b < resultsPerPage; b++) {
      whatType(results[0][b])}
  }


}



// LOAD MORE CARDS BUTTON

 
var moreCardsbtn = $('#loadMoreCards');

$(window).scroll(function() {
  if ($(window).scrollTop() > scrollingValue) {
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

    if (window.location.hash=="#/format/goat" || window.location.hash=="#/format/ocg%20goat" || window.location.hash== "#/format/rush%20duel" || window.location.hash=="#/format/speed%20duel" || window.location.hash=="#/format/duel%20links"){
    //  crear variable para cargar las cartas sin modificar results
      whatType(filteredResults[b])
        loadedCards++
        


        } else if (results[0].length== 20) {
                whatType(allCards.data[b])
                loadedCards++
               }  else if (b = results.data.length){
                      moreCardsbtn.removeClass('show');
                      resetMoreResults()
                      console.log('No more cards!');
                      alert("No more cards!")
                      return
                    } else {
                      whatType(results.data[b])
                      loadedCards++
                    }
          }

        
}