import express, { json } from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express();


function checkIfUserExist() {
    return {
        email: 'vilmacio@gmail.com',
        password: '1234567'
    }
}

app.use(json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    console.log('rota raiz')
    res.send('<h1>Aqui vai ficar o front</h1>')
})

app.post('/api/login', (req, res) => {
    const body = req.body

    const { email, password } = body

    console.log('req', req)
    console.log('body', body)

    const user = checkIfUserExist()

    if (!user) return res.status(400).json({ response: 'Usuário não existe' })

    if (user.password !== password) return res.status(400).json({ response: 'Senha incorreta' })

    const token = jwt.sign({ email }, 'PICOS_BUS')

    return res.json({ token })
})

app.listen(3000, () => console.log('Rodandoo na 3000'));
