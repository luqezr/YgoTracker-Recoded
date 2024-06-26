

async function resolveURL() {

    currentURL = window.location.hash
    host = window.location.host + '/'
    fullURL = host + currentURL
    pathname = window.location.pathname
    hash = window.location.hash

    banlist="tcg"

   
    view = readLocalStorage("view");
    console.log("view = "+view)

    if (view > 3){
        view=1
        save2localStorage("view", view);
    } else if (view==1) {
        whatType = createCard
        scrollingValue = 6000
        console.log("Normal view set as default")
      } else if (view==2) {
        whatType = createMiniCard
        scrollingValue = 1000
        console.log("Mini Card view set as default")
      } else if (view==3) {
        whatType = createDeck
        scrollingValue = 10
        console.log("deck view set as default")
        resultsPerPage = 40
        loadThisManyCards = 30
        loadedCards = resultsPerPage
      }




    if (currentURL == '') {
        await searchNewCards(newCards_H1)
    }


    if (hash.includes('search')) {

        // var res = hash.slice(9); //corta #/search/
        var searchedValue = hash.slice(9);
        await searchCards(searchedValue, searchedCards_H1_1, searchedCards_H1_2, noResultsWhenSearch_H1, noResultsWhenSearch_H2)
    }


    if (hash.includes('archetype/')) {

        // var res = hash.slice(12); //corta #/archetype/
        var searchedValue = hash.slice(12);
        await getCardsOfArchetype(searchedValue, searchingText, getCardArchetype_H1);
    }

    if (hash.includes('setcode/')) {

        // var res = hash.slice(10); //corta #/setcode/
        var searchedValue = hash.slice(10);
        await getCardBySetCode(searchedValue)
    }

    if (hash.includes('set/')) {

        // var res = hash.slice(6); //corta #/set/
        var searchedValue = hash.slice(6);

	    setName = searchedValue.replace(/%20/g," ");
        // console.log(searchedValue)
        await getCardBySet(setName,searchingText,getSetCards_H1)
    }

    if (hash.includes('customList')) {
        console.log("Load Custom List")
        var searchedValue = hash.slice(13);
        separador = "&"
        cardsToSearch = searchedValue.split(separador);
        customList = cardsToSearch
        console.log(customList)
        // getCustomList()


        
        createListTable()
        
       for (var b = 0; b < (cardsToSearch.length-1); b++) {

        await fetch("https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=" + cardsToSearch[b])
                .then(cardInfo => cardInfo.json())
                .then(data => {
                    results = data
                    console.log(results)
                    createList(results)

                })
        };


    }

    if (hash.includes('cardID')) {


        // var res = hash.slice(9); //corta #/cardID/
        var searchedValue = hash.slice(9);
        // console.log(searchedValue)
        await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + searchedValue)
            .then(cardInfo => cardInfo.json())
            .then(data => {
                results = data
                cardResults.innerHTML = '';
                // console.log(results)
                whatType(results.data[0])

            })
    }



    switch (currentURL) {
        case `#/newCards`:
            console.log("/newCards")
            await searchNewCards(newCards_H1)
            break;
        case ``:
            console.log("nothing")
            if (pathname == 'index.html') {
                await searchNewCards(newCards_H1)
            }
            break;

            
        case `#/advancedMode`:
            console.log("#/advancedMode")
            
            await searchNewCards(newCards_H1)
                
            break;


        case `#/search`:
            console.log("/#/newCards")
            await searchNewCards(newCards_H1)
            break;

        case `#/allSets`:
            console.log("/#/allSets")
            await getAllSets(getAllSets_H1_1,getAllSets_H1_2)
            break;

        case `#/setCode`:
            console.log("/#/setCode")
            await getCardBySetCode(cardvalue)
            //    getAllArchetypes()
            break;
        case `#/set`:
            console.log("/#/setName")
            
            //  getAllArchetypes()
            break;
            
        case `#/about`:
            console.log("/#/about")
            loadAbout()
            //  getAllArchetypes()
            break;

        case `#/archetypes`:
            console.log("/#/archetypes")
            await getAllArchetypes(getAllArchetypes_H1_1,getAllArchetypes_H1_2)
            break;

        case `#/getByArchetype`:
            console.log("/#/archetype")
            await getAllArchetypes(getAllArchetypes_H1_1,getAllArchetypes_H1_2)
            break;

        case `#/randomCards`:
            console.log("/#/randomCards")
            await fetchxRandomCards(resultsPerPage, randomCards_H1)
            break;
        case `#/staples`:
            console.log("/#/staples")
            await getStaples(getStaples_H1_1)
            break;

        case `#/format/tcg`:
            console.log("/#/format/tcg")
            Urlformat='tcg'
            await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;

        case `#/format/goat`:
            console.log("/#/format/goat")
            Urlformat='goat'
            await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;
        case `#/format/ocg%20goat`:
            console.log("/#/ocg%20goat")
            Urlformat='ocg goat'
            await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;
        case `#/format/rush%20duel`:
            console.log("/#/format/rush%duel")
            Urlformat = 'rush duel'
            await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;
        case `#/format/speed%20duel`:
            console.log("/#/format/speed%20duel")
            Urlformat='speed duel'
            await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;
        case `#/format/duel%20links`:
            console.log("/#/format/duel%20links")
            Urlformat='duel links'
            await getByFormat(Urlformat,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)

            break;

        case `#/banlist/tcg`:
            console.log("#/banlist/tcg")
            urlBanlist= 'tcg'
            await getBanlist(urlBanlist, getBanlist_H1_1 ,getBanlist_H1_2,getBanlist_H1_3)

            
            break;
        case `#/banlist/ocg`:
            console.log("/#/banlist/ocg")
            urlBanlist= 'ocg'
            await getBanlist(urlBanlist, getBanlist_H1_1 ,getBanlist_H1_2,getBanlist_H1_3)

            break;
        case `#/banlist/goat`:
            console.log("/#/banlist/goat")
            urlBanlist= 'goat'
            await getBanlist(urlBanlist, getBanlist_H1_1 ,getBanlist_H1_2,getBanlist_H1_3)

            break;

        case `#/deckPricer`:
            console.log("deck pricer")
            await loadDeckPricer()

            break;
    
    }


}

resolveURL()