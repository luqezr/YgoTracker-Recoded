function getCardSupport(e){function t(t){var s=new XMLHttpRequest;s.open("GET",`http://yugiohprices.com/api/card_support/${e}`),s.onreadystatechange=function(){4===this.readyState&&(yugiohPricesResult=JSON.parse(this.responseText),console.log(yugiohPricesResult))},s.send()}t(),setTimeout(function(){for(var e=0;e<yugiohPricesResult.length;e++)getSupportCards(yugiohPricesResult[e])},2e3)}function getSupportCards(e){fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?name="+e+"&misc=yes").then(e=>e.json()).then(e=>{results=e,console.log(results),cardName=results.name,createMiniCards(results.data[0])})}