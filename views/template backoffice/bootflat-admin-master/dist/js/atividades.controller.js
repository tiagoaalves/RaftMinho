window.onload = function() {
    listAtividades();
};

let lista;
let id_atividade_update;

function listAtividades() {
    fetch('/atividade/tudo')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        document.getElementById('table-headers').innerHTML = "";
        document.getElementById("inputDelete").innerHTML = "";
        document.getElementById('table-headers');
        lista = data.response;
        for(var i = 0; i < data.response.length; i++){
            document.getElementById("inputDelete").innerHTML += `<option value="${data.response[i].id_atividade}">${data.response[i].nome_atividade}</option>`;
            document.getElementById('table-headers').innerHTML += `<tr onclick="preencherModal(${i})" data-toggle="modal" data-target="#modalUpdate">
                                  <td data-title="Nome">${data.response[i].nome_atividade}</td>
                                  <td data-title="Espaço">${data.response[i].nome_Espaco}</td>
                                  <td data-title="Custo">${data.response[i].custo}</td>
                                  <td data-title="Participantes Max">${data.response[i].nr_participantes_max}</td>
                                  <td data-title="Dificuldade">${data.response[i].dificuldade_atividade == 0 ? 'Fácil' : 'Difícil'}</td>
                                  <td data-title="Data Inicio">${data.response[i].data_inicio}</td>
                                  <td data-title="Data Fim">${data.response[i].data_fim}</td>
                                  <td data-title="Estado">${data.response[i].autorizado == 0 ? 'Em espera' : 'Autorizado'}</td>
                                  </tr>`;
        }
    });
}

function preencherModal(i) {
    // Guardar o ID da atividade para a função updateAtividade()
    id_atividade_update = lista[i].id_atividade;
    document.getElementById('inputNome1').value = lista[i].nome_atividade;
    document.getElementById('inputCusto1').value = lista[i].custo;
    document.getElementById('inputParticipantes1').value = lista[i].nr_participantes_max;
    document.getElementById('inputDificuldade1').selectedIndex = lista[i].dificuldade_atividade;
    document.getElementById('inputDataInicio1').value = lista[i].data_inicio;
    document.getElementById('inputDataFim1').value = lista[i].data_fim;
}

( async function() {
    const resposta = await fetch('/atividade/espacos');
    const { error, response } = await resposta.json();
    const elementoCriarEspacos = document.getElementById('inputCriarEspaco');
    const elementoEditarEspacos = document.getElementById('inputEditarEspaco');
        
    for (const espaco of response) {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        
        option1.text = espaco.nome_Espaco;
        option1.value = espaco.id_Espaco;
        option2.text = espaco.nome_Espaco;
        option2.value = espaco.id_Espaco;
        elementoCriarEspacos.appendChild(option1);
        elementoEditarEspacos.appendChild(option2);
    }
})();
    
function addAtividade(){
    if((document.getElementById("controlNome").innerHTML === "" && document.getElementById("controlCusto").innerHTML === "") && document.getElementById("controlNome").innerHTML === ""){
    let data = {};
    data.nome = document.getElementById('inputNome').value;
    data.custo = document.getElementById('inputCusto').value;
    data.participantesMax = document.getElementById('inputParticipantes').value;
    data.dificuldade = document.getElementById('inputDificuldade').value;
    data.dataInicio = document.getElementById('inputDataInicio').value;
    data.dataFim = document.getElementById('inputDataFim').value;
    data.espaco = document.getElementById('inputCriarEspaco').value;
    
    fetch('/atividade/criarAtividade', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(data)
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
            Swal.fire({title: "Atividade registada com sucesso!", icon:"success"});
            listAtividades();
        }
    });
    
    $('#exampleModalCenter').modal('hide');
    }else{
        Swal.fire({title: 'Preencha os dados corretamente!', icon:"error"});
    }
}

function deleteAtividade(){
    var sel = document.getElementById('inputDelete');
    var atividade = sel.options[sel.selectedIndex].value;
    console.log(atividade);
    fetch(`/atividade/${atividade}`, {
        method: 'DELETE',
    }).then(function (response) {
        if (!response.ok) {
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
            console.log(response.url); //=> String
            Swal.fire({title: 'Ocorreu em erro!', icon:"error"});
        } else { //limpeza dos dados do form
            //swal({title: "Atividade eliminada com sucesso!", type:"success"});
            Swal.fire({title: "Atividade eliminada com sucesso!", icon:"success"});
            listAtividades();
        }
    });
    
    $('#modalDelete').modal('hide');
  }

function updateAtividade(atividade){
    let data = {};
    data.nome = document.getElementById('inputNome1').value;
    data.custo = document.getElementById('inputCusto1').value;
    data.participantesMax = document.getElementById('inputParticipantes1').value;
    data.dificuldade = document.getElementById('inputDificuldade1').value;
    data.dataInicio = document.getElementById('inputDataInicio1').value;
    data.dataFim = document.getElementById('inputDataFim1').value;
    data.espaco = document.getElementById('inputEditarEspaco').value;
    
    fetch(`/atividade/${id_atividade_update}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'PUT',
      body: JSON.stringify(data)
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
            Swal.fire({title: "Atividade atualizada com sucesso!", icon:"success"});
            listAtividades();
        }
    });
    
    $('#modalUpdate').modal('hide');
}

function validatorNome(){
    if(document.getElementById("inputNome").value.length<1){
      document.getElementById("controlNome").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("inputNome").onkeyup = function see(){
    if(document.getElementById("inputNome").value.length==0){
      document.getElementById("controlNome").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("controlNome").innerHTML = "";
    }
  };
  }
  
function validatorCusto(){
    if(document.getElementById("inputCusto").value.length<1){
      document.getElementById("controlCusto").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("inputCusto").onkeyup = function see(){
    if(document.getElementById("inputCusto").value.length==0){
      document.getElementById("controlCusto").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("controlCusto").innerHTML = "";
    }
  };
  }
  
function validatorParticipantes(){
    if(document.getElementById("inputParticipantes").value.length<1){
      document.getElementById("controlParticipantes").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("inputParticipantes").onkeyup = function see(){
    if(document.getElementById("inputParticipantes").value.length==0){
      document.getElementById("controlParticipantes").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("controlParticipantes").innerHTML = "";
    }
  };
  }
  
 