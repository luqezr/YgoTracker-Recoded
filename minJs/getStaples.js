function getStaples(e,t){clearScreen(),resetMoreResults(),window.location.hash="/staples",subContent2.innerHTML=`\n    <div id='wait'>\n    <img src="/media/wait/wait_staples.gif" alt="Wait" style="width: '400px'"> \n    <br>\n    <h3>${searchingText}</h3>\n    </div>\n    `,fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes&misc=yes").then(e=>e.json()).then(t=>{for(results=t,clearScreen(),subContent1.innerHTML=e,b=0;b<resultsPerPage;b++){if(b>=t.data.length)return void console.log("No more cards!");whatType(t.data[b])}})}