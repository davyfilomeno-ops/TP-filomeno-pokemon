package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"tp-pokemon/modeles"
)

func GetAllPokemon() ([]models.Pokemon, error) {
	client := http.Client{
		Timeout: 10 * time.Second,
	}

	endpoint := "https://tyradex.app/api/v1/pokemon"

	request, err := http.NewRequest(http.MethodGet, endpoint, nil)
	if err != nil {
		return nil, fmt.Errorf("erreur de préparation de la requête : %w", err)
	}

	response, err := client.Do(request)
	if err != nil {
		return nil, fmt.Errorf("erreur lors de l'appel à l'API : %w", err)
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("l'API a répondu avec le statut %s", response.Status)
	}

	var pokemons []models.Pokemon
	if err := json.NewDecoder(response.Body).Decode(&pokemons); err != nil {
		return nil, fmt.Errorf("erreur de décodage du JSON : %w", err)
	}

	return pokemons, nil
}
