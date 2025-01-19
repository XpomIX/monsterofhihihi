document.addEventListener('DOMContentLoaded', async () => {
    event.preventDefault();
    try {
        //http://85.15.179.144:3000/api/login
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const container = document.getElementById('links-container');
        if (data && data.length > 0) {
            data.forEach(item => {
                const link = document.createElement('a');
                link.href = './useradmin.html?id=' + item.id;
                link.textContent = item.name;
                link.style.display = 'block';
                link.style.marginBottom = '10px';
    
                container.appendChild(link);
            });
        } else {
            container.textContent = 'Ссылки не найдены.';
        }     
        console.log(data)
    } catch (error) {
        console.error('Ошибка:', error);
    }
});