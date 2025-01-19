document.addEventListener('DOMContentLoaded', async () => {
    try {
         //http://85.15.179.144:3000/api/registration
        event.preventDefault();
        const response = await fetch('http://localhost:3000/api/users', { mode: 'cors' }); 
        const data = await response.json();
        console.log('Ответ от сервера:', data);
        displayUsers(data);
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Очищаем список перед добавлением новых данных

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `ID: ${user.id}, Имя: ${user.name}, password: ${user.password}, date:${user.createdAt}`;
        userList.appendChild(li);
    });
};

document.getElementById('myButton').addEventListener('click', async () => {
    const formData = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };
        try {
            //http://85.15.179.144:3000/api/registration
            const response = await fetch('http://localhost:3000/api/registration', {
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Ошибка сервера: ' + response.status);
            }
            
            const result = await response.json();
            document.getElementById('responseMessage').textContent = result.message;
        } catch (error) {
            console.error('Ошибка:', error);
            document.getElementById('responseMessage').textContent = 'Произошла ошибка при отправке данных';
        }
})