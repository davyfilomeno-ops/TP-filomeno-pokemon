const adresseAPI = "https://tyradex.app/api/v1/pokemon";

const champID = document.querySelector("#pokemon-id");
const boutonRecherche = document.querySelector("#bouton-recherche");
const boutonTous = document.querySelector("#bouton-tous");
const message = document.querySelector("#message");
const resultats = document.querySelector("#resultats");

function afficherChargement(texte) {
    message.textContent = texte;
    message.className = "";
    resultats.innerHTML = "";
    boutonRecherche.disabled = true;
    boutonTous.disabled = true;
}

function terminerChargement() {
    boutonRecherche.disabled = false;
    boutonTous.disabled = false;
}

function afficherErreur(texte) {
    message.textContent = texte;
    message.className = "erreur";
    resultats.innerHTML = "";
}

function creerCarte(pokemon) {
    const carte = document.createElement("article");
    carte.className = "pokemon";

    const image = document.createElement("img");
    image.src = pokemon.sprites?.regular || "";
    image.alt = `Sprite de ${pokemon.name?.fr || "ce Pokémon"}`;
    image.loading = "lazy";

    const nom = document.createElement("h2");
    nom.textContent = pokemon.name?.fr || "Nom inconnu";

    const identifiant = document.createElement("p");
    identifiant.textContent = `ID Pokédex : ${pokemon.pokedex_id}`;

    const categorie = document.createElement("p");
    categorie.textContent = `Catégorie : ${pokemon.category || "Non renseignée"}`;

    const lienSprite = document.createElement("a");
    lienSprite.href = pokemon.sprites?.regular || "#";
    lienSprite.target = "_blank";
    lienSprite.rel = "noopener noreferrer";
    lienSprite.textContent = "Ouvrir le sprite";

    carte.append(image, nom, identifiant, categorie, lienSprite);
    return carte;
}

function afficherPokemons(pokemons) {
    const fragment = document.createDocumentFragment();

    for (const pokemon of pokemons) {
        fragment.appendChild(creerCarte(pokemon));
    }

    resultats.replaceChildren(fragment);
}

async function rechercherParID() {
    const id = Number(champID.value);

    if (!Number.isInteger(id) || id <= 0) {
        afficherErreur("Entre un ID positif, par exemple 25.");
        return;
    }

    afficherChargement("Recherche en cours...");

    try {
        const reponse = await fetch(`${adresseAPI}/${id}`);

        if (!reponse.ok) {
            throw new Error(`statut ${reponse.status}`);
        }

        const pokemon = await reponse.json();
        message.textContent = "Pokémon trouvé :";
        afficherPokemons([pokemon]);
    } catch (erreur) {
        afficherErreur(`Impossible de récupérer ce Pokémon (${erreur.message}).`);
    } finally {
        terminerChargement();
    }
}

async function afficherTousLesPokemons() {
    afficherChargement("Chargement de tous les Pokémon...");

    try {
        const reponse = await fetch(adresseAPI);

        if (!reponse.ok) {
            throw new Error(`statut ${reponse.status}`);
        }

        const pokemons = await reponse.json();
        message.textContent = `${pokemons.length} Pokémon trouvés :`;
        afficherPokemons(pokemons);
    } catch (erreur) {
        afficherErreur(`Impossible de récupérer la liste (${erreur.message}).`);
    } finally {
        terminerChargement();
    }
}

boutonRecherche.addEventListener("click", rechercherParID);
boutonTous.addEventListener("click", afficherTousLesPokemons);

champID.addEventListener("keydown", (evenement) => {
    if (evenement.key === "Enter") {
        rechercherParID();
    }
});
