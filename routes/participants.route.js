const express = require ('express');
const router = express.Router();

const getParticipantes = 'SELECT * FROM pn1yme2p_rafting.participante';

router.get('/total', function(req, res){
  console.log("sdada");
    global.connection.query(getParticipantes, function(error, results, fields) {
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