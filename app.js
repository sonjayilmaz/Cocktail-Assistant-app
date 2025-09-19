import { html } from 'lit-html';
import { component, useState, useMemo, useEffect } from 'haunted';

const API_SEARCH = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

function normalize(str) {
    return (str || "").trim();
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

function CocktailAssistant() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState("");

    const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

    const cartSet = useMemo(
    () => new Set(cart.map((i) => i.ingredient.toLowerCase())),
    [cart]
  );


    function showToast(msg, ms = 1600) {
        setToast(msg);
        if (ms > 0) setTimeout(() => setToast(""), ms);
    }

    async function searchByName(name) {
        const q = name?.trim();
        if (!q) {
            showToast("Type a drink name first.");
            return;
        }
        setLoading(true);
        showToast("Searching...", 0);
        try {
            const res = await fetch(`${API_SEARCH}${encodeURIComponent(q)}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const list = Array.isArray(data.drinks) ? data.drinks : [];
            setResults(list);
            showToast(list.length ? "Here are the results." : "No results found.");
        } catch (err) {
            console.error(err);
            setResults([]);
            showToast("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        searchByName(query);
    }

    function addCocktail(drink) {
        const toAdd = cocktailToIngredients(drink);
        let added = 0;
        const next = [...cart];
        for (const item of toAdd) {
            const key = item.ingredient.toLowerCase();
            if (!cartSet.has(key)) {
                next.push(item);
                cartSet.add(key);
                added++;
            }
        }
        if (added) {
            setCart(next);
            showToast("Ingredients added to shopping list.");
        } else {
            showToast("All ingredients already on the list.");
        }
    }

    function removeIngredient(name) {
        const next = cart.filter(
            (i) => i.ingredient.toLowerCase() !== name.toLowerCase()
        );
        setCart(next);
        showToast("Ingredient removed from shopping list.");
    }
  function clearCart() {
    setCart([]);
    showToast("All ingredients cleared.");
  }

    function printList() {
        window.print();
    }

    const SearchForm = html`
    <form class="search" role="search" @submit=${onSubmit}>
      <input
        class="search_input"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        .value=${query}
        @input=${(e) => setQuery(e.target.value)}
      />
      <button class="search_btn" type="submit">Search</button>
    </form>
  `;

    const Results = html`
    <section class="results">
      ${results.length === 0
            ? html`<p class="no-results">
            No cocktails found. Try searching for something else!
          </p>`
            : results.map(
                (d) => html`
              <div class="card">
                ${d.strDrinkThumb
                        ? html`<img
                      src="${d.strDrinkThumb}"
                      alt="${d.strDrink}"
                      width="120"
                      height="120"
                    />`
                        : ""}
                <div class="card__body">
                  <h3>${d.strDrink}</h3>
                  <p>${d.strInstructions || ""}</p>
                  <button class="btn add" @click=${() => addCocktail(d)}>
                    Add to shopping list
                  </button>
                </div>
              </div>
            `
            )}
    </section>
  `;

    const ShoppingList = html`
    <aside class="shopping">
      <h2>Shopping List</h2>
      ${cart.length === 0
            ? html`<p class="empty-cart">No ingredients added yet</p>`
            : html`
            <ul>
              ${cart.map(
                (i) => html`
                  <li>
                    <span
                      >${i.ingredient}${i.measure
                        ? ` — ${i.measure}`
                        : ""}</span
                    >
                    <button
                      class="remove"
                      title="Remove"
                      @click=${() => removeIngredient(i.ingredient)}
                    >
                      ×
                    </button>
                  </li>
                `
            )}
            </ul>
          `}
          <div class="shopping-actions">
      <button
        class="print-btn"
        @click=${printList}
        ?disabled=${cart.length === 0}
      >
        Print
      </button>
       <button
        class="clear-btn"
        @click=${clearCart}
        ?disabled=${cart.length === 0}
      >
        Clear All
      </button>
    </div>
    </aside>
  `;

  

    const Toast = toast
        ? html`<div class="toaster" role="status">${toast}</div>`
        : "";

    const Busy = loading
        ? html`<div class="overlay"><div class="spinner"></div></div>`
        : "";

    return html`
    ${SearchForm}
    <div class="grid">${Results} ${ShoppingList}</div>
    ${Toast} ${Busy}
  `;
}

//Turn OFF Shadow DOM so page CSS applies
customElements.define(
    "cocktail-assistant",
    component(CocktailAssistant, { useShadowDOM: false })
);

document.addEventListener("DOMContentLoaded", () => {
    const mountEl = document.getElementById("component-container");
    if (mountEl) {
        mountEl.appendChild(document.createElement("cocktail-assistant"));
    }
});
