const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const models = require('./models');

const app = express();



app.use(express.static('public'));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// v v v add item v v v
// const todo = models.Todolist.build({
//   item: "learn sequelize",
//   description: "make another g-d todo list",
//   iscompleted: true
// })
//
// todo.save().then(function(newTodo){
//   console.log(newTodo.id);
// })



app.get("/", function (req, res) {
  console.log('get runs');
    models.Todolist.findAll().then(function (Todolist) {
        res.render("index", {todos: Todolist});
    });
});


app.post("/", function (req, res) {
  var inputTodo = models.Todolist.build({
    item: req.body.item,
    description: "",
    iscompleted:false
  });
  console.log(inputTodo);
  console.log("post runs");
  req.checkBody("item", "Gotta put SOMETHING in...okay?").notEmpty();
  var errors = req.validationErrors();

  if (errors) {
    console.log("error checker runs");
    var err = errors;
    res.send(err);
  } else {
    inputTodo.save().then(function(newTodo){
      console.log("new input saved");
      res.redirect('/');
    })

    }
})



app.listen(8080, function(){
  console.log("ROCKIT")
});






// white space
