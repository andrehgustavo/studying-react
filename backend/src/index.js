const { request, response } = require('express');
const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

//temporary db
const projects = [];

app.get('/projects', (request, response)=>{
    /* const {title, owner} = request.query;

    console.log(title);
    console.log(owner); */

    //aula 8 - 04:34

    return response.json(projects) ;
});

app.post('/projects', (request, response)=>{
    const {title, owner} = request.body;

    const project = {id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response)=>{
    const params = request.params;

    const project = projects.find(project => project.id === id)

    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3',
    ]);
});

app.delete('/projects/:id', (request, response)=>{
    return response.json([
        'Projeto 2',
        'Projeto 3',
    ]);
});


app.listen(3333, ()=> {
    console.log('🚀 Back-end started!');
});

//Parei na aula 5