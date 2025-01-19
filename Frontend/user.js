 document.addEventListener('DOMContentLoaded', async () => {
    event.preventDefault();
    try {
        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        const formData = {
            userId: parseInt(id, 10),
        };
        //http://85.15.179.144:3000/api/login
        const response = await fetch('/api/getlaststory', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const story_for_user = await response.json();
        const paragraph = document.getElementById('last_story_user');        
        paragraph.textContent = story_for_user.question;
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
document.getElementById('button').addEventListener('click', async () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    const formData = {
        userId: parseInt(id, 10),
        answer: document.getElementById('answer').value,
        };
        console.log(formData)
        try {
            //http://85.15.179.144:3000/api/login
            const response = await fetch('/api/answerstory', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
})