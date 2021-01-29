window.onload = function() {
    fetch('/participant/total')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        
        document.getElementById('table-headers').innerHTML = "";
        console.log(data.response);
        document.getElementById('table-headers');
        for(var i = 0; i < data.response.length; i++){
            document.getElementById('table-headers').innerHTML += `<tr onclick="updateParticipante(${data.response[i].Id_Participante})" data-toggle="modal" data-target="#modalUpdate">
                                  <td data-title="Nome">${data.response[i].Nome_Participante}</td>
                                  <td data-title="Localidade">${data.response[i].Localidade}</td>
                                  <td data-title="Email">${data.response[i].Email}</td>
                                  <td data-title="Data de Nascimento">${data.response[i].idade}</td>
                                  <td data-title="Pontuação">${data.response[i].Pontuacao_Participante}</td>
                                  </tr>`;
        }
    });
}




    