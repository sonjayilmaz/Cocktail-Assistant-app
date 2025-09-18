import { component, html, useState, useMemo } from 'haunted';

function normalize(str) {
  return (str || '').trim();
}
function cocktailToIngredients(drink) {
  const items = [];
  for (let i = 1; i <= 15; i++) {
    const ing = normalize(drink[`strIngredient${i}`]);
    const mea = normalize(drink[`strMeasure${i}`]);
    if (!ing) continue;
    items.push({ ingredient: ing, measure: mea });
  }
  return items;
}

//mock data for testing
const mockData = {
  drinks: [
    {
      idDrink: "11007",
      strDrink: "Margarita",
      strInstructions: "Shake ingredients with ice, strain into glass, garnish with lime.",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      strIngredient1: "Tequila",
      strIngredient2: "Triple sec",
      strIngredient3: "Lime juice",
      strMeasure1: "1 1/2 oz",
      strMeasure2: "1/2 oz",
      strMeasure3: "1 oz"
    },
    {
      idDrink: "11118",
      strDrink: "Blue Margarita",
      strInstructions: "Shake tequila, blue curaçao, and lime juice with ice, strain into glass.",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/bry4qh1582751040.jpg",
      strIngredient1: "Tequila",
      strIngredient2: "Blue Curaçao",
      strIngredient3: "Lime juice",
      strMeasure1: "1 1/2 oz",
      strMeasure2: "1 oz",
      strMeasure3: "1 oz"
    }
  ]
};

function CocktailAssistant() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockData.drinks);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [cart, setCart] = useState([]);

  const cartSet = useMemo(
    () => new Set(cart.map(i => i.ingredient.toLowerCase())),
    [cart]
  );

  function showToast(msg, ms = 1600) {
    setToast(msg);
    if (ms > 0) setTimeout(() => setToast(''), ms);
  }

  function printList() {
    window.print();
  }

  return html`
    <section class="results">
      ${results.map(
        d => html`
          <div class="card">
            <img src=${d.strDrinkThumb} width="120" height="120" />
            <div class="card__body">
              <h3>${d.strDrink}</h3>
              <p>${d.strInstructions}</p>
            </div>
          </div>
        `
      )}
    </section>
  `;
}

customElements.define('cocktail-assistant', component(CocktailAssistant));

document.addEventListener('DOMContentLoaded', () => {
  const mountEl = document.getElementById('component-container');
  if (mountEl) {
    mountEl.appendChild(document.createElement('cocktail-assistant'));
  }
});