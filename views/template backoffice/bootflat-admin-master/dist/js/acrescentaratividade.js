function criarEvento(){
    console.log(data[0]);
     var html = document.getElementById("evento").innerHTML;
        console.log('ciclo');
    var o = 1;
    var name = "nome";
    var descricao = "descricao";
    console.log(data[i].data_evento);
    var date = "11-01-2019";
    html += `<div class="col-md-4 col-sm-6" style="color: white"  id="${o}"><div class="service" onclick="showModal('${name}', '${descricao}')">${name}<h3 style="color: white"></h3>${date}</div></div>`;

    document.getElementById("evento").innerHTML = html;
}

function onLoad(){
    criarEvento();
}