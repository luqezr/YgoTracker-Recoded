

function searchNewCards(value1,value2){

    console.log("searching new cards...")
    // window.location.hash = '/newCards'

    fetch("https://db.ygoprodeck.com/api/newcards.php")
    .then( cardInfo => cardInfo.json() )
    .then(data => {		
        results=data
        newCardsResults=data
        fetchInfo=true;
        subContent1.innerHTML= `${value1}`;
        //console.log(data)
        subContent2.innerHTML = '';
        for (var b = 0; b < 20 ; b++) {
            let card = [data[0][b]]
            //console.log(card)
            //console.log(card[0])
            createCard(card[0])
        }
        
       
	if (fetchinfo = true ){
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?&misc=yes&sort=new")
        .then( cardInfo => cardInfo.json() )
        .then(data => {		
			//console.log(data)
			data=data
			results = data;
			// console.log(results)
		 });
		 
		
		// console.log('fetchinfo='+fetchinfo)
        }
        
    });



    }


        
function getMoreNewCards(){
        
    if (newCards == true){

        fetchRandom=false;
        moreFilteredResults = false;
       
    
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?&misc=yes&sort=new")
        .then( cardInfo => cardInfo.json() )
        .then(data => {		
            //console.log(data)
            results = data;
    
            /*
            setsFilterBar.innerHTML= ` 
            <span onclick='wichBanlistButton(this.id)'> <a href="#" value="Banned" id="Banned"> Banned </a> </span>
            <span onclick='wichBanlistButton(this.id)'> <a href="#" value="Limited" id="Limited"> Limited </a> </span>
            <span onclick='wichBanlistButton(this.id)'> <a href="#" value="Semi-Limited" id="Semi-Limited"> Semi-Limited </a> </span>
            `
            */
            for (var b = 0; b < resultsPerPage ; b++) {
                createCard(results.data[b])}
                
            
         
        }
        );
        }


        
    var moreResults = loadedCards+loadThisManyCards;
    for (b = loadedCards; b < moreResults ; b++) {
        if (b >= results.data.length){
            console.log('No more cards!');
            moreNewCardsButton.classList.add("d-none");
            return} 
        else {
        createCard(results.data[b])
        loadedCards++
        }
    }
    
}