document.addEventListener('DOMContentLoaded', async () => {
    event.preventDefault();
    try {
        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        const formData = {
            userId: parseInt(id, 10),
        };
        //http://85.15.179.144:3000/api/login
        const response = await fetch('http://localhost:3000/api/getlaststory', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const story_user = await response.json();
        const otvetik = document.getElementById('otvetik');    
        const story_men = document.getElementById('story_men');      
        otvetik.textContent = story_user.answer;
        story_men.value = story_user.question;
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
document.getElementById('button').addEventListener('click', async () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    const formData = {
        userId: parseInt(id, 10),
        question: document.getElementById('story_men').value,
        };
        console.log(formData)
        try {
            //http://85.15.179.144:3000/api/login
            const response = await fetch('http://localhost:3000/api/updatestory', {
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
document.getElementById('button_new_story').addEventListener('click', async () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    const formData = {
        userId: parseInt(id, 10),
        question: document.getElementById('new_question').value,
        };
        console.log(formData)
        try {
            //http://85.15.179.144:3000/api/login
            const response = await fetch('http://localhost:3000/api/newstory', {
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