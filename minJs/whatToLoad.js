async function resolveURL(){if(currentURL=window.location.hash,host=window.location.host+"/",fullURL=host+currentURL,pathname=window.location.pathname,hash=window.location.hash,banlist="tcg",await getAllCards(),view=readLocalStorage("view"),console.log("view = "+view),view>3?(view=1,save2localStorage("view",view)):1==view?(whatType=createCard,scrollingValue=6e3,console.log("Normal view set as default")):2==view?(whatType=createMiniCard,scrollingValue=1e3,console.log("Mini Card view set as default")):3==view&&(whatType=createDeck,scrollingValue=10,console.log("deck view set as default"),resultsPerPage=40,loadThisManyCards=30,loadedCards=resultsPerPage),""==currentURL&&await searchNewCards(newCards_H1),hash.includes("search")){var e=hash.slice(9);await searchCards(e,searchedCards_H1_1,searchedCards_H1_2,noResultsWhenSearch_H1,noResultsWhenSearch_H2)}if(hash.includes("archetype/")){e=hash.slice(12);await getCardsOfArchetype(e,searchingText,getCardArchetype_H1)}if(hash.includes("setcode/")){e=hash.slice(10);await getCardBySetCode(e)}if(hash.includes("set/")){e=hash.slice(6);setName=e.replace(/%20/g," "),await getCardBySet(setName,searchingText,getSetCards_H1)}if(hash.includes("customList")){console.log("Load Custom List");e=hash.slice(13);separador="&",cardsToSearch=e.split(separador),customList=cardsToSearch,console.log(customList),createListTable();for(var a=0;a<cardsToSearch.length-1;a++)await fetch("https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode="+cardsToSearch[a]).then(e=>e.json()).then(e=>{results=e,console.log(results),createList(results)})}if(hash.includes("cardID")){e=hash.slice(9);await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id="+e).then(e=>e.json()).then(e=>{results=e,cardResults.innerHTML="",whatType(results.data[0])})}switch(currentURL){case"#/newCards":console.log("/newCards"),await searchNewCards(newCards_H1);break;case"":console.log("nothing"),"index.html"==pathname&&await searchNewCards(newCards_H1);break;case"#/advancedMode":console.log("#/advancedMode"),await searchNewCards(newCards_H1);break;case"#/search":console.log("/#/newCards"),await searchNewCards(newCards_H1);break;case"#/allSets":console.log("/#/allSets"),await getAllSets(getAllSets_H1_1,getAllSets_H1_2);break;case"#/setCode":console.log("/#/setCode"),await getCardBySetCode(cardvalue);break;case"#/set":console.log("/#/setName");break;case"#/about":console.log("/#/about"),loadAbout();break;case"#/archetypes":console.log("/#/archetypes"),await getAllArchetypes(getAllArchetypes_H1_1,getAllArchetypes_H1_2);break;case"#/getByArchetype":console.log("/#/archetype"),await getAllArchetypes(getAllArchetypes_H1_1,getAllArchetypes_H1_2);break;case"#/randomCards":console.log("/#/randomCards"),await fetchxRandomCards(resultsPerPage,randomCards_H1);break;case"#/staples":console.log("/#/staples"),await getStaples(getStaples_H1_1);break;case"#/format/tcg":console.log("/#/format/tcg"),Urlformat="tcg",await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3);break;case"#/format/goat":console.log("/#/format/goat"),Urlformat="goat",await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3);break;case"#/format/ocg%20goat":console.log("/#/ocg%20goat"),Urlformat="ocg goat",await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3);break;case"#/format/rush%20duel":console.log("/#/format/rush%duel"),Urlformat="rush duel",await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3);break;case"#/format/speed%20duel":console.log("/#/format/speed%20duel"),Urlformat="speed duel",await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3);break;case"#/format/duel%20links":console.log("/#/format/duel%20links"),Urlformat="duel links",await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3);break;case"#/banlist/tcg":console.log("#/banlist/tcg"),urlBanlist="tcg",await getBanlist(urlBanlist,getBanlist_H1_1,getBanlist_H1_2,getBanlist_H1_3);break;case"#/banlist/ocg":console.log("/#/banlist/ocg"),urlBanlist="ocg",await getBanlist(urlBanlist,getBanlist_H1_1,getBanlist_H1_2,getBanlist_H1_3);break;case"#/banlist/goat":console.log("/#/banlist/goat"),urlBanlist="goat",await getBanlist(urlBanlist,getBanlist_H1_1,getBanlist_H1_2,getBanlist_H1_3);break;case"#/deckPricer":console.log("deck pricer"),await loadDeckPricer()}}resolveURL();