package models

type Pokemon struct {
	PokedexID int    `json:"pokedex_id"`
	Category  string `json:"category"`
	Name      struct {
		Fr string `json:"fr"`
	} `json:"name"`
	Sprites struct {
		Regular string `json:"regular"`
	} `json:"sprites"`
	
}
 

type types struct {
	Name string `json:"name"`
	Image string `json:"image"`
}


