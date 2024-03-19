//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");

const homeStartingContent = "Welcome to Daily Journal, your go-to destination for daily inspiration and insights. Dive into a diverse array of topics from lifestyle to technology, as we guide you through the intricacies of modern living. Join us in celebrating creativity, fostering connection, and embracing the joys of everyday life. Welcome home to Daily Journal – where every day brings a new opportunity for discovery and growth..";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];
app.get("/",function(req,res){
  res.render("home",{
    startingContent:homeStartingContent,
    posts:posts
  });

});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});
app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});


app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post={
    title:req.body.postTitle,
    content:req.body.postBody
  };
posts.push(post);
res.redirect("/");
});




app.get("/posts/:postName",function(req,res){
  const requestedTitle=_.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle=_.lowerCase(post.title);

    if(storedTitle===requestedTitle){
      res.render("post",{
        title:post.title,
        content: post.content
      });
    }
  });

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});


