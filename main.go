package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"

	"tp-pokemon/api"
)

func main() {
	fmt.Print("Entre l'ID du Pokémon ou ALL pokemon : ")

	lecteur := bufio.NewReader(os.Stdin)
	saisie, err := lecteur.ReadString('\n')
	if err != nil {
		fmt.Fprintf(os.Stderr, "Saisie invalide : %v\n", err)
		os.Exit(1)
	}

	saisie = strings.TrimSpace(saisie)

	if strings.EqualFold(saisie, "ALL pokemon") {
		pokemons, err := api.GetAllPokemon()
		if err != nil {
			fmt.Fprintf(os.Stderr, "Impossible de récupérer les Pokémon : %v\n", err)
			os.Exit(1)
		}

		fmt.Printf("\n%d Pokémon trouvés :\n", len(pokemons))
		for _, pokemon := range pokemons {
			fmt.Printf("N°%d : %s\n", pokemon.PokedexID, pokemon.Name.Fr)
		}
		return
	}

	id, err := strconv.Atoi(saisie)
	if err != nil || id <= 0 {
		fmt.Fprintln(os.Stderr, "Entre un ID positif ou la commande ALL pokemon.")
		os.Exit(1)
	}

	pokemon, err := api.GetPokemonByID(id)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Impossible de récupérer le Pokémon : %v\n", err)
		os.Exit(1)
	}

	fmt.Printf(
		"\nPokémon trouvé :\nID Pokédex : %d\nNom : %s\nCatégorie : %s\nSprite : %s\n",
		pokemon.PokedexID,
		pokemon.Name.Fr,
		pokemon.Category,
		pokemon.Sprites.Regular,
	)
}
