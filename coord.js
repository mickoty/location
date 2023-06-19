const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// const whereAmI = function(lat,lng){
//     fetch(
//   `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     console.log(` you are curretly i ${data.address.city}, ${data.address.country}`)
//   })};
// whereAmI(6.5896448,3.3521664)
// whereAmI(6.5896448,3.3521664)
// whereAmI(6.5896448,3.3521664)

const getlocat = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const renderco = function (data, c) {
  const html = `  
  <article class="country ">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <h4 class="country__region">${c}</h4>
    <p class="country__row"><span>👫</span>${data.population}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;
countriesContainer.innerHTML=' '
  countriesContainer.insertAdjacentHTML(`beforeend`, html);
  btn.style.opacity = 0;
  document.querySelector(`.container`).style.background = ` linear-gradient(
  90deg,
  rgba(5, 34, 8, 0.787746170678337) 16%,
  rgba(7, 18, 10, 0.4989059080962801) 48%,
  rgba(15, 43, 14, 0.7067833698030634) 81%
)
`;
  document.querySelector(`.container`).style.background = `url('${data.flag}')`;
  document.querySelector(`.container`).style.backgroundRepeat = "no-repeat";
  document.querySelector(`.container`).style.backgroundSize = "cover";
  document.querySelector(`.container`).style.backgroundPosition = "center";
};


const rendererr = function (mes) {
  countriesContainer.insertAdjacentText(`beforeend`, mes);

};
renderSpinner = function(){
  const markUp =`
   <div class="spinner">
  <i class="fas fa-spinner fa-spin"></i>
</div> 
  `
  countriesContainer.innerHTML=' '
  btn.style.opacity = 0;
  countriesContainer.insertAdjacentHTML('afterbegin', markUp)
}

const myLocation = async function () {
try {
  renderSpinner()
  const getLocat = await getlocat();
const { latitude: lat, longitude: lng } = getLocat.coords;
if (!lat)   rendererr(`somthing is worng `)

console.log(lat, lng);
const resGeo = await fetch(
`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`
);
const datares = await resGeo.json();
const city = datares.address.state;
console.log(datares);
console.log(city);
const getCountry = await fetch(
`https://restcountries.com/v2/name/${datares.address.country}`
);
const countryData = await getCountry.json();
console.log(countryData[0]);
renderco(countryData[0], city);
} catch (error) {
  rendererr(`somthing is worng  `);
}
};


btn.addEventListener(`click`, myLocation);