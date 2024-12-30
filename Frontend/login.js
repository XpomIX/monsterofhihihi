document.getElementById('button_login').addEventListener('click', async () => {
    event.preventDefault();
    const formData = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };
        console.log(formData)

        try {
            //http://85.15.179.144:3000/api/login
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log(result.name);
            sessionStorage.setItem('name',result.name);
            sessionStorage.setItem('password',result.password);
            if (result != null){
                window.location.href = 'story.html'
        };
        } catch (error) {
            console.error('Ошибка:', error);
        }
})   