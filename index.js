const express = require('express');
const app = express();

app.get('/',(request,response)=>{
	response.send('hellow worlds')
});


app.listen(8080,()=>{
console.log('server is live')
});