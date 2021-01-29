{"changed":true,"filter":false,"title":"index.js","tooltip":"/views/template backoffice/bootflat-admin-master/dist/js/index.js","value":"/* globals Chart:false, feather:false */\n\n(function () {\n    'use strict'\n  \n    feather.replace()\n  \n    // Graphs\n    var ctx = document.getElementById('myChart')\n    // eslint-disable-next-line no-unused-vars\n    var myChart = new Chart(ctx, {\n      type: 'line',\n      data: {\n        labels: [\n          'Sunday',\n          'Monday',\n          'Tuesday',\n          'Wednesday',\n          'Thursday',\n          'Friday',\n          'Saturday'\n        ],\n        datasets: [{\n          data: [\n            15339,\n            21345,\n            18483,\n            24003,\n            23489,\n            24092,\n            12034\n          ],\n          lineTension: 0,\n          backgroundColor: 'transparent',\n          borderColor: '#007bff',\n          borderWidth: 4,\n          pointBackgroundColor: '#007bff'\n        }]\n      },\n      options: {\n        scales: {\n          yAxes: [{\n            ticks: {\n              beginAtZero: false\n            }\n          }]\n        },\n        legend: {\n          display: false\n        }\n      }\n    })\n  }())\n  ","undoManager":{"mark":-2,"position":-1,"stack":[]},"ace":{"folds":[],"scrolltop":373,"scrollleft":0,"selection":{"start":{"row":0,"column":0},"end":{"row":0,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":4,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1574769436910}