let rota_id;
let rota;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
rota_id = urlParams.get('id');

console.log('rota_id', rota_id);

async function getExitingRoute() {
    if (!rota_id) return

    const fetchResponse = await fetch(`http://localhost:3000/api/rotas/${rota_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await fetchResponse.json()

    rota = data

    console.log('rota', rota)

    document.getElementById('form_title').innerHTML = `Rota #${rota.id}`

    document.getElementById('rota_id').value = String(rota.id)
    document.getElementById('cidade_base_id').value = String(rota.cidade.id)
    document.getElementById('ponto_origem_cidade_id').value = String(rota.ponto_origem.cidade_id)
    document.getElementById('ponto_origem_bairro').value = rota.ponto_origem.bairro
    document.getElementById('ponto_origem_logradouro').value = rota.ponto_origem.logradouro
    document.getElementById('ponto_origem_detalhes').value = rota.ponto_origem.descricao

    document.getElementById('ponto_destino_cidade_id').value = String(rota.ponto_destino.cidade_id)
    document.getElementById('ponto_destino_bairro').value = rota.ponto_destino.bairro
    document.getElementById('ponto_destino_logradouro').value = rota.ponto_destino.logradouro
    document.getElementById('ponto_destino_detalhes').value = rota.ponto_destino.descricao
}

const cidadesSelectElements = Array.from(document.getElementsByClassName("cidades_select"));

async function getCidades() {
    const fetchResponse = await fetch('http://localhost:3000/api/cidades', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await fetchResponse.json()

    return data
}

async function mountCidadesSelect() {
    const cidades = await getCidades();

    console.log('cidades', cidades)

    cidadesSelectElements.forEach(cidadesSelectElement => {
        cidades.forEach(function (cidade) {
            const option = document.createElement('option');
            option.innerHTML = `${cidade.nome} - ${cidade.uf}`;
            option.value = cidade.id;
            cidadesSelectElement.add(option);
        });
    })
}


async function createNewRouteSubmit(dataToBeSent) {
    const fetchResponse = await fetch('http://localhost:3000/api/rota', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToBeSent)
    })

    const data = await fetchResponse.json()

    return data
}

async function updateRouteSubmit(dataToBeSent) {
    dataToBeSent.ponto_origem = {
        id: rota.ponto_origem.id
    }

    dataToBeSent.ponto_destino = {
        id: rota.ponto_destino.id
    }

    const fetchResponse = await fetch(`http://localhost:3000/api/rota/${rota_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToBeSent)
    })

    const data = await fetchResponse.json()

    return data
}

function submit(e) {
    e.preventDefault();

    const dataToBeSent = {
        cidade_id: Number(document.getElementById('cidade_base_id').value),
        ponto_origem_cidade_id: Number(document.getElementById('ponto_origem_cidade_id').value),
        ponto_origem_bairro: document.getElementById('ponto_origem_bairro').value,
        ponto_origem_logradouro: document.getElementById('ponto_origem_logradouro').value,
        ponto_origem_detalhes: document.getElementById('ponto_origem_detalhes').value,

        ponto_destino_cidade_id: Number(document.getElementById('ponto_destino_cidade_id').value),
        ponto_destino_bairro: document.getElementById('ponto_destino_bairro').value,
        ponto_destino_logradouro: document.getElementById('ponto_destino_logradouro').value,
        ponto_destino_detalhes: document.getElementById('ponto_destino_detalhes').value,
    }

    if (rota_id) {
        updateRouteSubmit(dataToBeSent);
    }
    else {
        createNewRouteSubmit(dataToBeSent);
    }

    window.location.href = '/'
}

getExitingRoute()
mountCidadesSelect()
document.getElementById('rota_form').addEventListener('submit', submit)
