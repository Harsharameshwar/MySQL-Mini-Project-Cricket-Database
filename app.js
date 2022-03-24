const express=require('express');
const mysql = require('mysql');
const port=3000;
const bodyparser=require('body-parser');
const app=express();
const ejs = require("ejs");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.listen(port,() => {
  console.log("Listening to port 3000");
});


app.get("/",(req,res) => {
  // console.log("This is get command");
  res.render("home")
});


app.post("/",(req, res)=>{
  const tablename = req.body.inputName;
  console.log(tablename);
  var tabs=["captain", "coach", "team", "umpire", "player","plays","umpired_by","wicket_keeper","matches"];  
  // var tabs=["actor","director","rating"];
if(tabs.indexOf(tablename) !== -1)  
{  
  var query = "SELECT * FROM " +tablename;
  connection.query(query, function(error, result) {
          let posts=[];
          posts.push(result);
          res.render("tables/"+tablename,{
            tablename: tablename,
            posts: posts
          });
          // console.log(posts);
          res.send();
  }); 
}   
else  
{  
        res.render("failure");
        res.send();
}  
});


app.get("/insertdelete",(req,res) => {
  // console.log("This is get command");
  res.render("insertdelete");
});


app.post("/insertdelete",(req, res)=>{
  const tablename = req.body.inputName;
  console.log(tablename);
  var tabs=["captain", "coach", "team", "umpire", "player","plays","umpired_by","wicket_keeper","matches"];  
  // var tabs=["actor","director","rating"];
if(tabs.indexOf(tablename) !== -1)  
{  
  var query = "SELECT * FROM " +tablename;
  connection.query(query, function(error, result) {
          let posts=[];
          posts.push(result);
          res.render("insertdelete/"+tablename,{
            tablename: tablename,
            posts: posts
          });
          // console.log(posts);
          res.send();
  }); 
}   
else  
{  
        res.render("failure");
        res.send();
}  
});

app.get("/editdetails",(req,res) => {
  // console.log("This is get command");
  res.render("editdetails");
});

app.post("/editdetails",(req, res)=>{
  const tablename = req.body.inputName;
  console.log(tablename);
  var tabs=["captain", "coach", "team", "umpire", "player","plays","umpired_by","wicket_keeper","matches"];  
  // var tabs=["actor","director","rating"];
if(tabs.indexOf(tablename) !== -1)  
{  
  var query = "SELECT * FROM " +tablename;
  connection.query(query, function(error, result) {
          let posts=[];
          posts.push(result);
          res.render("edittable/"+tablename,{
            tablename: tablename,
            posts: posts
          });
          // console.log(posts);
          res.send();
  }); 
}   
else  
{  
        res.render("failure");
        res.send();
}  
});


app.post("/:tablname/:colname/:id/save/getdetails",(req,res)=>{
  const tabname=req.params.tablname;
  const coname=req.params.colname;
  const Id=req.params.id;
  const data=(req.body);
  console.log(tabname);
  console.log(coname);
  let equery="UPDATE "+tabname+" SET ?" + "WHERE "+coname+"=?";
  let sql=connection.query(equery,[data,Id],(error,result,)=>{
    console.log(result);
})
  res.render("success");
})

app.get("/contact",(req,res)=>{
  res.render("contact");
})

app.get("/delete/:tabname/:colname/:id",(req,res)=>{
  const tablename=req.params.tabname;
  const columnname=req.params.colname;
  const Id=req.params.id;
  console.log(Id);
  let dquery="Delete from "+ tablename +" where "+ columnname+ "=?";
  connection.query(dquery,Id,(err,result)=>{
    console.log(result);
  })
  console.log(dquery);
  res.render("success");
});

app.post("/:tablname/getdetails",(req,res)=>{
  const tabname=req.params.tablname;
  const data=(req.body);
  console.log(tabname);
  console.log(data);
  let iquery="INSERT into "+tabname+" SET ?";
  let sql=connection.query(iquery,data,(err,result)=>{
    console.log(result);
  })
  res.render("success");
})



let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'cricketdatabase'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


// connection.end(err =>{
//   if(err){
//     console.log(err)
//   }
// });