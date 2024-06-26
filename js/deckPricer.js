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

var lowestCardPriceRaw = {
  name: [],
  rarity:[],
  price: [],
  set: [],
  setcode: [],
  id: []
};

var lowestCardPrice
var mainDeckDuplicates 
var extraDeckDuplicates
var sideDeckDuplicates
var deckInfo
var deckInfo_table



function loadDeckPricer() {
  console.log("load deck pricer");
  window.location.hash = `/deckPricer`
  clearScreen();

  // subContent1.innerHTML = ` <h2>${deckPricer_chooseDeck}</h2> 
  // <input type="file" id="file-input" class="form-control-file" />
  // <pre id="contenido-archivo"></pre>
  //         `;

  subContentDeckPricer.innerHTML=`
  <h2>${deckPricer_chooseDeck}</h2> 
  <input type="file" id="file-input" class="form-control-file" />
  <pre id="contenido-archivo"></pre>

  <h3>${deckPricer_dropkYdk}</h3>
  <div id="deck">
    <div id="deck_creator"></div>
    <hr>
    <h2>${deckPricer_mainDeck}</h2>
    <div id="deck_main"></div>
    <hr>
    <h2>${deckPricer_extraDeck}</h2>
    <div id="deck_extra"></div>
    <hr>
    <h2>${deckPricer_sideDeck}</h2>
    <div id="deck_side"></div>
  </div>
  <button type="button" class="btn btn-secondary btn-lg btn-block blackButton" onclick="searchLowestPrices()" >${deckPricer_button}</button>
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


  lowestPriceForDeck = {
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
  };

  deckInfo = document.getElementById("deck_info")
  deckInfo.innerHTML=  `  
  <table class="table table-hover" >
    <thead>
      <tr>
        <th scope="col">${deckPricer_card}</th>
        <th scope="col">${deckPricer_rarity}</th>
        <th scope="col">${deckPricer_setCode}</th>
        <th scope="col">${deckPricer_lowestPrice}</th>
      </tr>
    </thead>
    <tbody id='deckInfo_table'>
  </tbody> `
  deckInfo_table = document.getElementById("deckInfo_table")
  deckInfo_table.innerHTML+= `
  <tr style="background-color: black; color:white">
    <td>MAIN DECK</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  
   `
  searchLowestDeckValue(deck.mainDeck)
  deckInfo_table.innerHTML+= `
  <tr style="background-color: black; color:white">
    <td>EXTRA DECK</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
   `
  searchLowestDeckValue(deck.extraDeck)
  deckInfo_table.innerHTML+= `
  <tr style="background-color: black; color:white">
    <td>SIDE DECK</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
   `
  searchLowestDeckValue(deck.sideDeck)
  let totalprice = 0
  let decktotalprice = 0
  let extradecktotalprice = 0
  let sidedecktotalprice = 0
  
  console.log()
  decktotalprice = lowestPriceForDeck.mainDeck.reduce((a, b) => a + b, 0);
  extradecktotalprice = lowestPriceForDeck.extraDeck.reduce((a, b) => a + b, 0);
  sidedecktotalprice = lowestPriceForDeck.sideDeck.reduce((a, b) => a + b, 0);
  totalprice = decktotalprice+extradecktotalprice+sidedecktotalprice
  deckInfo_table.innerHTML+= `
  <tr style="background-color: black">
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
   `  
   deckInfo_table.innerHTML+= `
   <tr>
     <td>${deckPricer_tp}${deckPricer_mainDeck} : </td>
     <td></td>
     <td></td>
     <td>$${decktotalprice.toFixed(2)}</td>
   </tr>
    `  
   deckInfo_table.innerHTML+= `
   <tr>
     <td>${deckPricer_tp}${deckPricer_extraDeck} : </td>
     <td></td>
     <td></td>
     <td>$${extradecktotalprice.toFixed(2)}</td>
   </tr>
    `
    deckInfo_table.innerHTML+= `
    <tr>
      <td>${deckPricer_tp}${deckPricer_sideDeck} : </td>
      <td></td>
      <td></td>
      <td>$${sidedecktotalprice.toFixed(2)}</td>
    </tr>
     `

     deckInfo_table.innerHTML+= `
     <tr>
       <td>${deckPricer_tp}${deckPricer_deck} : </td>
       <td></td>
       <td></td>
       <td>$${totalprice.toFixed(2)}</td>
     </tr>
      `
 

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


          deckCreator.innerHTML=`
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
            results.data.sort( sortByType );
            for (var b = 0; b < results.data.length; b++) {
              createDeck(results.data[b],where);
              pushToDeck(modifyDeckArray,b)
              for (var c = 1; c < checkDuplicates[results.data[b].id]; c++) { 
                    createDeckDuplicate(results.data[b],where);
                    pushToDeck(modifyDeckArray,b)
              
                
              }

              // if (checkDuplicates[results.data[b].id] > 1 ){
              //  console.log("Duplicate here!")

              // }
            }
            });

          })();

          deck.mainDeck.sort( sortByType );
          deck.extraDeck.sort( sortByType );
          deck.sideDeck.sort( sortByType );

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
  deckInfo_table = document.getElementById("deckInfo_table")

  if (value == deck.mainDeck ) {
    

    for (let b = 0 ; b < deck.mainDeck.length ; b++ ){
      lowestCardPriceRaw = {
        name: [],
        rarity:[],
        rarity_code: [],
        price: [],
        set: [],
        setcode: [],
        id: []
      };

      lowestCardPrice = []

    if (deck.mainDeck[b].card_sets == undefined ) {
        // console.log("not printed yet")
        lowestPriceForDeck.mainDeck.push(0)
     } else {

    for ( let i = 0 ; i < deck.mainDeck[b].card_sets.length ; i++) { 
    
      if (deck.mainDeck[b].card_sets[i].set_price == 0 || deck.mainDeck[b].card_sets[i].set_rarity == "Collector's Rare" || deck.mainDeck[b].card_sets[i].set_rarity == "Ultimate Rare"){ 
        // console.log("set price  = 0") 
        continue
       } else {
      
        lowestCardPrice.push(Number.parseFloat(deck.mainDeck[b].card_sets[i].set_price))

       }
    }

    for ( let i = 0 ; i < deck.mainDeck[b].card_sets.length ; i++) { 
      if (deck.mainDeck[b].card_sets[i].set_price == Math.min(...lowestCardPrice) ){ 
          // console.log("this set is the cheapest "+ JSON.stringify(deck.mainDeck[b].card_sets[i]) )
          lowestCardPriceRaw.name.push(deck.mainDeck[b].name)
          lowestCardPriceRaw.rarity.push(deck.mainDeck[b].card_sets[i].set_rarity)
          lowestCardPriceRaw.rarity_code.push(deck.mainDeck[b].card_sets[i].set_rarity_code)
          lowestCardPriceRaw.price.push(Number.parseFloat(deck.mainDeck[b].card_sets[i].set_price))
          lowestCardPriceRaw.set.push(deck.mainDeck[b].card_sets[i].set_name)
          lowestCardPriceRaw.setcode.push(deck.mainDeck[b].card_sets[i].set_code)
          lowestCardPriceRaw.id.push(deck.mainDeck[b].id)
      }
    }
    

    }
    if (Math.min(...lowestCardPrice)  == Infinity ) {
      // console.log(Math.min(...lowestCardPrice))
      lowestPriceForDeck.mainDeck.push(0)
    } else {
    lowestPriceForDeck.mainDeck.push(Math.min(...lowestCardPrice))
     }
    deckInfo_table.innerHTML+= `
    <tr data-toggle="modal" data-target="#ModalID${deck.mainDeck[b].id}">
      <td>${deck.mainDeck[b].name}</td>
      <td>${lowestCardPriceRaw.rarity_code}</td>
      <td>${lowestCardPriceRaw.setcode}</td>
      <td>$${lowestPriceForDeck.mainDeck[b]}</td>
    </tr>
    
     `

    
    
}


    } else if ( value == deck.extraDeck){
      
      for (let b = 0 ; b < deck.extraDeck.length ; b++ ){
        lowestCardPriceRaw = {
          name: [],
          rarity:[],
          rarity_code: [],
          price: [],
          set: [],
          setcode: [],
          id: []
        };

        lowestCardPrice = []

      if (deck.extraDeck[b].card_sets == undefined ) {
          // console.log("not printed yet")
          lowestPriceForDeck.extraDeck.push(0)
       } else {

      for ( let i = 0 ; i < deck.extraDeck[b].card_sets.length ; i++) { 
      
        if (deck.extraDeck[b].card_sets[i].set_price == 0 || deck.extraDeck[b].card_sets[i].set_rarity == "Collector's Rare" || deck.extraDeck[b].card_sets[i].set_rarity == "Ultimate Rare"){ 
          // console.log("set price  = 0") 
          continue
         } else {
        
          lowestCardPrice.push(Number.parseFloat(deck.extraDeck[b].card_sets[i].set_price))

         }
      }

      for ( let i = 0 ; i < deck.extraDeck[b].card_sets.length ; i++) { 
        if (deck.extraDeck[b].card_sets[i].set_price == Math.min(...lowestCardPrice) ){ 
            // console.log("this set is the cheapest "+ JSON.stringify(deck.mainDeck[b].card_sets[i]) )
            lowestCardPriceRaw.name.push(deck.extraDeck[b].name)
            lowestCardPriceRaw.rarity.push(deck.extraDeck[b].card_sets[i].set_rarity)
            lowestCardPriceRaw.rarity_code.push(deck.extraDeck[b].card_sets[i].set_rarity_code)
            lowestCardPriceRaw.price.push(Number.parseFloat(deck.extraDeck[b].card_sets[i].set_price))
            lowestCardPriceRaw.set.push(deck.extraDeck[b].card_sets[i].set_name)
            lowestCardPriceRaw.setcode.push(deck.extraDeck[b].card_sets[i].set_code)
            lowestCardPriceRaw.id.push(deck.extraDeck[b].id)
        }
      }

      }
      if (Math.min(...lowestCardPrice)  == Infinity ) {
        // console.log(Math.min(...lowestCardPrice))
        lowestPriceForDeck.extraDeck.push(0)
      } else {
      lowestPriceForDeck.extraDeck.push(Math.min(...lowestCardPrice))
       }
      deckInfo_table.innerHTML+= `
      <tr data-toggle="modal" data-target="#ModalID${deck.extraDeck[b].id}">
        <td>${deck.extraDeck[b].name}</td>
        <td>${lowestCardPriceRaw.rarity_code}</td>
        <td>${lowestCardPriceRaw.setcode}</td>
        <td>$${lowestPriceForDeck.extraDeck[b]}</td>
      </tr>
      
       `

      
      
  }


      } else if ( value == deck.sideDeck){

        for (let b = 0 ; b < deck.sideDeck.length ; b++ ){
          lowestCardPriceRaw = {
            name: [],
            rarity:[],
            rarity_code: [],
            price: [],
            set: [],
            setcode: [],
            id: []
          };

          lowestCardPrice = []

        if (deck.sideDeck[b].card_sets == undefined ) {
            // console.log("not printed yet")
            lowestPriceForDeck.sideDeck.push(0)
         } else {

        for ( let i = 0 ; i < deck.sideDeck[b].card_sets.length ; i++) { 
        
          if (deck.sideDeck[b].card_sets[i].set_price == 0 || deck.sideDeck[b].card_sets[i].set_rarity == "Collector's Rare" || deck.sideDeck[b].card_sets[i].set_rarity == "Ultimate Rare"){ 
            // console.log("set price  = 0") 
            continue
           } else {
          
            lowestCardPrice.push(Number.parseFloat(deck.sideDeck[b].card_sets[i].set_price))

           }
        }

        for ( let i = 0 ; i < deck.sideDeck[b].card_sets.length ; i++) { 
          if (deck.sideDeck[b].card_sets[i].set_price == Math.min(...lowestCardPrice) ){ 
              // console.log("this set is the cheapest "+ JSON.stringify(deck.mainDeck[b].card_sets[i]) )
              lowestCardPriceRaw.name.push(deck.sideDeck[b].name)
              lowestCardPriceRaw.rarity.push(deck.sideDeck[b].card_sets[i].set_rarity)
              lowestCardPriceRaw.rarity_code.push(deck.sideDeck[b].card_sets[i].set_rarity_code)
              lowestCardPriceRaw.price.push(Number.parseFloat(deck.sideDeck[b].card_sets[i].set_price))
              lowestCardPriceRaw.set.push(deck.sideDeck[b].card_sets[i].set_name)
              lowestCardPriceRaw.setcode.push(deck.sideDeck[b].card_sets[i].set_code)
              lowestCardPriceRaw.id.push(deck.sideDeck[b].id)
          }
        }

        }
        if (Math.min(...lowestCardPrice)  == Infinity ) {
          // console.log(Math.min(...lowestCardPrice))
          lowestPriceForDeck.sideDeck.push(0)
        } else {
        lowestPriceForDeck.sideDeck.push(Math.min(...lowestCardPrice))
         }
        deckInfo_table.innerHTML+= `
        <tr data-toggle="modal" data-target="#ModalID${deck.sideDeck[b].id}">
          <td>${deck.sideDeck[b].name}</td>
          <td>${lowestCardPriceRaw.rarity_code}</td>
          <td>${lowestCardPriceRaw.setcode}</td>
          <td>$${lowestPriceForDeck.sideDeck[b]}</td>
        </tr>
        
         `
       
    }

        }


}


function sortByType( a, b ) {
  if ( a.type < b.type ){
    return -1;
  }
  if ( a.type > b.type ){
    return 1;
  }
  return 0;
}

