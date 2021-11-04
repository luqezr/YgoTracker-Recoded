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

var lowestPriceForDeck = {
  mainDeck: [],
  extraDeck: [],
  sideDeck: [],
};

var highetsPriceForDeck = {
  mainDeck: [],
  extraDeck: [],
  sideDeck: [],
};

var lowestCardPriceArray = []
var lowestCardPrice
var mainDeckDuplicates 
var extraDeckDuplicates
var sideDeckDuplicates
var deckInfo



function loadDeckPricer() {
  console.log("load deck pricer");
  window.location.hash = `/deckPricer`
  clearScreen();

  subContent1.innerHTML = ` <h2>${deckPricer_chooseDeck}</h2> 
  <input type="file" id="file-input" class="form-control-file" />
  <pre id="contenido-archivo"></pre>
          `;

  subContentDeckPricer.innerHTML=`
  <h3>${deckPricer_dropkYdk}</h3>
  <div id="deck">
    <div id="deck_creator"></div>
    <hr>
    <h2>Main Deck </h2>
    <div id="deck_main"></div>
    <hr>
    <h2>Extra Deck </h2>
    <div id="deck_extra"></div>
    <hr>
    <h2>Side Deck </h2>
    <div id="deck_side"></div>
  </div>
  <button type="button" class="btn btn-secondary btn-lg btn-block" onclick="searchLowestPrices()">Price Breakdown</button>
  <br>
  <br>
  <div id="deck_info">

  </div>


  `

  let area = document.getElementById('sub-content-deckPricer');
  area.addEventListener('dragover', e => e.preventDefault());
  area.addEventListener('drop', readFile);
  

            
  document
    .getElementById("file-input")
    .addEventListener("change", leerArchivo, false);
    
}

function searchLowestPrices(){
  deckInfo = document.getElementById("deck_info")
  deckInfo.innerHTML+='<br>-----------------------------------<br>Main Deck'
  searchLowestDeckValue(deck.mainDeck)
  deckInfo.innerHTML+='<br>-----------------------------------<br>Extra Deck'
  searchLowestDeckValue(deck.extraDeck)
  deckInfo.innerHTML+='<br>-----------------------------------<br>Side Deck'
  searchLowestDeckValue(deck.sideDeck)
  deckInfo.innerHTML+='<br>-----------------------------------'
  let decktotalprice = lowestPriceForDeck.mainDeck.reduce((a, b) => a + b, 0);
  let extradecktotalprice = lowestPriceForDeck.extraDeck.reduce((a, b) => a + b, 0);
  let sidedecktotalprice = lowestPriceForDeck.sideDeck.reduce((a, b) => a + b, 0);
  let totalprice = decktotalprice+extradecktotalprice+sidedecktotalprice
  deckInfo.innerHTML+=`<br>Total price for maindeck : ${decktotalprice.toFixed(2)}`
  deckInfo.innerHTML+='<br>-----------------------------------'
  deckInfo.innerHTML+=`<br>Total price for extradeck : ${extradecktotalprice.toFixed(2)}`
  deckInfo.innerHTML+='<br>-----------------------------------'
  deckInfo.innerHTML+=`<br>Total price for sidedeck : ${sidedecktotalprice.toFixed(2)}`
  deckInfo.innerHTML+='<br>-----------------------------------'
  deckInfo.innerHTML+=`<br>Total price : ${totalprice.toFixed(2)}`
  
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
  let cardsInMainDeck
  let cardsInExtraDeck
  let cardsInSideDeck

  if (deck.mainDeck[0] == undefined){
    console.log("No main deck")
    cardsInMainDeck = 0
    } else if (deck.extraDeck[0] == undefined){
      console.log("No extra deck")
      cardsInExtraDeck = 0
    } else if (deck.sideDeck[0] == undefined){
      console.log("No side deck")
      cardsInSideDeck = 0
    }else{
      cardsInMainDeck = deck.mainDeck.length
      cardsInExtraDeck = deck.extraDeck.length
      cardsInSideDeck = deck.sideDeck.length


          deckInfo.innerHTML=`
            ${deckPricer_deckCreator} : ${rawDeck.creator}
            ${deckPricer_mainDeck} (${cardsInMainDeck})
            ${deckPricer_extraDeck} (${cardsInExtraDeck})
            ${deckPricer_sideDeck} (${cardsInSideDeck})
              `

        var cardPrices = document.getElementById("cardPrices")
    }

  mainDeckDuplicates=count_duplicate(deck.mainDeck)
  extraDeckDuplicates=count_duplicate(deck.extraDeck)
  sideDeckDuplicates=count_duplicate(deck.sideDeck)

  getCardsById(rawDeck.mainDeck,"deck","deck","mainDeck")
  getCardsById(rawDeck.extraDeck,"extra","extra","extraDeck")
  getCardsById(rawDeck.sideDeck,"side","side","sideDeck")

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


}

function getCardsById(cardIds,where,checkDuplicates,modifyDeckArray){
  resetMoreResults()

  deck = {
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
  };


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

  (async function(){
    await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id="+cardIds+"&misc=yes")
        .then( cardInfo => cardInfo.json() )
        .then(data => {	
            results = data;
            results.data.sort( sortBy );

            for (var b = 0; b < results.data.length; b++) {
              createDeck(results.data[b],where);
              pushToDeck(modifyDeckArray,b)
              for (var c = 1; c < checkDuplicates[results.data[b].id]; c++) { 
                    createDeck(results.data[b],where);
                    pushToDeck(modifyDeckArray,b)
              
                
              }

              // if (checkDuplicates[results.data[b].id] > 1 ){
              //  console.log("Duplicate here!")

              // }
            }
            });

          })();

          deck.mainDeck.sort( sortBy );
          deck.extraDeck.sort( sortBy );
          deck.sideDeck.sort( sortBy );

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
 
function pushToDeck(modifyDeckArray,b){
  if (modifyDeckArray == "mainDeck") { 
    deck.mainDeck.push(results.data[b]) ; 
    // console.log("main!!")
  } else if (modifyDeckArray == "extraDeck") {  
    deck.extraDeck.push(results.data[b]) ; 
    // console.log("extra!!")
  } else if (modifyDeckArray == "sideDeck") { 
    deck.sideDeck.push(results.data[b]); 
    // console.log("side!!")
  }
}

function searchLowestDeckValue(value){
  deckInfo = document.getElementById("deck_info")
  if (value == deck.mainDeck ) {
        for (let b = 0 ; b < deck.mainDeck.length ; b++ ){
          // console.log(deck.mainDeck[b].card_sets)

            lowestCardPriceArray=[]
            for ( let i = 0 ; i < deck.mainDeck[b].card_sets.length ; i++) { 
            
              if (deck.mainDeck[b].card_sets[i].set_price == 0 ){ 
                // console.log("set price  = 0") 
                continue
               } else {
              lowestCardPriceArray.push(Number.parseFloat(deck.mainDeck[b].card_sets[i].set_price))

               }
              // console.log(Math.min(...lowestCardPriceArray));
              // lowestCardPrice = Math.min(...lowestCardPriceArray)
              // console.log("---------------------------------------------------------------")
              // console.log(deck.mainDeck[b].name+ " set de carta numero "+i + " valor $" +deck.mainDeck[b].card_sets[i].set_price)
            
              // lowestPriceForDeck.mainDeck.push(lowestCardPrice)
            }
            // console.log(lowestCardPriceArray)
            console.log("lowest value for " + deck.mainDeck[b].name +" is $"+ Math.min(...lowestCardPriceArray))

            deckInfo.innerHTML+=`<br>${deckPricer_lowestPrice_1}<span data-toggle="modal" data-target="#ModalID${deck.mainDeck[b].id}">${deck.mainDeck[b].name}</span>${deckPricer_lowestPrice_2} ${Math.min(...lowestCardPriceArray)}`
            lowestPriceForDeck.mainDeck.push(Math.min(...lowestCardPriceArray))
            
        }


    } else if ( value == deck.extraDeck){

      for (let b = 0 ; b < deck.extraDeck.length ; b++ ){
          lowestCardPriceArray=[]
          for ( let i = 0 ; i < deck.extraDeck[b].card_sets.length ; i++) { 
            if (deck.extraDeck[b].card_sets[i].set_price == 0 ){ 
              // console.log("set price  = 0") 
              continue
             } else {
            lowestCardPriceArray.push(Number.parseFloat(deck.extraDeck[b].card_sets[i].set_price))

             }
        
          }
          // console.log(lowestCardPriceArray)
          console.log("lowest value for " + deck.extraDeck[b].name +" is $"+ Math.min(...lowestCardPriceArray))

          deckInfo.innerHTML+=`<br>${deckPricer_lowestPrice_1}<span data-toggle="modal" data-target="#ModalID${deck.extraDeck[b].id}">${deck.extraDeck[b].name}</span>${deckPricer_lowestPrice_2} ${Math.min(...lowestCardPriceArray)}`
          lowestPriceForDeck.extraDeck.push(Math.min(...lowestCardPriceArray))
      }


      } else if ( value == deck.sideDeck){

        for (let b = 0 ; b < deck.sideDeck.length ; b++ ){
          lowestCardPriceArray=[]
          for ( let i = 0 ; i < deck.sideDeck[b].card_sets.length ; i++) { 
            if (deck.sideDeck[b].card_sets[i].set_price == 0 ){ 
              // console.log("set price  = 0") 
              continue
             } else {
            lowestCardPriceArray.push(Number.parseFloat(deck.sideDeck[b].card_sets[i].set_price))

             }
        
          }
          // console.log(lowestCardPriceArray)
          console.log("lowest value for " + deck.sideDeck[b].name +" is $"+ Math.min(...lowestCardPriceArray))
          
          deckInfo.innerHTML+=`<br>${deckPricer_lowestPrice_1}<span data-toggle="modal" data-target="#ModalID${deck.sideDeck[b].id}">${deck.sideDeck[b].name}</span>${deckPricer_lowestPrice_2} ${Math.min(...lowestCardPriceArray)}`
          lowestPriceForDeck.sideDeck.push(Math.min(...lowestCardPriceArray))
      }

        }

 


}


function sortBy( a, b ) {
  if ( a.type < b.type ){
    return -1;
  }
  if ( a.type > b.type ){
    return 1;
  }
  return 0;
}

