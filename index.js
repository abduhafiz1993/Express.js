const express = require('express');

const app = express();

const users = [{
    id: '1',
    nameofuser: "Abdu" 
},
{
id: '2',
nameofuser: "Abdu2" 
},
{
id: '3',
nameofuser: "Abdu3" 
},
{
id: '4',
nameofuser: "Abdu4" 
}]

app.get('/', (req, res)=> {
    res.send('Hello World');
})


app.get('/users', (req, res)=> {
    res.send(users);
})

const port = process.env.PORT||3000;

app.listen(port, ()=>console.log(`listening on ${port}`));