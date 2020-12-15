const express = require('express');
const cookieParser = require('cookie-parser')
const app = express()

const sessions = {};

const users = {
    'kule': '123'
}

app.use(cookieParser())
app.use((req,res,next)=> {
    console.log(req.cookies)
    next()
})

app.get('/login' , (req,res) =>{
    const user = req.query['user'];
    const pass = req.query['pass'];
    if(users[user]){
        if(pass === users[user]) {
            const sessid = Math.random().toString(32)
            res.cookie('sessid', sessid).status(200).send("Login success");
            sessions[sessid] = user;
        } else {
            res.status(403).send('password incorrect')
        }
    } else {
        res.status(404).send('user not found ')
    }
})

app.get('/', (req,res) => {
    const user = sessions[req.cookies['sessid']]
    res.status(200 ).send('Hello    ' + (user|| 'guest')) ;

})

app.listen(3001)