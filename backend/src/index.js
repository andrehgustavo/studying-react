const { request } = require('express');
const express = require('express');

const app = express();

app.get('/projects', (request, response)=>{
    return response.json({message:'Hello World'}) ;
});

app.listen(3333, ()=> {
    console.log('🚀 Back-end started!');
});

//Parei na aula 5