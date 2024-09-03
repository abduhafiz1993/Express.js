const express = require('express');

const app = express();

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
    
});
const port = process.env.PORT||3000;

app.listen(port, ()=>console.log(`listening on ${port}`));