
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 5000));

app.get('/', (req,res) => {
    res.render('index')
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});