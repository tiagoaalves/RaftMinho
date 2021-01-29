window.onload = function() {
    listaGestores();
}

function listaGestores() {
    fetch('/space_manager/todos')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        
        document.getElementById('table-headers').innerHTML = "";
        document.getElementById('table-headers');
        const elementoGestores = document.getElementById('inputGestor');
        
        for(var i = 0; i < data.response.length; i++) {
            if (data.response[i].autorizado == 0) {
                const option = document.createElement("option");
            
                option.text = data.response[i].nome_gestor_espaco;
                option.value = data.response[i].id_gestor_espaco;
                elementoGestores.appendChild(option);
            }
            
            document.getElementById('table-headers').innerHTML += `<tr>
                                  <td data-title="Nome">${data.response[i].nome_gestor_espaco}</td>
                                  <td data-title="Email">${data.response[i].email_gestor}</td>
                                  <td data-title="Autorizado">${data.response[i].autorizado == 1 ? 'Sim' : 'Não'}</td>
                                  </tr>`;
        }
    });
}

function autorizarGestor(){
    const id_gestor = document.getElementById('inputGestor').value;
    
    console.log('id gestor');
    console.log(id_gestor);
    fetch(`/space_manager/autorizar/${id_gestor}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'PUT'
    }).then(function (response) {
        if (!response.ok) {
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
            console.log(response.url); //=> String
            if (response.status === 409) {
                Swal.fire({title:"Conflito de dados de entrada!", icon: "error"});
            } else {
                Swal.fire({title: 'Ocorreu em erro!', icon:"error"});
            }
        } else { //limpeza dos dados do form
            Swal.fire({title: "Gestor autorizado com sucesso!", icon:"success"});
            listaGestores();
        }
    });
    
    $('#modalAutorizar').modal('hide');
}
  