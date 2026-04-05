const TYPE_COLORS = {
  fire: "#FF6B35",
  water: "#4A90D9",
  grass: "#5DAA4D",
  electric: "#F5C518",
  ice: "#74CEC0",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#89AAE6",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
};
const STAT_COLORS = {
  hp: "#ff5959",
  attack: "#f5ac78",
  defense: "#fae078",
  "special-attack": "#9db7f5",
  "special-defense": "#a7db8d",
  speed: "#fa92b2",
};
const STAT_LABELS = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "Sp.Atk",
  "special-defense": "Sp.Def",
  speed: "SPD",
};

let currentCry = "";
let legacyCry = "";

function playCry() {
  if (!currentCry) return;
  const a = document.getElementById("cry-audio");
  a.src = currentCry;
  a.play().catch(() => {});
}

function playLegacyCry() {
  if (!legacyCry) return;
  const a = document.getElementById("cry-audio");
  a.src = legacyCry;
  a.play().catch(() => {});
}

async function searchPokemon() {
  const query = document.getElementById("search").value.trim().toLowerCase();
  if (!query) return;

  document.getElementById("error").textContent = "";
  document.getElementById("card").classList.remove("visible");
  let infoBlock = document.getElementsByClassName("info");
  Array.from(infoBlock).forEach((elem) => (elem.style.display = "none"));
  
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!res.ok) throw new Error("Pokémon not found");
    const pd = await res.json();

    const sd = await fetch(pd.species.url).then((r) => r.json());

    const id = pd.id;
    const name = pd.name;
    const types = pd.types.map((t) => t.type.name);
    const artwork = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    const sprite = pd.sprites.front_default;
    const height = (pd.height / 10).toFixed(1) + " m";
    const weight = (pd.weight / 10).toFixed(1) + " kg";
    const abilities = pd.abilities
      .map((a) => a.ability.name.replace(/-/g, " "))
      .join(", ");
    const capture = sd.capture_rate;
    const genus = sd.genera?.find((g) => g.language.name === "en")?.genus || "";
    const desc =
      sd.flavor_text_entries
        ?.find((e) => e.language.name === "en")
        ?.flavor_text.replace(/\f/g, " ") || "";
    const generation =
      sd.generation?.name?.replace("generation-", "").toUpperCase() || "";
    currentCry = pd.cries?.latest || "";
    legacyCry = pd.cries?.legacy || "";

    document.getElementById("bg").style.backgroundImage = `url('${artwork}')`;

    document.getElementById("num").textContent =
      `#${String(id).padStart(3, "0")}`;
    document.getElementById("artwork").src = artwork;
    document.getElementById("sprite").src = sprite;
    document.getElementById("name").textContent = name;
    document.getElementById("genus").textContent = genus;
    document.getElementById("generation").textContent = generation;
    document.getElementById("height").textContent = height;
    document.getElementById("weight").textContent = weight;
    document.getElementById("abilities").textContent = abilities;
    document.getElementById("capture").textContent = capture;
    document.getElementById("desc").textContent = desc;

    document.getElementById("types").innerHTML = types
      .map(
        (t) =>
          `<span class="type-badge" style="background:${TYPE_COLORS[t] || "#888"};color:#fff">${t}</span>`,
      )
      .join("");

    document.getElementById("stats").innerHTML = pd.stats
      .map((s) => {
        const key = s.stat.name;
        const val = s.base_stat;
        const pct = Math.min(100, Math.round((val / 255) * 100));
        return `<div class="stat-row">
            <span class="stat-label">${STAT_LABELS[key] || key}</span>
            <span class="stat-num">${val}</span>
            <div class="stat-bar">
              <div class="stat-fill" style="background:${STAT_COLORS[key] || "#aaa"}" data-pct="${pct}"></div>
            </div>
          </div>`;
      })
      .join("");

    const hasModernCry = currentCry ? "block" : "none";
    const hasLegacyCry = legacyCry ? "block" : "none";
    document.getElementById("cry-btn").style.display = hasModernCry;
    document.getElementById("legacy-cry-btn").style.display = hasLegacyCry;

    document.getElementById("card").classList.add("visible");

    requestAnimationFrame(() => {
      document.querySelectorAll(".stat-fill").forEach((bar) => {
        bar.style.width = bar.dataset.pct + "%";
      });
    });

    if (currentCry) playCry();
  } catch (err) {
    document.getElementById("error").textContent = err.message;
  }
}

document.getElementById("search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchPokemon();
});
