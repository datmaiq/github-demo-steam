const baseURL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";
let searchValue = "";
let tag = "";
let page = 1;
let limit = 16;
let genres = "";

// hàm chung xử lí call api

const handleCallApi = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
// --------------------------------------------------

const callAPISearch = async () => {
  searchValue = document.getElementById("search-input").value;
  page = 1;
  await renderAllGames();
  document.getElementById("search-input").value = "";
  //   searchValue = "";
  //   console.log(response);
};
let searchQuery = document.getElementById("store-search-button");
searchQuery.addEventListener("click", callAPISearch);

const renderGameByGenres = async (genre) => {
  page = 1;
  genres = genre;
  infoGame = document.getElementById("info-game");
  infoGame.innerHTML = `<div class="lds-ripple">
            <div></div>
            <div></div>
          </div>`;
  document.getElementById("pagination").style.display = "flex";
  const response = await getAllGames();
  console.log(response);
  infoGame.innerHTML = "";
  response.forEach((game) => {
    const info = document.createElement("div");
    info.innerHTML = `  <div class="game">
    <div class="game-link game-cover">
      <img src="${game.header_image}" alt="${game.name}" onclick="renderDetailGame(${game.appid})">
      </div>
      <div class="game-price">${game.price}$</div>
      <div class="hover-screen">
        <div class="hover-game-basic-info">
          <div class="hover-game-name hover-game-item"></div>
          <div class="hover-game-tags hover-game-item">
          <div class="game-tag">${game.steamspy_tags[0]}</div>
          <div class="game-tag">${game.steamspy_tags[1]}</div>
          <div class="game-tag">${game.steamspy_tags[2]}</div>
          </div>
          <div class="hover-game-ratings hover-game-item">

          </div>`;
    infoGame.appendChild(info);
  });
};

const queryPara = {
  page,
  limit,
  q: searchValue,
  steamspy_tags: tag,
  genres,
};
const url = Object.entries(queryPara).reduce((u, [key, value]) => {
  if (value) {
    return `${u}&${key}=${value}`;
  }
  return u;
}, `${baseURL}/games?`);
// lấy list game và render
const getAllGames = async () => {
  // let url = `${baseURL}/games?page=${page}&limit=${limit}`;
  // if (searchValue) {
  //   url = `${url}&q=${searchValue}`;
  // }

  // if (tag) {
  //   url = `${url}&steamspy_tags=${tag}`;
  // }

  // if (genres) {
  //   url = `${url}&genres=${genres}`;
  // }

  const res = await handleCallApi(url);
  return res.data;
  // console.log(res);
};
// getAllGames();
const renderAllGames = async () => {
  try {
    infoGame = document.getElementById("info-game");
    infoGame.innerHTML = `<div class="lds-ripple">
            <div></div>
            <div></div>
          </div>`;
    document.getElementById("pagination").style.display = "flex";
    const x = await getAllGames();

    infoGame.innerHTML = "";
    console.log(x);
    x.forEach((game) => {
      const info = document.createElement("div");
      info.innerHTML = `  <div class="game" >
      <div class="game-link game-cover" >
        <img src="${game.header_image}" alt="${game.name}" onclick="renderDetailGame(${game.appid})">
        </div>
        <div class="game-price">${game.price}$</div>
        <div class="hover-screen">
          <div class="hover-game-basic-info">
            <div class="hover-game-name hover-game-item"></div>
            <div class="hover-game-tags hover-game-item">
            <div class="game-tag">${game.steamspy_tags[0]}</div>
            <div class="game-tag">${game.steamspy_tags[1]}</div>
            <div class="game-tag">${game.steamspy_tags[2]}</div>
            </div>
            <div class="hover-game-ratings hover-game-item">
             
            </div>`;
      infoGame.appendChild(info);
    });
  } catch (error) {
    console.log(error);
  }
};
renderAllGames();

// lấy thông tin genres
const getAllGenres = async () => {
  let url = `${baseURL}/genres?page=1&limit=10`;

  const res = await handleCallApi(url);
  // console.log(res);
  return res.data;
};

const renderAllGenres = async () => {
  try {
    const data = await getAllGenres();

    genresList = document.getElementById("genres-list");

    data.forEach((genre) => {
      const list = document.createElement("button");
      list.innerHTML = `<div class="genres-tags">
    <div onclick="renderGameByGenres('${
      genre.name
    }')" class="genres-tag">${genre.name.toUpperCase()} </div> 
    </div> `;
      genresList.appendChild(list);
    });
  } catch (error) {
    console.log(error);
  }
};
renderAllGenres();
// --------------------------------------------------------

// lấy thông tin tags
const getAllTag = async (page = 1, limit = 10) => {
  let url = `${baseURL}/steamspy-tags?`;

  if (page || page >= 1) {
    url = `${url}page=${page}&`;
  }

  if (limit || limit > 0) {
    url = `${url}limit=${limit}&`;
  }

  const res = await handleCallApi(url, "GET");

  renderAllTags(res);
};

const renderAllTags = (data) => {
  console.log("Tags", data);
};

// --------------------------------------------------------

// lấy thông tin chi tiết 1 game
const getDetailGame = async (appid) => {
  if (appid || appid !== "") {
    let url = `${baseURL}/single-game/${appid}`;

    const res = await handleCallApi(url);
    return res.data;
  }
};

const renderDetailGame = async (appid) => {
  infoGame = document.getElementById("info-game");
  infoGame.innerHTML = `<div class="lds-ripple">
            <div></div>
            <div></div>
          </div>`;
  document.getElementById("pagination").style.display = "none";
  const response = await getDetailGame(appid);

  infoGame.innerHTML = "";
  console.log(response);
  const releaseDate = new Date(response.release_date);
  const date1 = releaseDate.getDate();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let fullMonth = month[releaseDate.getMonth(response.release_date)];
  fullYear = releaseDate.getFullYear();

  const detailGame = document.createElement("div");
  detailGame.innerHTML = `  <div class="detail-game">
      <p>${response.name}</p>
      <div class="cover-game-detail" ">
        <img src="${response.header_image}" alt="${response.name}">
        <div id="description" class="description"><span>${
          response.description
        }</span>
        <div class="rating">
        <div id="release-date"><span> Release Date: </span> ${date1}-${fullMonth}-${fullYear} </div>
         <div id="detai-developer"><span>Developer:</span> ${
           response.developer
         }</div>
         <div id="positive_ratings"><span>Positive ratings:</span> ${
           response.positive_ratings
         } </div>
         <div id="negative_ratings"><span>Negative ratings:</span>${
           response.negative_ratings
         } </div>
         </div>
         </div>
        </div>
        <div>Popular user-defined tags for this product:</div>
        <div id="genres-tags-detail" class="genres-tags-detail">
         ${forLoopCate(response.categories)}</div>`;
  infoGame.appendChild(detailGame);
};
const forLoopCate = (data) => {
  let res = "";
  data?.forEach((game) => {
    res += `
          <div class="genre-detail game-tag">
          ${game}
          </div>`;
  });
  return res;
};
// --------------------------------------------------------

// lấy thông tin chi tiết 1 game
const getFeaturedGames = async () => {
  let url = `${baseURL}/features`;

  const res = await handleCallApi(url, "GET");

  renderFeaturedGames(res);
};

const renderFeaturedGames = (data) => {
  console.log("Featured Games", data);
};

// --------------------------------------------------------

const next = document.getElementById("next-arrow");
const previous = document.getElementById("previous-arrow");

next.addEventListener("click", async () => {
  console.log("next");
  page += 1;
  window.scrollTo(0, 0);
  renderAllGames();
});
previous.addEventListener("click", async () => {
  console.log("previous");
  if (page > 1) {
    page -= 1;
    window.scrollTo(0, 0);
    renderAllGames();
  }
});
