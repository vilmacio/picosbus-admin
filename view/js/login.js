async function login(e) {
    e.preventDefault();
    console.log('login')
    const emailInput = document.getElementById('exampleInputEmail')
    const passwordInput = document.getElementById('exampleInputPassword')
    const email = emailInput.value
    const password = passwordInput.value
    console.log('email', email)
    console.log('password', password)

    const fetchResponse = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })

    const data = await fetchResponse.json()

    if (data.error) return;

    const token = data.token

    localStorage.setItem('pb-token', token)

    window.location.href = '/'
}

document.getElementById('login_form').addEventListener('submit', login)
