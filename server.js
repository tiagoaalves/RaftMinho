const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const hostname = '127.0.0.1';
const port = 8080;
const connectionDetails = require('./config/mysql-connection');
const passport = require('./config/passport');
const bodyParser = require('body-parser');

const atividadeRouter = require('./routes/activity.route.js')
const participantRouter = require("./routes/participants.route.js");
const space_managerRouter = require("./routes/space_manager.route.js");
const statisticsRouter = require("./routes/statistics.route.js");
const avaliacaoRouter = require("./routes/evalue.route.js");

global.connection = mysql.createConnection({
    host: connectionDetails.host,
    port: connectionDetails.port,
    user: connectionDetails.user,
    password: connectionDetails.password,
    database: connectionDetails.database
});

global.connection.connect(function(err) {
  if (err) throw err;
  console.log('You are now connected to MySQL...');
});

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views', 'template backoffice', 'bootflat-admin-master')));
app.use(express.static(path.join(__dirname, 'views', 'raftminhowed')));
app.use(express.static(path.join(__dirname, 'javascripts')));
app.use('/atividade', atividadeRouter);
app.use('/participant', participantRouter);
app.use('/space_manager', space_managerRouter);
app.use('/statistics', statisticsRouter);
app.use('/evalue', avaliacaoRouter);

passport.applyTo(app);



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'raftminhowed', 'home.html'));
});

app.get('/admin', global.redirectIfNotLogged(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'template backoffice', 'bootflat-admin-master','backoffice.html'));
});


app.listen(port, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});



