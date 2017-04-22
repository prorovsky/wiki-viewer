const submitForm = document.querySelector('form');
const main = document.getElementById("main-content");
const listArticles = document.querySelector(".articles");

submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    listArticles.innerHTML= "";
    getRequest()
        .then(data => createArticlesList(data))
        .catch(reason => console.log(reason.message))

});

async function getRequest () {
    const searchName = document.getElementById('wiki-request').value;
    const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=" + encodeURIComponent(searchName);
    const options = {
        cache: "no-store"
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}

function createArticlesList (data) {
    submitForm.style.margin = "20px auto";

    const wikiSite = "https://en.wikipedia.org/wiki/";
    const articles = data.query.search;

    articles.forEach(article => {
        const singleArticle = document.createElement("article");

        const linkToWiki = document.createElement("a");
        linkToWiki.href = wikiSite + article.title;
        linkToWiki.target = "_blank";

        const articconstitle = document.createElement("p");
        articconstitle.classList.add("article-title");
        articconstitle.appendChild(document.createTextNode(article.title));

        const articleDescription = document.createElement("p");
        articleDescription.innerHTML = article.snippet;

        linkToWiki.appendChild(articconstitle);
        singleArticle.appendChild(linkToWiki);
        singleArticle.appendChild(articleDescription);
        listArticles.appendChild(singleArticle);
    });

    main.appendChild(listArticles);
}