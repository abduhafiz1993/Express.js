const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const users = [{
    id: 1,
    nameofuser: "Abdu" 
},
{
id: 2,
nameofuser: "Abdu2" 
},
{
id: 3,
nameofuser: "Abdu3" 
},
{
id: 4,
nameofuser: "Abdu4" 
}]

app.get('/', (req, res)=> {
    res.send('Hello World');
})


app.get('/users', (req, res)=> {
    res.send(users);
})

app.get('/users/:id', (req, res)=> {
    const user = users.find(c=>c.id === parseInt(req.params.id));

    if(!user) return res.status(404).send('The user with the given Id was not eixist')
    
    res.send(user);
})

app.post('/users', (req, res)=> {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = {
        id: users.length+1,
        nameofuser: req.body.name
    }

    users.push(user);
    res.send(user);
});

app.put('/users/:id',(req, res)=>{
    const user = users.find(c=>c.id === parseInt(req.params.id));

    if(!user) return res.status(404).send('The user with the given Id was not eixist');

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    user.nameofuser = req.body.name;

    res.send(user);
});

app.delete('/users/:id', (req, res)=>{
    const user = users.find(c=>c.id === parseInt(req.params.id));

    if(!user) return res.status(404).send('The user with the given Id was not eixist');

    const index  = users.indexOf(user);
    users.splice(index, 1);
})

const port = process.env.PORT||3000;

app.listen(port, ()=>console.log(`listening on ${port}`));