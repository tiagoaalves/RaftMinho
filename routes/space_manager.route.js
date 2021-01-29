const express = require ('express');
const router = express.Router();

const getGestores = 'SELECT * FROM pn1yme2p_rafting.gestor_espaco';
const autorizarGestor = 'UPDATE pn1yme2p_rafting.gestor_espaco SET autorizado = 1 WHERE id_gestor_espaco = ?';

router.get('/todos', function(req, res) {
    global.connection.query(getGestores, function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.put('/autorizar/:id', function(req, res) {
  global.connection.query(autorizarGestor, [req.params.id],  function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});


module.exports = router;