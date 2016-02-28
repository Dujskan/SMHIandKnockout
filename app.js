

/*
$.ajax("https://api.themoviedb.org/3/movie/525?api_key=34a0e4bc683651c4f090a51086e8e0fc",{
    method: "get",
    success: function(response){
        response.genres.forEach(function(item){
            document.getElementById("genres").innerHTML += '<li>' + item.name + '</li>';
        });

return;
        for(var i = 0; i < response.genres.length;i++){

            var liELement = document.createElement('li');
            var textElement = document.createTextNode(response.genres[i].name)
            liELement.appendChild(textElement);
            document.getElementById("genres").appendChild(liELement);
        }
    }

});


/*
POST = SKAPA        C
GET = hämta data    R
PUT= UPDATE         U
DELETE = delete     D
*/
