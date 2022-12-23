export class HighScore {
    #fetchURL = 'https://jsonblob.com/api/jsonBlob/1040701562032504832';

    constructor(highScoreContainer, scoresContainer, nickname, score) {
        this.highScoreContainer = highScoreContainer;
        this.scoresContainer = scoresContainer;
        this.nickname = nickname;
        this.score = score;
    }

    init() {
        this.highScoreContainer.classList.remove('hide');
        this.scoresContainer.innerHTML = ``;
        this.#fetchData();
    }

    #displayData(data) {
        this.scoresContainer.innerHTML =
            `
                <div class="score">
                    <p>Pozycja</p>
                    <p>nick</p>
                    <p>Ilość punktów</p>
                    <p class="long">Data</p>
                </div>
            `;
        
        this.#sortArray(data);

        data.splice(data.length - 1, 1);
        data.forEach((score, index) => {
            const element = document.createElement('div');
            element.classList.add('score');
            element.innerHTML = `
                <p>${index + 1}</p>
                <p>${score.name}</p>
                <p>${score.score}</p>
                <p class="long">${score.date}</p>
            `
            this.scoresContainer.appendChild(element);
        })

        this.#saveData(data);
    }

    #sortArray(arr) {
        arr.sort((a, b) => b.score - a.score);
    }

    async #fetchData() {
        try {
            const response = await fetch(this.#fetchURL);
            const data = await response.json();

            data.push({
                name: this.nickname,
                score: this.score,
                date: new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
            });
        
            this.#displayData(data);
        } catch (err) {
            console.log(err.message);
        }
        
    }

    async #saveData(data) {
        try {
            // await fetch(this.#fetchURL,
            //     { method: 'PUT', body: new Blob([JSON.stringify(data)]) }
            // );
            fetch(this.#fetchURL, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        } catch (err) {
            console.log(err.message);
        }
    }
}