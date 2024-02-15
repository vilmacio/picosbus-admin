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

app.get('/api/rotas', async (req, res) => {
    const rotas = await sqlite.table('rotas').returning('*')

    const newDataPromise = rotas.map(async (rota) => {
        const cidade_promise = sqlite.table('cidades').where('id', rota.cidade_id).first()
        const ponto_origem_promise = sqlite.table('pontos').where('id', rota.origem_ponto_id).first()
        const ponto_destino_promise = sqlite.table('pontos').where('id', rota.destino_ponto_id).first()

        const [cidade, ponto_origem, ponto_destino] = await Promise.all([cidade_promise, ponto_origem_promise, ponto_destino_promise])

        return {
            id: rota.id,
            cidade,
            ponto_origem,
            ponto_destino
        }
    })

    const newData = await Promise.all(newDataPromise)

    res.json(newData)
})

app.get('/api/rotas/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const rota = await sqlite.table('rotas').where('id', id).first()

    const cidade_promise = sqlite.table('cidades').where('id', rota.cidade_id).first()
    const ponto_origem_promise = sqlite.table('pontos').where('id', rota.origem_ponto_id).first()
    const ponto_destino_promise = sqlite.table('pontos').where('id', rota.destino_ponto_id).first()

    const [cidade, ponto_origem, ponto_destino] = await Promise.all([cidade_promise, ponto_origem_promise, ponto_destino_promise])

    const newData = {
        id: rota.id,
        cidade,
        ponto_origem,
        ponto_destino
    }

    res.json(newData)
})

app.get('/api/cidades', async (req, res) => {
    const cidades = await sqlite.table('cidades').returning('*')

    res.json(cidades)
})

app.post('/api/rota', async (req, res) => {
    const body = req.body

    console.log('body', body)

    const ponto_origem = {
        cidade_id: body.ponto_origem_cidade_id,
        bairro: body.ponto_origem_bairro,
        logradouro: body.ponto_origem_logradouro,
        descricao: body.ponto_origem_detalhes,
    }

    const ponto_destino = {
        cidade_id: body.ponto_destino_cidade_id,
        bairro: body.ponto_destino_bairro,
        logradouro: body.ponto_destino_logradouro,
        descricao: body.ponto_destino_detalhes,
    }

    const [origem_ponto] = await sqlite.table('pontos').insert(ponto_origem).returning('id')
    const [destino_ponto] = await sqlite.table('pontos').insert(ponto_destino).returning('id')

    console.log('origem_ponto', origem_ponto)
    console.log('destino_ponto', destino_ponto)

    const rota = {
        cidade_id: body.cidade_id,
        origem_ponto_id: origem_ponto.id,
        destino_ponto_id: destino_ponto.id
    }

    const [result] = await sqlite.table('rotas').insert(rota).returning('id')

    console.log('result', result)

    res.json(result)
})

app.put('/api/rota/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const body = req.body

    console.log('body', body)

    const ponto_origem = {
        cidade_id: body.ponto_origem_cidade_id,
        bairro: body.ponto_origem_bairro,
        logradouro: body.ponto_origem_logradouro,
        descricao: body.ponto_origem_detalhes,
    }

    const ponto_destino = {
        cidade_id: body.ponto_destino_cidade_id,
        bairro: body.ponto_destino_bairro,
        logradouro: body.ponto_destino_logradouro,
        descricao: body.ponto_destino_detalhes,
    }

    const [origem_ponto] = await sqlite.table('pontos').update(ponto_origem).where('id', body.ponto_origem.id).returning('id')
    const [destino_ponto] = await sqlite.table('pontos').update(ponto_destino).where('id', body.ponto_destino.id).returning('id')

    console.log('origem_ponto', origem_ponto)
    console.log('destino_ponto', destino_ponto)

    const rota = {
        cidade_id: body.cidade_id,
        origem_ponto_id: origem_ponto.id,
        destino_ponto_id: destino_ponto.id
    }

    const [result] = await sqlite.table('rotas').update(rota).where('id', id).returning('id')

    console.log('result', result)

    res.json(result)
})

app.listen(3000, () => console.log('Rodandoo na 3000'));
