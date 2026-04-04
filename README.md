# 🧾 Pokédex Web App

A simple and interactive **Pokédex web application** built using JavaScript and the PokéAPI.
Search for any Pokémon and instantly view its stats, abilities, types, and more — with smooth animations and sound effects.

---

## 🚀 Features

- 🔍 Search Pokémon by **name or ID**
- 🖼️ Display **official artwork + sprite**
- 📊 Animated **stat bars**
- 🎨 Color-coded **types and stats**
- 🔊 Play **modern and legacy cries**
- 📖 Show **description, genus, and generation**
- ⚡ Smooth UI updates and animations

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **API:** PokéAPI (`https://pokeapi.co`)
- **Concepts Used:**
  - Async/Await
  - Fetch API
  - DOM Manipulation
  - Event Listeners
  - Dynamic Rendering

---

## 📂 Project Structure

```
project/
│── index.html
│── style.css
│── script.js
│── README.md
```

---

## ⚙️ How It Works

1. User enters a Pokémon name or ID
2. App fetches data from PokéAPI
3. Extracts:
   - Stats
   - Types
   - Abilities
   - Description

4. Dynamically updates UI
5. Animates stat bars and plays cry

---

## 📊 Stat Bar Logic

- Each stat is converted into a percentage:

  ```
  percentage = (stat / 255) * 100
  ```

- The width of the bar is updated using JavaScript:

  ```
  bar.style.width = percentage + "%"
  ```

- CSS handles smooth animation using:

  ```
  transition: width 0.8s ease;
  ```

---

## 🔊 Audio Feature

- Plays **latest Pokémon cry** automatically
- Optional button for **legacy cry**
- Uses HTML `<audio>` element dynamically

---

## 🎨 Customization

You can easily modify:

### Type Colors

```js
const TYPE_COLORS = {
  fire: "#FF6B35",
  water: "#4A90D9",
  ...
};
```

### Stat Colors

```js
const STAT_COLORS = {
  hp: "#ff5959",
  attack: "#f5ac78",
  ...
};
```

---

## 🧪 Future Improvements

- ⭐ Add favorites system (localStorage)
- 🔄 Show evolution chain
- ⚔️ Compare two Pokémon
- 🌙 Dark/Light theme toggle
- 📱 Better mobile responsiveness

---

## ▶️ How to Run

1. Download or clone the project
2. Open `index.html` in your browser
3. Start searching Pokémon

---

## ❗ Notes

- Requires internet connection (API-based)
- Some Pokémon may not have legacy cries

---

## 🙌 Credits

- Data provided by **PokéAPI**
- Inspired by classic Pokédex design

---

## 📌 Author

Created as a learning project to practice:

- JavaScript fundamentals
- API integration
- UI/UX design

---
