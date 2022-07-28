function site() {
    function initEventListener() {
        document.querySelector("#top-news-button").addEventListener("click", topNewsButton);
        document.querySelector("#newest-button").addEventListener("click", newestButton);
        document.querySelector("#jobs-button").addEventListener("click", jobsButton);
    };

    async function topNewsButton(event) {
        document.querySelector("#display-div").innerHTML = "";
        let requestedData = await apiGet();

        cardBuilder(requestedData);

        console.log();
        return;
    }

    async function newestButton(event) {
        let requestedData = await apiGet(event.currentTarget.id);

        console.log();
        return;
    };

    async function jobsButton(event) {
        let requestedData = await apiGet(event.currentTarget.id);

        console.log();
        return;
    };

    async function apiGet(whatButton, pageNumber = 1) {

        let apiData;

        switch (whatButton) {
            case "newest-button":
                apiData = await fetch(`api/data/newest`)
                    .then(response => response.json());
                return apiData;
                break;
            case "jobs-button":
                apiData = await fetch(`api/data/jobs`)
                    .then(response => response.json());
                return apiData;
                break;
            default:
                apiData = await fetch(`api/data/top`)
                    .then(response => response.json());
                return apiData;
                break;
        };
    };

    function cardBuilder(requestedData) {
        let displayDiv = document.querySelector("#display-div");
        let newData = "";
        requestedData.forEach(function (row) {
            console.log("Foreach-en belül");
            newData = newData + `<br><div class="card">Title: ${row.title}
                                                <br>Time ago: ${row.timeAgo}
                                                <br>Author: ${row.user}
                                                <br>Url: ${row.url}</div>`;
        });

        displayDiv.innerHTML = newData;
    };

    initEventListener();
};

site();
