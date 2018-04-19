const apiKey = 'b0a2d8afc71c5ed8bb42bdd90dae9c29';
$(document).ready(function() {
  const apiKey = 'b0a2d8afc71c5ed8bb42bdd90dae9c29';
 
  $('#a').on('click', function() {
    document.querySelector('.loading-container').classList.remove('hidden');
    $.ajax({
      url: "https://api-2445582011268.apicast.io/games/count",
      type: "GET",
      headers: {
        'user-key': apiKey,
        'Accept': 'application/json',
      },
      success: function(games) {
        let gameCount = games.count;
        let gameNumber = Math.floor((Math.random() * gameCount) + 1);
        $.ajax({
          url: "https://api-2445582011268.apicast.io/games/" + gameNumber,
          type: "GET",
          headers: {
            'user-key': apiKey,
            'Accept': 'application/json',
          },
          success: function(response) {
            displayPlatformsRequests(response);
           
            let gname = document.createElement('h1');
            let gcover = document.createElement('img');
            let gsummary = document.createElement('p');
            let container = document.createElement('div');
            let platformContainerD = document.createElement('div');

              container.classList.add('container');
              gname.classList.add('title');
              gsummary.classList.add('p-base');
              gcover.classList.add('picture');
              platformContainerD.classList.add('platformContainer');
 
            if (document.querySelectorAll('#rip').length > 0) {
              let id = document.getElementById('rip')
              id.remove('div');
            }
            container.setAttribute('id', "rip")
 
            // CSS classes
            container.classList.add('game1')
            gname.classList.add('game-title');
            gcover.classList.add('cover')
            gsummary.classList.add('yellow_summary')
 
            // put the value of our game inside our vars
            if(response[0].name === undefined){
              gname.innerHTML = "no title";
            } else {
              gname.innerHTML = response[0].name;
            }
            
            if(response[0].summary === undefined){
              console.log('pas déscription')
            } else {
              gsummary.innerHTML = response[0].summary;
            }
            
            if(response[0].cover === undefined){
              console.log('pas image')
            } else {
              gcover.src = response[0].cover.url;
            }
            
 
            // append our childs to the container
            container.appendChild(gname);
            container.appendChild(gsummary);
            container.appendChild(gcover);
            container.appendChild(platformContainerD);
 
            document.querySelector('main').appendChild(container);
            document.querySelector('.loading-container').classList.add('hidden');
          }
        });
      }
    });
  })
 });

         function displayPlatformsRequests(response){
           if(response[0].platforms !== undefined){
            let platforms = response[0].platforms;
            for (let i = 0; i < platforms.length; i++){
              $.ajax({
                url: "https://api-2445582011268.apicast.io/platforms/" + platforms[i],
                type: "GET",
                headers: {
                'user-key': apiKey,
                'Accept': 'application/json',
                },
                success: function(response){
                  displayPlatform(response);
                }

              })
            }
           }
           
         }
  function displayPlatform(response){
    let platformName = response[0].name;
    //let platformLogo = response[0].logo.url;

    let container = document.createElement('div');
    let name1 = document.createElement('h3');

    name1.innerHTML = response[0].name;

    document.querySelector('.platformContainer').appendChild(name1);
    
  }
