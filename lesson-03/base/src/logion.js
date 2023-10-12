document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required!')
        }

        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok == false) {
            const error = response.json();
            throw new Error(error.message);
        }

        const data = await response.json();

        sessionStorage.setItem('accessToken', data.accessToken);
        window.location = '/';

    } catch (err) {
        alert(err.message);
    }
}