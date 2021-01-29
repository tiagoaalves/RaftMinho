function onLoad(){
    setAtividades();
}


// function criarEvento(){
//     //console.log(data[0]);
//      var html = document.getElementById("evento").innerHTML;
//     console.log('ciclo');
//     var o = 1;
//     var name = "nome";
//     var descricao = "descricao";
//     //console.log(data[i].data_evento);
//     var date = "11-01-2019";
//     html += `<div class="col-md-4 col-sm-6" style="color: white"  id="${o}"><div class="service" onclick="showModal('${name}', '${descricao}')">${name}<h3 style="color: white"></h3>${date}</div></div>`;

//     document.getElementById("evento").innerHTML = html;
// }

// var html = `<div class="col-lg-3 col-sm-4">
//                     <div class="single_ihotel_list">
//                         <div class="hover_text">
//                             <div class="hotel_social_icon">
//                             </div>
//                            
//                         </div>
//                         <div class="hotel_text_iner">
//                             <h2> <a href="#"> Hotel Polonia</a></h2>
//                             <p>London, United Kingdom</p>
//                             <h5>From <span>$500</span></h5>
//                         </div>
//                     </div>
//                 </div>`


// <div class="col-lg-4 col-sm-4">
//  <div class="section_tittle text-center">
//                     <div class="single_ihotel_list">
//                         <div class="hover_text">
//                             <div class="hotel_social_icon">
//                             </div>
//                            
//                         </div>
//                         <div class="hotel_text_iner">
//                             <h2> <a href="#"> Hotel Polonia</a></h2>
//                             <p>London, United Kingdom</p>
//                             <h5>From <span>$500</span></h5>
//                         </div>
//                     </div>
//                 </div>
//          
//                  

function setAtividades(){
    document.getElementById("divAtividade").innerHTML = ``;
    fetch('/atividade/tudo')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
        for(var i = 0; i < data.response.length; i++){
            //if(data.response[i].dificuldade == 1){
            document.getElementById("divAtividade").innerHTML += `<div class="col-lg-4 col-sm-4">
                    <div class="single_ihotel_list">
                        <div class="hover_text">
                            <div class="hotel_social_icon">
                            </div>
                            <div class="share_icon">
                                <i class="ti-share"></i>
                            </div>
                        </div>
                        <div class="hotel_text_iner">
                            <h2> ${data.response[i].nome_atividade}</h2>
                            <p>${data.response[i].nome_Espaco}</p>
                            <h5>Custo: <span>${data.response[i].custo} € </span> </h5>
                        </div>
                    </div>
                </div>`;
            //}
        }
        });
}

