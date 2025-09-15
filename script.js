const accessKey = "NtrVlyQ61K4pFwyaf5tjugQCghpWVUnVHqAb1MVTRnM";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchMoreBtn = document.getElementById("show-more-btn");
const resultsSection = document.getElementById("results-section");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;

  results.forEach((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.className = "w-full h-56 object-cover rounded-lg shadow";

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);

    searchResult.appendChild(imageLink);
  });

  if (results.length > 0) {
    resultsSection.classList.remove("hidden");
    resultsSection.classList.add("active");
    searchMoreBtn.style.display = "block";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

searchMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
