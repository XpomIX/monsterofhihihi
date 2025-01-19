document.getElementById('button_login').addEventListener('click', async () => {
    event.preventDefault();
    const formData = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };
        console.log(formData)

        try {
            //http://85.15.179.144:3000/api/login
            const response = await fetch('/api/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const id = await response.json();
            console.log(id);
            if (id != null){
                if (id == 1){
                    window.location.href = './admin.html';
                }
                else {
                window.location.href = './user.html?id=' + id;
                }
        };
        } catch (error) {
            console.error('Ошибка:', error);
        }
})       