var deck = {
    creator: [],
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
  };

var rawDeck = {
  creator: [],
  mainDeck: [],
  extraDeck: [],
  sideDeck: [],
};

var deckInfo = document.getElementById("deck_info")
var deckDiv = document.getElementById("deck")
var deckCreator = document.getElementById("deck_creator")
var deckMain = document.getElementById("deck_main")
var deckExtra = document.getElementById("deck_extra")
var deckSide = document.getElementById("deck_side")

var textFromFile

function clearDeckPricer(){
  deckInfo.innerHTML=""
  deckDiv.innerHTML=""
  deckCreator.innerHTML=""
  deckMain.innerHTML=""
  deckExtra.innerHTML=""
  deckSide.innerHTML=""

}

function loadDeckPricer() {
  console.log("load deck pricer");
  window.location.hash = `/deckPricer`
  clearScreen();

  subContent1.innerHTML = ` <h2>Elegir deck</h2> 
    <input type="file" id="file-input" class="form-control-file" />
    <h3>Contenido del archivo:</h3>
    <pre id="contenido-archivo"></pre>
            `;
  document
    .getElementById("file-input")
    .addEventListener("change", leerArchivo, false);
    
}

function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(archivo);
  createDeck()
}

function mostrarContenido(contenido) {
  // console.log(contenido)
  textFromFile = contenido
  createDeck()
  

  deckCreator.innerHTML = `${deck.creator} `
  getCardsById(rawDeck.mainDeck,"deck")
  getCardsById(rawDeck.extraDeck,"extra")
  getCardsById(rawDeck.sideDeck,"side")

}

function createDeck() {
    textFromFile = textFromFile.replace("#created by ", "#creator:");
    textFromFile = textFromFile.replace("#main", "#main:");
    textFromFile = textFromFile.replace("#extra", "#extra:");
    textFromFile = textFromFile.replace("!", "#");
    textFromFile = textFromFile.replace(" ", "");
    textFromFile = textFromFile.replace("#side", "#side:");
    // Values From .ydk
    var rawinfo = textFromFile.split("#creator:")
    // console.log(rawinfo[1])
    var rawname = rawinfo[1].split("#main:")
    // console.log("Deck Creator : ", rawname[0])
    var rawmain = rawname[1].split("#extra:")
    // console.log("Main deck : ", rawmain[0])
    var rawextra = rawmain[1].split("#side:")
    // console.log("Extra deck : ", rawextra[0])
    // console.log("Side deck : ", rawextra[1])
    // CREATOR 
    deck.creator = rawname[0].replace(/\r\n/g, "")
    rawDeck.creator = rawname[0].replace(/\r\n/g, "")
    // MAIN DECK
    deck.mainDeck = rawmain[0].trimStart().trimRight().replace(/\r\n/g, ",")
    rawDeck.mainDeck = deck.mainDeck
    deck.mainDeck = deck.mainDeck.split(",");  //Convert to array
    // EXTRA DECK
    deck.extraDeck = rawextra[0].trimStart().trimRight().replace(/\r\n/g, ",")
    rawDeck.extraDeck = deck.extraDeck
    deck.extraDeck = deck.extraDeck.split(",");
    // SIDE DECK
    deck.sideDeck = rawextra[1].trimStart().trimRight().replace(/\r\n/g, ",")
    rawDeck.sideDeck = deck.sideDeck
    deck.sideDeck = deck.sideDeck.split(",");

    console.log(deck)
    console.log(rawDeck)


    // deck.creator = textFromFile.split("#creator:");
    // console.log(deck.creator)



}

function getCardsById(cardIds,where){
  resetMoreResults()
  fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id="+cardIds+"&misc=yes")
  .then( cardInfo => cardInfo.json() )
  .then(data => {	
      results = data;
      for (var b = 0; b = results.data.length; b++) {
        createCardGrids(results.data[b],where);
      }
      });

  }
