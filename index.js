import express, { json } from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import path from 'path'
import sqlite from './database/index.js';

const app = express();

app.use(json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(express.static(path.join(path.resolve(''), 'view')))

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(''), 'view', 'index.html'));
})

app.post('/api/login', async (req, res) => {
    const body = req.body

    const { email, password } = body

    const user = await sqlite.table('users').where('email', email).first()

    if (!user) return res.status(400).json({ error: 'Usuário não existe' })

    if (user.password !== password) return res.status(400).json({ error: 'Senha incorreta' })

    const token = jwt.sign({ email }, 'PICOS_BUS')

    return res.json({ token })
})

app.listen(3000, () => console.log('Rodandoo na 3000'));
