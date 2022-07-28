function site() {
    function initEventListener() {
        document.querySelector("#top-news-button").addEventListener("click", topNewsButton);
        document.querySelector("#newest-button").addEventListener("click", newestButton);
        document.querySelector("#jobs-button").addEventListener("click", jobsButton);
    };

    async function topNewsButton(event) {
        removeWelcomeMessage();
        
        document.querySelector("#display-div").innerHTML = "";
        let requestedData = await apiGet();

        cardBuilder(requestedData);
    }

    async function newestButton(event) {
        removeWelcomeMessage();

        document.querySelector("#display-div").innerHTML = "";
        let requestedData = await apiGet(event.currentTarget.id);

        cardBuilder(requestedData);
    };

    async function jobsButton(event) {
        removeWelcomeMessage();

        document.querySelector("#display-div").innerHTML = "";
        let requestedData = await apiGet(event.currentTarget.id);

        cardBuilder(requestedData);
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
            newData = newData + `<br><div class="card"><a href="${row.url}">${row.title}</a>
                                                        Time ago: ${row.timeAgo}<br>
                                                        Author: ${row.user}<br>
                                                        Url: ${row.url}</div>`;
        });

        displayDiv.innerHTML = newData;
    };

    function removeWelcomeMessage() {
        if (document.querySelector(".jumbotron")) {
            document.querySelector(".jumbotron").remove();
        }
    }

    initEventListener();
};

site();
