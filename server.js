require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Evento = require("./models/Evento");

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB conectado");
})
.catch((err) => {
    console.log(err);
});

app.get("/eventos", async (req,res)=>{
    const eventos = await Evento.find();
    res.json(eventos);
});

app.post("/eventos", async(req,res)=>{
    const nuevoEvento = new Evento(req.body);
    await nuevoEvento.save();
    res.json(nuevoEvento);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
