require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Todo = require('./models/todo');


const app = express();
app.set('view-engine','ejs')
app.use(bodyParser.urlencoded({extended: false}))



app.get('/',(req,res,next)=>{
    Todo.find()
      .then((todo)=>{
        console.log(todo);
        res.render('home.ejs',{
            todo : todo
        })
      })
      .catch(err => console.log(err))
   
})


app.get('/:_id', (req,res,next)=>{
     const _id  = req.params._id;
     console.log(_id);

     Todo.deleteOne({_id : _id})
       .then(()=>{
           console.log('Deleted SuccessFully')
           res.redirect('/');
       })
       .catch(err => console.log(err))
})

app.post('/add',(req,res,next)=>{
    const todo = req.body.todo;
     
    const newTodo = new Todo({
        todo : todo
    })
    newTodo.save()
    .then((todo)=>{
        console.log('Todo Inserted in Database !')
        console.log(todo);
        res.redirect('/')
    })
    .catch(err => console.log(err));
})



mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,  useUnifiedTopology: true})
 .then(()=>{
     console.log('Dataabse Connected !')
     app.listen(4000,()=> console.log('app started at Port 3000'));
 })
 .catch(err => console.log(err));

