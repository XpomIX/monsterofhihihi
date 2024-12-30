 document.addEventListener('DOMContentLoaded', async () => {
    event.preventDefault();
    try {
        const name = sessionStorage.getItem('name');
        console.log(name);
        const password = sessionStorage.getItem('password');
        console.log(password);
    } catch (error) {
        console.error('Ошибка:', error);
    }
});