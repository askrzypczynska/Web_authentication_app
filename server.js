const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express()

// Server configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, OPTIONS, HEAD, PUT");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Origin, Accept, Acces-Control-Allow-Methods, Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// Connecting to database
const dbConfig = {
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b21aeaeeba9f44',
    password: '656bd862',
    database: 'heroku_e5251cc477c144b'
};

let db = mysql.createConnection(dbConfig);
handleDisconnect(db);

try {
    db.connect((err) => {
      if(err) {
        console.log("Error on first connection!: " + err);
        throw err;
      }
      console.log("Connected to database!")
    })
    
} catch(er) {
    console.log("error coneting to the database: ");
}

//Manage Response
app.get('/posts', (req, res) => {

})

app.post('/sendForm', (req, res) => {
    let values = req.body;
    console.log(values);
    
    db.query("SELECT * FROM users WHERE `email` = '" + values.email + "';", (err, resp) => {
        if(err){
            console.log(err);
            message = "Nie udało się odczytać bazy danych.";
            resolve(message);
        }
        if(resp.length == 0){
            saveToDB(values, res);
        } else{
            res.send("Użytkownik już istnieje w bazie danych!")
        }
    })

})

app.post('/login', (req, res) => {
    let data = req.body;
    console.log(data);

    db.query("SELECT * FROM users WHERE `email` = '" + data.email + "';", (err, resp) => {
        if(err){
            console.log(err);
            res.send("Nie udało się odczytać bazy danych.")
        }
        if(resp.length == 0){
            res.send("Nieprawidłowy mail lub hasło.")
        } else{
            if(resp[0].password === data.password){
                res.send("Zalogowano " + resp[0].name + " " + resp[0].lastName)
            }else{
                res.send("Nieprawidłowy mail lub hasło.")
            }
        }
    })
})

//Start listening
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`listen on port ${port}`);
})

async function saveToDB(values, res) {
    let message = "";
    let query = "INSERT INTO users (name, lastName, email, password) VALUES ('" + values.name + "', '" + values.lastName + "', '" + values.email + "', '" + values.password + "');"

    let promise = new Promise((resolve, reject) => {
        db.query(query, (err, resp)=>{
            if(err){
                console.log(err);
                message = "Nie udało się zapisać do bazy danych.";
                resolve(message);
            } 
            //console.log(resp);
            message = "Rejestracja przebiegła pomyślnie.";
            resolve(message);
        })
    })

    let response = await promise;
    res.send(message);
}

function handleDisconnect(myConnection) {
    myConnection.on('error', err => {
      console.log("Database connection lost, reconnecting...");
      db.destroy();
  
      db = mysql.createConnection (dbConfig);
  
      handleDisconnect(db);
      db.connect();
    });
}