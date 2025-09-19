# Cocktail Assistant 🍸

🚧 Work in Progress — styling and features evolving.

A web application that helps you gather a shopping list for multiple cocktails. Search for cocktails, add them to your list, and get a deduplicated shopping list that you can print.

## Features

- **Search cocktails** using TheCocktailDB API
- **Smart shopping list** with automatic ingredient deduplication
- **Print functionality** for your shopping list
- **Toast notifications** for user feedback
- **Responsive design** that works on all devices
- **Beautiful UI** with blur effects and modern styling

## Tech Stack

- **Haunted** - React hooks for web components
- **lit-html** - HTML templating
- **TheCocktailDB API** - Cocktail database
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with backdrop filters

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sonjayilmaz/Cocktail-Assistant-app.git
cd Cocktail-Assistant-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Usage

1. **Search for cocktails** - Type a cocktail name in the search box and click "Search"
2. **Add to shopping list** - Click "Add to shopping list" on any cocktail card
3. **View your list** - See all ingredients in the right sidebar (automatically deduplicated)
4. **Print your list** - Click "Print" to open a print dialog with your shopping list
5. **Remove ingredients** - Click the "×" button next to any ingredient to remove it

## API Integration

This app uses [TheCocktailDB](https://www.thecocktaildb.com/) API to fetch cocktail data:

- Search endpoint: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s={query}`
- Returns cocktail details including ingredients, measurements, and instructions

## Project Structure

```
├── index.html          # Main HTML file
├── app.js              # Main application logic with Haunted components
├── styles.css          # CSS styles
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Components

- **CocktailApp** - Main application component
- **CocktailCard** - Individual cocktail display card
- **ShoppingList** - Shopping list management
- **Toast** - Notification system

## License

MIT License

