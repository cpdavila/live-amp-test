
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const moment = require('moment');
const axios = require('axios');
require('dotenv').config();

//slack
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);
//end slack

/* slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
}); */


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/views')));
app.set('port', (process.env.PORT || 5000));

const posts = [
    {body: "Vivamus viverra augue libero, vitae dapibus lectus accumsan eget. Pellentesque eget ipsum purus. Maecenas leo odio, ornare nec ex id, suscipit porta ipsum. Ut fringilla semper cursus.", id: "1", time: "1498910001"},
    {body: "Sed leo sapien, molestie sit amet lorem eu, suscipit imperdiet tortor. Mauris maximus magna quam, non sodales metus auctor nec. Aenean tristique massa enim, non dictum mauris eleifend tristique. Proin fermentum nulla a nulla bibendum ultricies. Nulla pulvinar, risus vel tristique aliquet, elit quam tincidunt nisi, non blandit leo nulla eu ipsum. Sed porta, felis vitae elementum pellentesque, mauris felis rhoncus quam, ac suscipit eros justo ac justo. Proin et elit vitae sem interdum posuere et vitae nibh. Ut sed orci aliquam, pulvinar felis ac, pretium massa. Nullam porta ipsum non euismod mollis. Quisque scelerisque nisi quis pharetra blandit.", id: "2", time: "1498910002"},
    {body: "Vestibulum eu varius dolor. Praesent sagittis magna sem, non bibendum quam aliquam et. Sed et tristique mi. Quisque porta lorem et nulla lacinia gravida. Nullam semper lobortis sem, interdum tempus tellus. Proin accumsan imperdiet leo at vulputate. Nulla euismod placerat finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", id: "3", time: "1498910003"},
    {body: "Aenean ante erat, egestas a justo eu, sollicitudin convallis nulla. Fusce ex est, ornare in odio eu, venenatis dapibus purus. Etiam sit amet orci quam. Proin lobortis lobortis tellus, non elementum nunc consequat ac. Suspendisse eu purus sit amet dolor elementum mattis ut in odio.", id: "4", time: "1498910004"}
]

app.get('/', (req,res) => {
    res.render('index', {
        posts: posts
    })
})

app.post('/posts/new', (req, res) => {
    const newpost = {
        id: posts.length + 1,
        time: moment().unix(),
        body: req.body.body
    };

    posts.unshift(newpost);

    res.status(200).json(newpost);
});

app.post('/slack/writebot', async (req, res) => {
    const {text} = req.body;
    const url = process.env.WEBHOOK;
    
    const slackResult = await axios.post(url, {
        text 
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    res.json({response: slackResult});

  });


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});