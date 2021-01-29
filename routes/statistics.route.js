const express = require ('express');
const router = express.Router();

// Queries à BD.
const getTotalUsers = "SELECT COUNT(*) AS total FROM pn1yme2p_rafting.users WHERE status = 'active'";
const getTotalUserByMonth = "SELECT month(createdAt) AS month, count(*) AS total FROM pn1yme2p_rafting.users GROUP BY month(createdAt)";
const getTotalParticipants = "SELECT COUNT(*) AS total FROM pn1yme2p_rafting.participante";
const getTotalGestores = "SELECT COUNT(*) AS total FROM pn1yme2p_rafting.gestor_espaco";

// Rotas.
router.get('/total/users', function(req, res){
    global.connection.query(getTotalUsers, function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.get('/total/users/month', function(req, res){
    global.connection.query(getTotalUserByMonth, function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.get('/total/participants', function(req, res){
    global.connection.query(getTotalParticipants, function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.get('/total/gestores', function(req, res){
    global.connection.query(getTotalGestores, function(error, results, fields) {
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