const accessKey = 'NtrVlyQ61K4pFwyaf5tjugQCghpWVUnVHqAb1MVTRnM';

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const searchMoreBtn = document.getElementById('show-more-btn');

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  for (const result of results) {
    const image = document.createElement("img");
    image.src = result.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchResult.innerHTML = ""; // Clear the previous search results
  searchImages();
});
