function site() {
    function initEventListener() {
        document.querySelector("#top-news-button").addEventListener("click", topNewsButton);
        document.querySelector("#newest-button").addEventListener("click", newestButton);
        document.querySelector("#jobs-button").addEventListener("click", jobsButton);
        document.querySelector("#turn-page-left").addEventListener("click", turnPageLeftButton);
        document.querySelector("#turn-page-right").addEventListener("click", turnPageRightButton);
    };

    async function turnPageLeftButton(event) {
        const pageNumber = document.querySelector("#page-number");

        if (+pageNumber.innerText <= 1) {
            return;
        }

        let newPageNumber = +pageNumber.innerText - 1;
        let whatButton = pageNumber.classList.value;

        let requestedData = await apiGet(whatButton, newPageNumber);

        if (requestedData.length < 1) {
            return;
        }
        document.querySelector("#display-div").innerHTML = "";

        cardBuilder(requestedData);
        pageNumber.innerText = newPageNumber;
    }

    async function turnPageRightButton(event) {
        const pageNumber = document.querySelector("#page-number");

        if (pageNumber.innerText === "") {
            return;
        }

        let newPageNumber = +pageNumber.innerText + 1;
        let whatButton = pageNumber.classList.value;

        let requestedData = await apiGet(whatButton, newPageNumber);

        if (requestedData.length < 1) {
            return;
        }
        document.querySelector("#display-div").innerHTML = "";

        cardBuilder(requestedData);
        pageNumber.innerText = newPageNumber;

    }

    async function topNewsButton(event) {
        removeWelcomeMessage();
        document.querySelector("#display-div").innerHTML = "";
        let pageNumber = document.querySelector("#page-number");

        pageNumber.innerText = 1;
        pageNumber.removeAttribute("class");
        pageNumber.classList.add("top-news-button");

        let requestedData = await apiGet();

        cardBuilder(requestedData);
    }

    async function newestButton(event) {
        removeWelcomeMessage();
        document.querySelector("#display-div").innerHTML = "";
        let pageNumber = document.querySelector("#page-number");

        pageNumber.innerText = 1;
        pageNumber.removeAttribute("class");
        pageNumber.classList.add("newest-button");

        let requestedData = await apiGet(event.currentTarget.id);

        cardBuilder(requestedData);
    };

    async function jobsButton(event) {
        removeWelcomeMessage();
        document.querySelector("#display-div").innerHTML = "";
        let pageNumber = document.querySelector("#page-number");

        pageNumber.innerText = 1;
        pageNumber.removeAttribute("class");
        pageNumber.classList.add("jobs-button");

        let requestedData = await apiGet(event.currentTarget.id);

        cardBuilder(requestedData);
    };

    async function apiGet(whatButton, pageNumber = 1) {

        let apiData;

        switch (whatButton) {
            case "newest-button":
                apiData = await fetch(`api/data/newest?page=${pageNumber}`)
                    .then(response => response.json());
                return apiData;
                break;
            case "jobs-button":
                apiData = await fetch(`api/data/jobs?page=${pageNumber}`)
                    .then(response => response.json());
                return apiData;
                break;
            default:
                apiData = await fetch(`api/data/top?page=${pageNumber}`)
                    .then(response => response.json());
                return apiData;
                break;
        };
    };

    function cardBuilder(requestedData) {
        let displayDiv = document.querySelector("#display-div");
        let newData = "";
        requestedData.forEach(function (row) {
            newData = newData + `<br><div class="card">`;

            if (!validURL(row.url)) {
                newData = newData + `<div>${row.title}</div><br>
                                    Time ago: ${row.timeAgo}<br>`;
            } else {
                newData = newData + `<a href="${row.url}">${row.title}</a><br>
                                        Time ago: ${row.timeAgo}<br>`;
            }

            if (row.user != null) {
                newData = newData + `Author: ${row.user}<br>`;
            }
            newData = newData + "</div>";
        });

        displayDiv.innerHTML = newData;
    };

    function removeWelcomeMessage() {
        if (document.querySelector(".jumbotron")) {
            document.querySelector(".jumbotron").remove();
        }
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + 
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
            '((\\d{1,3}\\.){3}\\d{1,3}))' + 
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' + 
            '(\\#[-a-z\\d_]*)?$', 'i');
        return !!pattern.test(str);
    }

    initEventListener();
};

site();
