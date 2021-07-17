
  
  function getCardSupport(cardSetCode) {

    // window.location.hash = `/setcode/${cardSetCode}`;
  
    function getSupportForCard(cardId) {
      var request = new XMLHttpRequest();
  
      request.open(
        "GET",
        `http://yugiohprices.com/api/card_support/${cardSetCode}`
      );
  
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          // console.log('Status:', this.status);
          // console.log('Headers:', this.getAllResponseHeaders());
          // console.log('Body:', this.responseText);
          yugiohPricesResult = JSON.parse(this.responseText);
  
          console.log(yugiohPricesResult);
       
        }
      };
      // console.log(yugiohPricesResult)
      request.send();




      
    }

    getSupportForCard();
    setTimeout(function () {

      for (var b = 0; b < yugiohPricesResult.length; b++) {
      // console.log(yugiohPricesResult[b])
      getSupportCards(yugiohPricesResult[b])
      // createCard(yugiohPricesResult[b])
   }
    
  }, 2000);

    
  }
  
  
  function getSupportCards(cards){
    fetch(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
        cards +
        "&misc=yes"
    )
      .then((cardInfo) => cardInfo.json())
      .then((data) => {
        results = data;
        console.log(results);
        cardName = results.name;
  
        createMiniCards(results.data[0])
  
      });
  }