document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    try {
        if (email == '' || password == '') {
            throw new Error('All fields must be filled!');
        }

        if (password != repass) {
            throw new Error('Passwords don\'t match');
        }

        let response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'apllication/json'
            },
            body : JSON.stringify({
                email,
                password
            })
        });

        if(response.ok == false) {
            const error = await response.json();
            throw Error(error.message);
        }

        const data = await response.json();
        sessionStorage.setItem('accessToken', data.accessToken);
        window.location = '/';

    } catch (err) {
        alert(err.message);
    }
}