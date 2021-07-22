function getCardSetCode(e) {
    e = e || window.event;
    e = e.target || e.srcElement;
    // console.log("cardID:" + e.id);
    cardSetCode = e.id;
    getCardBySetCode(cardSetCode);
  }
  
  function getCardBySetCode(cardSetCode,textValue1) {
    clearScreen()
    resetMoreResults()
    // console.log("Get card by set code");
    window.location.hash = `/setcode/${cardSetCode}`;

    subContent2.innerHTML= `
    <div id='wait'>
    <img src="/media/wait/wait_.gif" alt="Wait" style="width: '400px'"> 
    <br>
    <h3>${textValue1}</h3>
    </div>
    `;


    function getYgopricesPrice(cardId) {
          var request = new XMLHttpRequest();
      
          request.open(
            "GET",
             `http://yugiohprices.com/api/price_for_print_tag/${cardSetCode}`
            //  `https://private-anon-2d909a8f25-yugiohprices.apiary-mock.com/api/price_for_print_tag/${cardSetCode}`
            // `https://private-anon-2d909a8f25-yugiohprices.apiary-proxy.com/api/price_for_print_tag/${cardSetCode}`
            
          );
      
          request.onreadystatechange = function () {
            if (this.readyState === 4) {
              // console.log('Status:', this.status);
              // console.log('Headers:', this.getAllResponseHeaders());
              // console.log('Body:', this.responseText);
              yugiohPricesResult = JSON.parse(this.responseText);
      
              // console.log(yugiohPricesResult.data);
              // console.log(yugiohPricesResult.data.price_data.name);
              // console.log(yugiohPricesResult.data.price_data.price_data.data.prices)
          
            }
          };
          // console.log(yugiohPricesResult)
          request.send();

      
    }


    getYgopricesPrice();

    

    fetch(
      "https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=" +
        cardSetCode +
        "&misc=yes"
    )
      .then((cardInfo) => cardInfo.json())
      .then((data) => {
        results = data;
        console.log(results);
        cardName = results.name;
  
        // createCard(data)
  
        // moreSetCardsButton.classList.remove("d-none");
      });
  
    setTimeout(function () {
      fetch(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
          cardName +
          "&misc=yes"
      )
        .then((cardInfo) => cardInfo.json())
        .then((data) => {
          //console.log(data);
          clearScreen()
          results = data;
          console.log(results);
          console.log(results.data[0])
          whatType(results.data[0]);
          
          modifyPriceList(yugiohPricesResult.data.price_data.price_data.data.prices,yugiohPricesResult.data.price_data.name);
        });
    }, 1500);

    // setTimeout(function () {getCardSupport(results.data[0].name)}, 2000);
    
  }
  




