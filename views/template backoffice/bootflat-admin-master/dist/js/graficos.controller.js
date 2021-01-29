window.onload = function() {
  getAtividadesPorMes().then(dados => preencherGrafico(dados));
};

async function getAtividadesPorMes() {
  const resposta = await fetch('/statistics/total/users/month');
  const { error, response } = await resposta.json();
  const data = [];

  for (const mes of response) {
    data[mes.month-1] = mes.total;
  }

  return data;
}

function preencherGrafico(data) {
  const labels = ["Janeiro","Feveiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const blue = "rgba(54, 162, 235, 0.2)";
  const green = "rgba(75, 192, 192, 0.2)";
  const blueBorder = "rgba(54, 162, 235)";
  const greenBorder = "rgba(75, 192, 192)";
  
  
  new Chart(document.getElementById("horizontalBar"), {
    type: "horizontalBar",
    data: {
      labels,
      datasets: [{
        data,
        fill: false,
        backgroundColor: [blue, green, blue, green, blue, green, blue, green, blue, green, blue, green],
        borderColor: [blueBorder, greenBorder, blueBorder, greenBorder, blueBorder, greenBorder, blueBorder, greenBorder, blueBorder, greenBorder, blueBorder, greenBorder],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
          display: false
      },
      scales: {
        xAxes: [{
          ticks: {
          beginAtZero: true
          }
        }]
      }
    }
  });
}