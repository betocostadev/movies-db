package routes

// HTTP Routes
const (
	// Movie API endpoints
	MoviesTopRoute    = "/api/movies/top"
	MoviesRandomRoute = "/api/movies/random"
	MoviesSearchRoute = "/api/movies/search"
	MoviesRoute       = "/api/movies/"

	// Genre API endpoints
	GenresRoute = "/api/genres"

	// Account API endpoints
	AccountRegisterRoute     = "/api/account/register/"
	AccountAuthenticateRoute = "/api/account/authenticate/"

	// Protected API endpoints
	AccountFavorites = "/api/account/favorites/"
	AccountWatchlist = "/api/account/watchlist/"
	AccountData = "/api/account/"
	SaveToCollection = "/api/account/save-to-collection/"
)
