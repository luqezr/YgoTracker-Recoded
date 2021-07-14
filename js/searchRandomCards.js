
function fetchxRandomCards(howManyToFetch,value1,value2){

//    window.location.hash = '/randomCards'

    subContent1.innerHTML= `${value1}`
    subContent2.innerHTML= ''
    howManyToFetch = resultsPerPage
    results=[]
    results[0]=[]
    for (var i = 0; i < howManyToFetch; i++) {
        searchRandomCards()
     }
    return 
}


function searchRandomCards(where){
            
   
    where="https://db.ygoprodeck.com/api/v7/randomcard.php"
    fetch(where)
    .then( cardInfo => cardInfo.json())
    .then(data => {
        //console.log(data)
        results[0].push(data)
        createCard(data)
        fetchRandom=true;
        
})};

function getMoreRandomCards(){
    let x = 10
    for (var i = 0; i < x; i++) {
    searchRandomCards()
     }
    
     
    return 
}

 

