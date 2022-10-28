//const express = require('express')

import express from "express";
import {MongoClient} from "mongodb"
import dotenv from "dotenv"
 
// dotenv.config()
// console.log(process.env)


const app = express()
const PORT = 4000;
// respond with "hello world" when a GET request is made to the homepage

// const movies=[
//     {
//       id: "100",
//       poster: "https://www.filmibeat.com/ph-big/2021/06/rrr_16249644106.jpg",
//       name: "RRR",
//       rating: "7.3",
//       summary: "A tale of two legendary revolutionaries and their journey far away from home. After their journey they return home to start fighting back against British colonialists in the 1920s.",
//       trailer: "https://www.youtube.com/embed/NgBoMJy386M"
//     },
//     {
//       id: "101",
//       poster: "https://assets.gadgets360cdn.com/pricee/assets/product/202202/Prithviraj_Movie-_Poster_1644608993.jpg",
//       name: "Samrat Prithviraj",
//       rating: "8.8",
//       summary: "The heroism of the fearless King Prithviraj Chauhan as he faces off against Muhammad of Ghor.",
//       trailer: "https://www.youtube.com/embed/33-CQdPHyjw"
//     },
//     {
//       "id": "102",
//       "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
//       "name": "Iron Man 2",
//       "rating": "6.3",
//       "summary": "Tony Stark is under pressure from various sources, including the government, to share his technology with the world. He must find a way to fight them while also tackling his other enemies.",
//       "trailer": "https://www.youtube.com/embed/wKtcmiifycU"
//     },
//     {
//       "id": "103",
//       "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN9nPaLnJ5w4jtPUfG7lGy9GHyCrunJn20R_1_537kvrKbU5v1zzJbpeHxBdkOG74DLaY&usqp=CAU",
//       "name": "Attack",
//       "rating": "9.0",
//       "summary": "A cyber soldier who has lost everything puts his life on the line to serve his nation, willing to make the ultimate sacrifice.",
//       "trailer": "https://www.youtube.com/embed/Ma3Y-qekYos"
//     },
//     {
//       "id": "104",
//       "poster": "https://static.toiimg.com/thumb/87456032.cms?width=137&height=195&imgsize=",
//       "name": "Jai Bhim",
//       "rating": "8.8",
//       "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
//       "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA"
//     }
//   ]
  
 app.use(express.json()); 
  // const MONGO_URL = "mongodb://127.0.0.1"
  const MONGO_URL = "mongodb+srv://ashwini:ashwini123@cluster0.2lrzq9i.mongodb.net"

  // const MONGO_URL = process.env.MONGO_URL;
  async  function createConnection(){
    const client = new MongoClient(MONGO_URL);
   await client.connect();
    console.log("mongo is connected👍");
    return client;
  }

const  client = await createConnection();
app.get('/', (req, res) => {
  res.send('hello world😀😀😀.')
})
// app.get('/movies', async(req, res) => {
//   //db.movies.find({})
//   const movies = await client.db("ashwini").collection("movies").find({}).toArray()
//   // console.log("Movies:"+movies)
//     res.send(movies)
//   })

  app.get('/movies', async(req, res) => {
    //db.movies.find({})
    console.log(req.query);
      if(req.query.rating){
        req.query.rating = +req.query.rating;
      }

    const movies = await client.db("ashwini").collection("movies").find(req.query).toArray()
    // console.log("Movies:"+movies)
      res.send(movies)
    })
  

  app.post('/movies',async(req, res) => {
    const data=req.body
    console.log(data)

    //db.movies.insertMany(data)
    const result = await client.db("ashwini").collection("movies" ).insertMany(data)
    res.send(result)
  })


  app.get('/movies/:id',async (req, res) => {
    const {id} = req.params;
    console.log(req.params)

    // const movie=movies.find(mv => mv.id===id)

    const movie = await client.db("ashwini").collection("movies").findOne({id:id})
    console.log(movie)

    movie ?  res.send(movie) : res.status(404).send({'msg':'movie not found'})
    
  })


  app.delete('/movies/:id',async (req, res) => {
    const {id} = req.params;
    console.log(req.params)

    // const movie=db.movies.deleleOne({id:100})

    const result = await client.db("ashwini").collection("movies").deleteOne({id:id})
    console.log(result)

    result.deletedCount > 0 ?  res.send({'msg':'movie deleted successfully.'}) : res.status(404).send({'msg':'movie not found'})
    
  })

app.listen(PORT,()=>{console.log(`App started on Port ${PORT}`)})