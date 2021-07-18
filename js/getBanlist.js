function wichBanlist(e){
	e = e || window.event;
	e = e.target || e.srcElement
	//console.log('Banlist for : ' +e.id)
	banlist = e.id
    

    getBanlist(banlist, getBanlist_H1_1 ,getBanlist_H1_2,getBanlist_H1_3)
    
    }


function wichBanlistButton(e){
	e = e || window.event;
	e = e.target || e.srcElement
    banlistButton = e.id
    
   filteredResults= results.data.filter(function(card){result.includes(banlistButton)})

    // console.log('banlistButton hitted, value ='+ banlistButton+'/ banlist value ='+ banlist)

    var filteredBanlist = results.data.filter(result => banlist == `${banlistButton}`);

    // console.log(filteredBanlist)
    // console.log(results.data.filter(result => banlist == `${banlistButton}`))

    }




function getBanlist(cardvalue,textValue1,textValue2,textValue3){


    clearScreen()
    resetMoreResults()

    // window.location.hash = `/banlist/${cardvalue}`

    var banlist = cardvalue

    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist="+banlist+"&misc=yes")
    .then( cardInfo => cardInfo.json() )
    .then(data => {		
        //console.log(data)
        results = data;
        currentBanlist = data

        banlist = banlist.toUpperCase()


        subContent1.innerHTML= `${textValue1}${results.data.length}${textValue2}${banlist}${textValue3}</a></span> `;


        for (var b = 0; b < resultsPerPage ; b++) {
            createCard(data.data[b])}
            
    }
    );



    }




    