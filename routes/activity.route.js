const express = require ('express');
const router = express.Router();

//const getAtividades = 'SELECT * FROM pn1yme2p_rafting.atividade';
const getEspacos = 'SELECT * FROM pn1yme2p_rafting.espaco';
const getAtividade = 'SELECT * FROM pn1yme2p_rafting.atividade INNER JOIN pn1yme2p_rafting.espaco ON atividade.id_Espaco=espaco.id_Espaco';
const createAtividade = 'INSERT INTO pn1yme2p_rafting.atividade (nome_atividade, custo, id_Espaco, nr_participantes_max, dificuldade_atividade, data_inicio, data_fim, reservado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
const updateAtividade = 'UPDATE pn1yme2p_rafting.atividade SET nome_atividade = ?, custo = ?, id_Espaco = ?, nr_participantes_max = ?, dificuldade_atividade = ?, data_inicio = ?, data_fim = ?, reservado = ? WHERE id_atividade = ?';
const deleteAtividade = ' DELETE FROM pn1yme2p_rafting.atividade WHERE id_atividade = ?';

router.get('/tudo', function(req, res){
    global.connection.query(getAtividade, function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.get('/espacos', function(req, res){
    var query = global.connection.query(getEspacos, [ req.params.espaco ], function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.post('/criarAtividade', function(req, res) {
      const nome = req.body.nome;
      const custo = Number(req.body.custo);
      const espaco = Number(req.body.espaco);
      const participantesMax = Number(req.body.participantesMax);
      const dificuldade = Number(req.body.dificuldade);
      const dataInicio = req.body.dataInicio;
      const dataFim = req.body.dataFim;
      const reservado = 0;
      const dados = [
        nome,
        custo,
        espaco,
        participantesMax,
        dificuldade,
        dataInicio,
        dataFim,
        reservado,
      ];
      
      let query = "";
      
      query = global.connection.query(createAtividade, dados, function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
          res.status(200).location(rows.insertId).send({
            "msg": "inserted with success"
          });
          console.log("Number of records inserted: " + rows.affectedRows);
        } else {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(409).send({"msg": err.code});
          console.log('Error while performing Query.', err);
          global.connection.query('error', function(err) {
            console.log("[mysql error]",err);
          });
        } else {
          res.status(400).send({"msg": err.code});
          global.connection.query('error', function(err) {
            console.log("[mysql error]",err);
          });
        }
      }
    });

});

router.put('/:atividade', function(req, res) {
      const nome = req.body.nome;
      const custo = Number(req.body.custo);
      const espaco = Number(req.body.espaco);
      const participantesMax = Number(req.body.participantesMax);
      const dificuldade = Number(req.body.dificuldade);
      const dataInicio = req.body.dataInicio;
      const dataFim = req.body.dataFim;
      const reservado = 0;
      const idAtividade = Number(req.params.atividade);
      const dados = [
        nome,
        custo,
        espaco,
        participantesMax,
        dificuldade,
        dataInicio,
        dataFim,
        reservado,
        idAtividade
      ];
      
      let query = "";
      
      query = global.connection.query(updateAtividade, dados, function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
          res.status(200).location(rows.insertId).send({
            "msg": "inserted with success"
          });
          console.log("Number of records inserted: " + rows.affectedRows);
        } else {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(409).send({"msg": err.code});
          console.log('Error while performing Query.', err);
          global.connection.query('error', function(err) {
            console.log("[mysql error]",err);
          });
        } else {
          res.status(400).send({"msg": err.code});
          global.connection.query('error', function(err) {
            console.log("[mysql error]",err);
          });
        }
      }
    });

});


// router.delete('/:atividade', function(req, res) {
//   console.log(`ACT -> ${req.params.atividade}`)
//   var query = global.connection.query(deleteAtividade, [ req.params.atividade ], function(error, results, fields) {
//     console.log(query.sql);
//     if (error) {
//       res.status(500).json({ error: error, response: null }); 
//     } else if (results.affectedRows == 0) {
//       res.status(404).json({ error: 'Atividade não encontrada!', response: null });    
//     } else{
//       res.status(204).json({ error: null, response: null }); 
//     }
//   });
// });

router.delete('/:atividade', function(req, res) {
  var query = global.connection.query(deleteAtividade, [ req.params.atividade ], function(error, results, fields) {
    console.log(query.sql);
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.affectedRows == 0) {
      res.status(404).json({ error: 'Atividade não encontrada!', response: null });    
    } else{
      res.status(204).json({ error: null, response: null }); 
    }
  });
});

module.exports = router;