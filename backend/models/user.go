package models

type User struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Favorites []Movie
	Watchlist []Movie
}

type UserInfo struct {
    ID        int     `json:"id"`
    Name      string  `json:"name"`
    Email     string  `json:"email"`
    Favorites []Movie `json:"favorites"`
    Watchlist []Movie `json:"watchlist"`
}

func (u User) ToUserInfo() UserInfo {
	return UserInfo{
		ID: 			 u.ID,
		Name:      u.Name,
		Email:     u.Email,
		Favorites: u.Favorites,
		Watchlist: u.Watchlist, 
	}
}