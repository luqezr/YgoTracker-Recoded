var searchButton = document.getElementById("send")


searchButton.addEventListener("click", function getCard(evt) {
  evt.preventDefault();
    var cardName = document.search.fname.value;

    // console.log("Searching : "+cardName)
    resetMoreResults()
    searchCards(cardName, searchedCards_H1_1, searchedCards_H1_2, noResultsWhenSearch_H1, noResultsWhenSearch_H2)

})


function searchCards(cardName, textValue1,textValue2,textValue3,textValue4) {
  

  clearScreen()

  window.location.hash = `/search/${cardName}`;


  subContent2.innerHTML= `
  <div id='wait'>
  <img src="/media/wait/wait0.gif" alt="Wait" style="width: '400px'"> 
  <br>
  <h3>${searchingText}</h3>
  </div>
  `;


  fetch(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=" +
      cardName +
      "&misc=yes"
  )
    .then((cardInfo) => cardInfo.json())
    .then((data) => {
      results = data;
      // console.log(results)
      
    clearScreen()
    
      subContent1.innerHTML = `<h2>${textValue1} ${results.data.length} ${textValue2}</h2>`;
      for (let b = 0; b <= resultsPerPage; b++) {
        // console.log(results.data[b])
        whatType(results.data[b]);
      }
      if (results.data.length == undefined) {
        //console.log(data)
        subContent1.innerHTML = `<h2>${textValue3}</h2>`;
        subContent2.innerHTML = `
                      <div id='wait'>
                      <img src="/img/error.gif" alt="Wait" style="width: '400px'">
                      <br>
                      <h3>${textValue4}</h3>
                      </div>
                      `;
      }
    });
}

