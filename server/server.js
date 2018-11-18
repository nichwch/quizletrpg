const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const request = require('request');
const app = express();
const port = 5000;
const config = require('./config/dbconfig.js');
db = config.database;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(cors());

var con = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  insecureAuth: true,
  database: db.database
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DB!");
});

app.get('hello',function(req,res){
  res.sendStatus("hello");
})
app.get('/monsters', function (req, res) {
  con.query(`SELECT name,id,taunt_1,taunt_2,taunt_3,hurt_1,hurt_2,hurt_3,at,hp FROM eduflash.monsters
				LEFT JOIN eduflash.taunts
                ON monsters.name = taunts.owner
                LEFT JOIN eduflash.hurts
                ON monsters.name = hurts.owner;`,
          function (err, result) {
			         if (err) throw err;
          else{
          //random from list
          let monster = result[Math.floor(Math.random()*result.length)]
          monster = {
            id: monster.id,
            name: monster.name,
            taunts: [monster.taunt_1,monster.taunt_2,monster.taunt_3],
            hurts: [monster.hurt_1,monster.hurt_2,monster.hurt_3],
            at: monster.at,
            hp: monster.hp
          };
			    res.json(monster);
        }
		    });
});

app.get('/choosemonster', function (req, res) {
    let mon  = req.query.monster
  con.query(`SELECT name,id,taunt_1,taunt_2,taunt_3,hurt_1,hurt_2,hurt_3,at,hp FROM eduflash.monsters
				LEFT JOIN eduflash.taunts
                ON monsters.name = taunts.owner
                LEFT JOIN eduflash.hurts
                ON monsters.name = hurts.owner
                WHERE name = '`+mon+'\'',
          function (err, result) {
			         if (err) throw err;
          else{
          //random from list
          let monster = result[0]
          monster = {
            id: monster.id,
            name: monster.name,
            taunts: [monster.taunt_1,monster.taunt_2,monster.taunt_3],
            hurts: [monster.hurt_1,monster.hurt_2,monster.hurt_3],
            at: monster.at,
            hp: monster.hp
          };
			    res.json(monster);
        }
		    });
});
app.listen(port, function(){
	console.log(`Server listening on port ${port}`)
});

app.get('/quizlet',function(req,res) {
     let url = req.query.url;
     let id = url.substr("https://quizlet.com/".length,url.length-1);
     id = id.substr(0,id.indexOf('/'));

     let apicall = "https://api.quizlet.com/2.0/sets/"+id+"/terms?client_id=Cacnu2R3hb&whitespace=1"
     request(apicall, { json: true }, (err, result, body) => {
     if (err) { return res.sendStatus(200); }
     res.json(body)

    });
});

app.get('/getevent',function(req,res){
  let title = req.query.title;

  if(title != 'random'){
    let query = `Select Title,Description,reference.option,reference.reference,reference.isevent FROM eduflash.events
      Left Join eduflash.reference
      on Title = start
      WHERE Title = '`+title+'\'';
    con.query(query,function(err,result){
        if(err){
          res.sendStatus(400)
        }
        let event = {
          Title: result[0].title,
          Description: result[0].Description,
          Options: []
        }
        result.forEach(element => {
          event.Options.push({
            Title: element.option,
            Reference: element.reference,
            Event: (element.isevent == 1)
          });

        })
        res.json(event);

      })
  }
  else {
    con.query(`Select  Title,Description,reference.option,reference.reference,reference.isevent FROM eduflash.events
      Left Join eduflash.reference
      on Title = start
      Where Root = 1`,
      function(err,result){
        if(err){
          res.sendStatus(200)
        }
        baseresult = result[Math.floor(Math.random()*result.length)]
        let event = {
          Title: baseresult.Title,
          Description: baseresult.Description,
          Options: []
        }

        result.forEach(element => {
          if (element.Title == event.Title){
            event.Options.push({
              Title: element.option,
              Reference: element.reference,
              Event: (element.isevent == 1)
            })
          };

        })
          res.json(event)


      })

  }
})

app.post('/addmonster',function(req,res) {
  let monsterSQL = `INSERT INTO eduflash.monsters(name,at,hp) Values ?`;
  let tauntSQL = `INSERT INTO eduflash.taunts(taunt_1,taunt_2,taunt_3,owner) Values ?`;
  let hurtSQL = `INSERT INTO eduflash.hurts(hurt_1,hurt_2,hurt_3,owner) Values ?`;

  let monsterParam = [[req.body.name,req.body.at,req.body.hp]];
  let tauntParam = [req.body.taunts]
  tauntParam[0].push(req.body.name);
  let hurtParam = [req.body.hurts]
  hurtParam[0].push(req.body.name);



   con.query(monsterSQL,[monsterParam],function(err,result){
     if (err){
       res.sendStatus(400)
       console.log('err1')
       console.error(err);
     }
     con.query(tauntSQL,[tauntParam],function(err,result) {
       if (err){
         res.sendStatus(400)
          console.log('err2')
          console.error(err);

       }
       con.query(hurtSQL,[hurtParam],function(err,result) {
         if (err){
           res.sendStatus(400)
           console.log('err3')
           console.error(err);

         }
         res.sendStatus(200)
       })
     })
   })
});
