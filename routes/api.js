var express = require('express');
var router = express.Router();

var data = 
[
{ id: 1, channel: "news", user: "author", message: "first post"},
{id: 2, channel: "tech", user: "author", message: "first post"},
{id: 3, channel: "tech", user: "jesse", message: "second post"}
];

/* GET all comments listing. (read) */
router.get('/:channel/', function(req, res, next) {
  res.send(data.filter((element) => {return element.channel == req.params.channel}));
});

//get single comment (read)
router.get('/:channel/:id', function(req, res, next) {
  var messages = data.filter((element) => { return element.channel == req.params.channel});

  res.send(messages.filter((element) => { return element.id == req.params.id })[0]);
});


//put a new message (creating new, PUTTING something on the shelf) (create)
router.put('/:channel/', function(req, res, next) {
var newMessage = 
{
  user: req.body.user,
  message: req.body.message,
  id: data.length + 1,
  channel: req.params.channel
};

  data.push(newMessage);
 res.statusCode = 201;
  res.send(data.filter((element) => { return element.channel == req.params.channel }));
});

//updated a message (post, take something off the shelf, manipulate it and put it back)(update)
router.post('/:id', function(req, res, next)
{
var message = data.filter((element) => { return element.id == req.params.id })[0];
var index = data.findIndex((element) => { return element == message});

if (message != undefined)
{
  message.user = req.body.user;
  message.id = req.params.id;
  message.channel = req.body.channel;
  message.message = req.body.message;

  data[index] = message;
}

res.send(message);
});

//delete a message (delete)
router.delete('/:id', function(req, res, next)
{
var message = data.filter((element) => { return element.id == req.params.id })[0];

// delete the item
data = data.filter((element) => {return element.id != req.params.id })

res.send(message);
});


module.exports = router;
