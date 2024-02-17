document.addEventListener('DOMContentLoaded', async function () {
    const preloaderContainer = document.querySelector('.preloader_container');
    const userCardsContainer = document.querySelector('.cards_container');
    const errorMessageContainer = document.querySelector('.error_message');
    const errorText = document.querySelector('.error_text');

    try {
        const fetchString = (Math.floor(Math.random() * 2) === 0 )
        ? 'https://my-json-server.typicode.com/Lofranlof/MockRESTAPI/champions?benchPress_gte=130'
        : 'https://my-json-server.typicode.com/Lofranlof/MockRESTAPI/champions?deadlift_gte=180' ;

        preloaderContainer.style.display = 'flex';
        const response = await fetch(fetchString);

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (response.ok) {
            const users = await response.json();
            preloaderContainer.style.display = 'none';
            const userCardTemplate = document.getElementById('user_card_template');
            users.forEach(user => {
                const userCard = document.importNode(userCardTemplate.content, true);
                userCard.querySelector('.user_info.nickname').textContent = `Nickname: ${user.nickname}`;
                userCard.querySelector('.user_info.date').textContent = `Date of the record: ${user.date}`;
                userCard.querySelector('.user_info.wellbeing').textContent = `Wellbeing: ${user.wellBeing}`;
                userCard.querySelector('.user_info.benchpress').textContent = `Bench Press: ${user.benchPress} kg`;
                userCard.querySelector('.user_info.squat').textContent = `Squat: ${user.squat} kg`;
                userCard.querySelector('.user_info.deadlift').textContent = `Deadlift: ${user.deadlift} kg`;
                userCardsContainer.appendChild(userCard);
            });
        } else {
            throw new Error('Network response Error');
        }
    } catch (error) {
        preloaderContainer.style.display = 'none';
        errorMessageContainer.style.display = 'flex';
        errorText.innerText = 'I am so fucking retarded';
        console.log(error);
    }
});
