require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Evento = require("./models/Evento");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log("Error MongoDB:", err));

app.get("/eventos", async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/eventos", async (req, res) => {
    try {
        const nuevoEvento = new Evento(req.body);
        await nuevoEvento.save();
        res.json(nuevoEvento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/eventos/:id", async (req, res) => {
    try {
        const eventoActualizado = await Evento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(eventoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/eventos/:id", async (req, res) => {
    try {
        await Evento.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Evento eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});