const { request, response } = require('express');
const express = require('express');
//função para criação do ID - Unique Universal ID
const { uuid, isUuid } = require('uuidv4');

const app = express();

//Função da biblioteca express que interpreta JSON.
app.use(express.json());

//temporary db
const projects = [];

//middleare que será chamado em todas as requições para mostrar qual a rota que está sendo
//chamado pelo insomnia
function logRequests(request, response, next){
    const {method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next(); //próximo middleware
}

function validateProjectId(request, response, next){
    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json({error: 'Invalid project ID.'});
    }
    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId)

app.get('/projects', (request, response)=>{
    const {title} = request.query;

    const results = title
        ? projects.filter(project =>project.title.includes(title))
        : projects;

    return response.json(results) ;
});

app.post('/projects', (request, response)=>{
    const {title, owner} = request.body;

    const project = {id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response)=>{
    const { id } = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return response.status(400).json({error: 'Project not found.'})
    }

    const project = {
        id, title,owner
    }

    projects[projectIndex] = project;

    return response.json( project );
});

app.delete('/projects/:id', (request, response)=>{
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return response.status(400).json({error: 'Project not found.'})
    }

    projects.splice(projectIndex, 1);

    //É boa prática retornar uma resposta vazia com o status 204.
    return response.status(204).send();

});


app.listen(3355, ()=> {
    console.log('🚀 Back-end started!');
});