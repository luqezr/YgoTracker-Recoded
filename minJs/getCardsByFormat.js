function wichFormat(t){t=t||window.event,t=t.target||t.srcElement,format=t.id,getByFormat(format,getByFormat_H1_1,getByFormat_H1_2,getByFormat_H1_3)}function getByFormat(t,e,a,r){clearScreen(),resetMoreResults(),window.location.hash=`/format/${t}`,subContent2.innerHTML=`\n     <div id='wait'>\n     <img src="/media/wait/wait_format.gif" alt="Wait" style="width: '400px'"> \n     <br>\n     <h3>${searchingText}</h3>\n     </div>\n     `,fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?format=${t}&misc=yes`).then(t=>t.json()).then(n=>{for(allResults=n,results=n,t=t.toUpperCase(),clearScreen(),subContent1.innerHTML=`${e}${n.data.length}${a}${t}${r}`,toggleAdvancedMode(),b=0;b<resultsPerPage;b++){if(b>=n.data.length)return void console.log("No more cards!");whatType(results.data[b])}})}