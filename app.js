import { component, html } from 'haunted';

function CocktailAssistant() {
  return html`<p>Booting…</p>`;
}

customElements.define('cocktail-assistant', component(CocktailAssistant));

document.addEventListener('DOMContentLoaded', () => {
  const mountEl = document.getElementById('component-container');
  if (mountEl) {
    mountEl.appendChild(document.createElement('cocktail-assistant'));
  }
});