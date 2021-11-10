

async function searchNewCards(value1,value2){


    clearScreen()
    resetMoreResults()
    // console.log("searching new cards...")
    window.location.hash = '/newCards'

    // subContent2.innerHTML= `
    // <div id='wait'>
    // <img src="/media/wait/wait_newCards.gif" alt="Wait" style="width: '400px'"> 
    // <br>
    // <h3>${searchingText}</h3>
    // </div>
    // `;
   await fetch("https://db.ygoprodeck.com/api/newcards.php")
    .then( cardInfo => cardInfo.json() )
    .then(data => {		
        clearScreen()
        results=data
        newCardsResults=data
        fetchInfo=true;

        subContent1.innerHTML= `${value1}`;
        for (var b = 0; b < 20 ; b++) {
            let card = [data[0][b]]
            //console.log(card)
            //console.log(card[0])
           whatType(card[0])
        }
        
       
	if (fetchinfo = true ){
         
         (async function(){
            getAllCards()
        })();
		// console.log('fetchinfo='+fetchinfo)
        }
        
        });
    


    }


async function getAllCards(){
    await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?&misc=yes&sort=new")
    .then( cardInfo => cardInfo.json() )
    .then(data => {		
        //console.log(data)
        data=data
        // results = data;
        allCards = data;
        // console.log(results)
        searchCardNamesForAutocomplete()
     });
     
}