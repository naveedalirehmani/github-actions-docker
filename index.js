const express = require('express');
const app = express();

app.get('/',(request,response)=>{
	response.send('hellow worldss')
});

app.listen(8080,()=>{
console.log('server is live')
});