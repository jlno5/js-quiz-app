function loadLeaderboard() {
    // load localStorage
    const rawStorage = localStorage.getItem("QuizScore");
    const formattedStorage = rawStorage == null ? {} : JSON.parse(rawStorage);

    let allResults = [];

    for (let item in formattedStorage) {
        console.log(item)
        for (let element of formattedStorage[item]) {
            allResults.push({
                quiz: item,
                correct: element[0],
                all: element[0] / element[1],
                ratio: element[1],
                date: element[2]
            });
        }
    }

    let sortedResults = allResults.sort((a, b) => {
        if (a.ratio < b.ratio) return true; // ratio DESC
        else if (a.ratio === b.ratio) {
            if (a.date < b.date) return true; // date DESC (newest first)
            else return false;
        } else return false;
    }); // sorts DESC by ratio, then DESC by date
    const table = document.getElementById("leaderboard");

    for (let item of sortedResults) {
        const rawDate = new Date(item.date);
        let formattedDate = rawDate.getDate() + "." + (rawDate.getMonth() + 1) + "." + rawDate.getFullYear();

        let row = table.insertRow(-1); // at the end
        let c1 = row.insertCell(0); // name
        let c2 = row.insertCell(1); // correct / all answers
        let c3 = row.insertCell(2); // date

        if (item.ratio > 0.8) {
            c1.innerHTML = `<span style="color: lime;">${item.quiz}</span>`;
        } else {
            c1.innerHTML = `<span style="color: #EE4B2B;">${item.quiz}</span>`;
        }

        c2.innerHTML = `<span style="color: lime;">${item.correct}</span> / ${item.all}`;
        c3.innerHTML = formattedDate;
    }
}

loadLeaderboard();