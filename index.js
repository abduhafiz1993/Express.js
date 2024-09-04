const express = require('express');
const Joi = require('joi');
const { PrismaClient } = require('@prisma/client')

const app = express();
const prisma = new PrismaClient();


app.use(express.json());

const userSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });




app.post('/users', async (req, res)=> {
    try {
        const { error, value } = userSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const user = await prisma.user.create({
          data: value,
        });
        res.status(201).json(user);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});



app.get('/users', (req, res)=> {
    res.send(users);
})

app.get('/users/:id', (req, res)=> {
    const user = users.find(c=>c.id === parseInt(req.params.id));

    if(!user) return res.status(404).send('The user with the given Id was not eixist')
    
    res.send(user);
})
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

    res.send(users);
})

const port = process.env.PORT||3000;

app.listen(port, ()=>console.log(`listening on ${port}`));