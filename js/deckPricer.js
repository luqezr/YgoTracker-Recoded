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

var mainDeckDuplicates 
var extraDeckDuplicates
var sideDeckDuplicates

function loadDeckPricer() {
  console.log("load deck pricer");
  window.location.hash = `/deckPricer`
  clearScreen();

  subContent1.innerHTML = ` <h2>Elegir deck</h2> 
  <input type="file" id="file-input" class="form-control-file" />
  <h3>Contenido del archivo:</h3>
  <pre id="contenido-archivo"></pre>
          `;

  subContentDeckPricer.innerHTML=`
  <h3>Drop your deck (.ydk) here!</h3>
  <div id="deck_info">

  </div>

  <div id="deck">
    
    <div id="deck_creator"></div>
    <hr>
    <div id="deck_main"></div>
    <hr>
    <div id="deck_extra"></div>
    <hr>
    <div id="deck_side"></div>
  </div>
  `

  let area = document.getElementById('sub-content-deckPricer');
  area.addEventListener('dragover', e => e.preventDefault());
  area.addEventListener('drop', readFile);
  

            
  document
    .getElementById("file-input")
    .addEventListener("change", leerArchivo, false);
    
}

function leerArchivo(e) {
  clearDeck()
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
}

function mostrarContenido(contenido) {
  // console.log(contenido)
  textFromFile = contenido
  createDeckArray()
  
  
  var deckInfo = document.getElementById("deck_info")
  var deckDiv = document.getElementById("deck")
  var deckCreator = document.getElementById("deck_creator")
  var deckMain = document.getElementById("deck_main")
  var deckExtra = document.getElementById("deck_extra")
  var deckSide = document.getElementById("deck_side")


  deckInfo.innerHTML=`
  Deck creator: ${rawDeck.creator}
  Main Deck (${deck.mainDeck.length})
  Extra Deck (${deck.extraDeck.length})
  Side Deck (${deck.sideDeck.length})`

  mainDeckDuplicates=count_duplicate(deck.mainDeck)
  extraDeckDuplicates=count_duplicate(deck.extraDeck)
  sideDeckDuplicates=count_duplicate(deck.sideDeck)
  getCardsById(rawDeck.mainDeck,"deck","deck")
  getCardsById(rawDeck.extraDeck,"extra","extra")
  getCardsById(rawDeck.sideDeck,"side","side")


}

function createDeckArray() {
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

function getCardsById(cardIds,where,checkDuplicates){
  resetMoreResults()

	if (checkDuplicates == "deck") { 
		checkDuplicates = mainDeckDuplicates ; 
		// console.log("main!!")
	}
	if (checkDuplicates == "extra") { 
		checkDuplicates = extraDeckDuplicates ; 
		// console.log("extra!!")
	}
	if (checkDuplicates == "side") { 
		checkDuplicates = sideDeckDuplicates ; 
		// console.log("side!!")
	}

  fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id="+cardIds+"&misc=yes")
  .then( cardInfo => cardInfo.json() )
  .then(data => {	
      results = data;
      for (var b = 0; b <= results.data.length; b++) {
        createDeck(results.data[b],where);
        for (var c = 1; c < checkDuplicates[results.data[b].id]; c++) { 
          createDeck(results.data[b],where);
        }

        // if (checkDuplicates[results.data[b].id] > 1 ){
        //  console.log("Duplicate here!")

        // }
      }
      });

  }

  // Drag and drop 


function readFile (e) {
  e.preventDefault();
  clearDeck()
  let file = e.dataTransfer.files[0];
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(file);
}

function clearDeck(){
  var deckInfo = document.getElementById("deck_info")
  var deckDiv = document.getElementById("deck")
  var deckCreator = document.getElementById("deck_creator")
  var deckMain = document.getElementById("deck_main")
  var deckExtra = document.getElementById("deck_extra")
  var deckSide = document.getElementById("deck_side")

  deckCreator.innerHTML=""
  deckMain.innerHTML=""
  deckExtra.innerHTML=""
  deckSide.innerHTML=""

}



function count_duplicate(a){
  let counts = {}
 
  for(let i =0; i < a.length; i++){ 
      if (counts[a[i]]){
      counts[a[i]] += 1
      } else {
      counts[a[i]] = 1
      }
     }  
     for (let prop in counts){
         if (counts[prop] >= 2){
            //  console.log(prop + " counted: " + counts[prop] + " times.")
         }
     }
  //  console.log(counts)
   return counts
 }
 
