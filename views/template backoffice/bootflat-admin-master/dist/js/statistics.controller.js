
(() => {
    totalUsers();
    totalParticipants();
    totalGestores();
})();


function totalUsers(){
    fetch('/statistics/total/users')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        //console.log(`users: ${JSON.stringify(data)}`)
        document.getElementById('nrUtilizadoresTotal').innerText = data.response[0].total;
    })
}

function totalParticipants(){
    fetch('/statistics/total/participants')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        //console.log(`participants: ${JSON.stringify(data)}`)
        document.getElementById('nrParticipantesTotal').innerText = data.response[0].total;
    })
}

function totalGestores(){
    fetch('/statistics/total/gestores')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        //console.log(`gestores: ${JSON.stringify(data)}`)
        document.getElementById('nrGestoresTotal').innerText = data.response[0].total;
    })
}
