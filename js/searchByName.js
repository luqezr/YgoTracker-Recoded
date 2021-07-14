var searchButton = document.getElementById("send")


searchButton.addEventListener("click", function getCard(evt) {
  evt.preventDefault();
    // window.location.hash = `/search/${cardName}`;
    var cardName = document.search.fname.value;
    console.log("Searching : "+cardName)
    searchCards(cardName, searchedCards_H1_1, searchedCards_H1_2, noResultsWhenSearch_H1, noResultsWhenSearch_H2)

})


function searchCards(cardName, textValue1,textValue2,textValue3,textValue4) {
  fetch(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=" +
      cardName +
      "&misc=yes"
  )
    .then((cardInfo) => cardInfo.json())
    .then((data) => {
      results = data;
      console.log(results)
      subContent1.innerHTML = `<h2>${textValue1} ${results.data.length} ${textValue2}</h2>`;
      subContent2.innerHTML = "";
      for (let b = 0; b <= resultsPerPage; b++) {
        // console.log(results.data[b])
        createCard(results.data[b]);
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

