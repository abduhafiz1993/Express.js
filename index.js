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



app.get('/users', async (req, res)=> {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error:err.message })
    }

})

app.get('/users/:id', async (req, res)=> {
    try {
        const user = await prisma.user.findUnique(
            {
                where:{id: parseInt(req.params.id)},
            }
        );
        if(!user) return res.status(404).send('The user with the given Id was not eixist')
    
            res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

app.put('/users/:id', async (req, res)=>{

    try {
        const {error, value} = userSchema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const user = await prisma.user.update(
            {
                where:{id: parseInt(req.params.id)},
                data: value,
            }
        );
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error:err.message});        
    }
});

app.delete('/users/:id', async (req, res)=>{
  try {
    await prisma.user.delete({
        where:{
            id: parseInt(req.params.id)
        },
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({error:err.message});    
  }  
})

const port = process.env.PORT||3000;

app.listen(port, ()=>console.log(`listening on ${port}`));