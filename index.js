const baseUrl = `https://swapi.dev/api`;

const getPeople = async () => {
  try {
    const url = `${baseUrl}/people`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("people", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// getPeople();

const renderPeople = async () => {
  try {
    const data = await getPeople();
    const peopleList = document.getElementById("render-list-people");
    console.log(peopleList);
    data.results.forEach((element) => {
      const people = document.createElement("div");
      people.innerHTML = `
      <div id="container">
       <div class="people-name">${element.name}</div>
      <div class="people-height">${element.height} </div>
      </div>`;
      peopleList.appendChild(people);
    });
  } catch (error) {
    console.log(error);
  }
};
const renderPeopleList = document.getElementById("all-list-people");
renderPeopleList.addEventListener("click", renderPeople);
