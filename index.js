const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
let countriesData = [];
let sortMethod = "maxToMin"; // la methode de base à l'affichage on veut pour trier => maxToMin // test manuellement

// 2 & 3
// res.json() pour que ça soit exploitable en javascript
async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countriesData = data));

  console.log(countriesData[0]);
  countriesDisplay();
}

// 4
// La function va être appelé plusieurs fois, elle doit déjà être appelé quand le fetch a été fait, dès qu'on a les données on await fetch du haut, ensuite on appelle countriesDisplay()
// le filter va analyser, et ressentir que les éléments qui inclut dans leur nom de pays ce qui est tapé dans l'input
// methode toLowerCase() pour comparer des choses équivalentent, on passe le nom du pays en minuscule, et ce que tape le user en minuscule
// 5
// arpès le filter(), avant le map() car c'est lui qui affiche, slice() à quel indice tu commences, me couper 3 éléments - plutôt que de mettre un chiffre, mettre un chiffre qu'on ne connait pas encore, .slice(0, inputRange)
// 6
// sort((a, b)) : b symbolise le plus grand, dire dans l'objet quel élément on veut trier: population. Et nous sommes dans un tri croissant.
const countriesDisplay = () => {
  countriesContainer.innerHTML = countriesData
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
         <div class="card">
             <img src="${country.flags.svg}" alt="drapeau ${
          country.translations.fra.common
        }">
             <h2>${country.translations.fra.common}</h2>
             <h4>${country.capital}</h4>
             <p>Population : ${country.population.toLocaleString()}</p>
         </div>
    `
    )
    .join("");
};

window.addEventListener("load", fetchCountries); // quand elle est load, jouer la function fetchCountries(())

// relancer countriesDisplay() si jamais on tape dans l'input, avec l'evenement 'input'
// dès qu'on tape dans l'input, je veux relancer contriesDisplay()
inputSearch.addEventListener("input", countriesDisplay);

// // connecté le span, avec la valeur de l’input range
// on peut pas dire rangeValue.value pour lui passer une valeur, car c’est un span, mais textContent et lui passé le chiffre qui est dans l'inputRange
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

// forEach évite de créer 3 évenements, 1 seul suffit
// quand on click sur 1 button on lance un clique, un sort (trier)
// e.target.id montre la balise (l'id) du bouton sur lequel j'ai cliqué, chose qu'ensuite on va comparer dans le .sort()
// si on veut que ça fonctionne, relancer countriesDisplay
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
//-----------------------------------------------------------

// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données // coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier les pays (méthode sort())

//-----------------------------------------------------------
