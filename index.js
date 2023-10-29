const express = require('express');
const app = express();

app.get('/actions',(request,response)=>{
	response.json({message:'actions server is live'});
});


app.listen(8080,()=>{
console.log('server is live')
});
