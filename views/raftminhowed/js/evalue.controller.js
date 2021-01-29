    
function onLoad(){
  avaliacao();  
}

function avaliacao() {
     document.getElementById("divEvalue").innerHTML = ``;
    fetch('/evalue/feed')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
        for(var i = 0; i < data.response.length; i++){
            if(data.response[i].feed != null){
            document.getElementById("divEvalue").innerHTML += `<div class="single_review_slider">
                            <div class="place_review">
  
                            </div>
                            <p>${data.response[i].feed}</p>
                            <h5> - ${data.response[i].Nome_Participante}</h5>
                        </div>
                        `;
            }
        }
        });
    }
    
