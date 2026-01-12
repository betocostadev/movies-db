package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"time"
	"errors"

	"betocosta.com/reelingit/data"
	"betocosta.com/reelingit/logger"
	"betocosta.com/reelingit/models"
	"betocosta.com/reelingit/token"
	"github.com/golang-jwt/jwt/v5"
)

// Define request structure
type RegisterRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Define request structure
type AuthRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// JWT - JWT Token

type AuthResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	JWT     string `json:"jwt"`
}

type AccountHandler struct {
	storage data.AccountStorage
	logger  *logger.Logger
}

// Utility functions
func (h *AccountHandler) writeJSONResponse(w http.ResponseWriter, data interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		h.logger.Error("Failed to encode response", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return err
	}
	return nil
}

func (h *AccountHandler) handleStorageError(w http.ResponseWriter, err error, context string) bool {
    if err != nil {
        switch err {
        case data.ErrAuthenticationValidation, data.ErrUserAlreadyExists, data.ErrRegistrationValidation:
            w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(http.StatusUnauthorized)
            json.NewEncoder(w).Encode(AuthResponse{Success: false, Message: err.Error()})
            return true
        case data.ErrUserNotFound:
            w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(http.StatusNotFound)
            json.NewEncoder(w).Encode(AuthResponse{Success: false, Message: "User not found"})
            return true
        default:
            h.logger.Error(context, err)
            w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(http.StatusInternalServerError)
            json.NewEncoder(w).Encode(AuthResponse{Success: false, Message: "Internal server error"})
            return true
        }
    }
    return false
}

func (h *AccountHandler) Register(w http.ResponseWriter, r *http.Request) {

	// Parse request body
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.logger.Error("Failed to decode registration request", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Register the user
	success, err := h.storage.Register(req.Name, req.Email, req.Password)
	if h.handleStorageError(w, err, "Failed to register user") {
		return
	}

	// Return success response
	response := AuthResponse{
		Success: success,
		Message: "User registered successfully",
		JWT:     token.CreateJWT(models.User{Email: req.Email, Name: req.Name}, *h.logger),
	}

	if err := h.writeJSONResponse(w, response); err == nil {
		h.logger.Info("Successfully registered user with email: " + req.Email)
	}
}

func (h *AccountHandler) Authenticate(w http.ResponseWriter, r *http.Request) {
	// Parse request body
	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.logger.Error("Failed to decode authentication request", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(AuthResponse{Success: false, Message: "Invalid request body"})
		return
	}

	// Authenticate the user
	success, err := h.storage.Authenticate(req.Email, req.Password)
	if h.handleStorageError(w, err, "Failed to authenticate user") {
		return
	}

	// Return success response
	response := AuthResponse{
			Success: success,
			Message: "User Authenticated at: " + time.Now().Format("Jan 2, 2006 at 3:04PM"),
			JWT:     token.CreateJWT(models.User{Email: req.Email}, *h.logger),
    }

    if err := h.writeJSONResponse(w, response); err == nil {
			h.logger.Info("Successfully authenticated user with email: " + req.Email)
    }
}

func (h *AccountHandler) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenStr := r.Header.Get("Authorization")
		if tokenStr == "" {
			http.Error(w, "Missing authorization token", http.StatusUnauthorized)
			return
		}

		// Remove "Bearer " prefix if present
		tokenStr = strings.TrimPrefix(tokenStr, "Bearer ")

		// Parse and validate the token

		token, err := jwt.Parse(tokenStr,
			func(t *jwt.Token) (interface{}, error) {
				// Ensure the signing method is HMAC
				if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, jwt.ErrSignatureInvalid
				}
				return []byte(token.GetJWTSecret(*h.logger)), nil
			},
		)
		if err != nil || !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// Extract claims from the token
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			return
		}

		// Get the email from claims
		email, ok := claims["email"].(string)
		if !ok {
			http.Error(w, "Email not found in token", http.StatusUnauthorized)
			return
		}

		// Inject email into the request context
		ctx := context.WithValue(r.Context(), "email", email)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// GetUserFromRequest extracts the JWT from the Authorization header, validates it,
// extracts the user's email, and fetches the user from the database.
func GetUserFromRequest(r *http.Request, storage data.AccountStorage, log *logger.Logger) (*models.User, error) {
    authHeader := r.Header.Get("Authorization")
    if authHeader == "" {
			return nil, errors.New("missing authorization header")
    }

    // Remove "Bearer " prefix if present
    tokenStr := strings.TrimPrefix(authHeader, "Bearer ")

    // Parse and validate the token
    tokenObj, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, jwt.ErrSignatureInvalid
			}
			return []byte(token.GetJWTSecret(*log)), nil
    })
    if err != nil || !tokenObj.Valid {
			return nil, errors.New("invalid token")
    }

    // Extract claims from the token
    claims, ok := tokenObj.Claims.(jwt.MapClaims)
    if !ok {
			return nil, errors.New("invalid token claims")
    }

    // Get the email from claims
    email, ok := claims["email"].(string)
    if !ok {
			return nil, errors.New("email not found in token")
    }

    // Fetch the user from the database
    // You may need to get a storage instance here; adjust as needed for your app
    user, err := storage.GetAccountDetails(email)
    if err != nil {
			return nil, err
    }

    return &user, nil
}

func (h *AccountHandler) SaveToCollection(w http.ResponseWriter, r *http.Request) {
	type CollectionRequest struct {
		MovieID    int    `json:"movie_id"`
		Collection string `json:"collection"`
	}

	var req CollectionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.logger.Error("Failed to decode collection request", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	email, ok := r.Context().Value("email").(string)
	if !ok {
		http.Error(w, "Unable to retrieve email", http.StatusInternalServerError)
		return
	}

	success, err := h.storage.SaveCollection(models.User{Email: email},
		req.MovieID, req.Collection)
	if h.handleStorageError(w, err, "Failed to save to collection") {
		return
	}

	response := AuthResponse{
		Success: success,
		Message: "Movie added to " + req.Collection + " successfully",
	}

	if err := h.writeJSONResponse(w, response); err == nil {
		h.logger.Info("Successfully saved movie to " + req.Collection)
	}
}

func (h *AccountHandler) GetFavorites(w http.ResponseWriter, r *http.Request) {
	email, ok := r.Context().Value("email").(string)
	if !ok {
		http.Error(w, "Unable to retrieve email", http.StatusInternalServerError)
		return
	}
	details, err := h.storage.GetAccountDetails(email)
	if err != nil {
		http.Error(w, "Unable to retrieve collections", http.StatusInternalServerError)
		return
	}
	if err := h.writeJSONResponse(w, details.Favorites); err == nil {
		h.logger.Info("Successfully sent favorites")
	}
}

func (h *AccountHandler) GetWatchlist(w http.ResponseWriter, r *http.Request) {
	email, ok := r.Context().Value("email").(string)
	if !ok {
		http.Error(w, "Unable to retrieve email", http.StatusInternalServerError)
		return
	}
	details, err := h.storage.GetAccountDetails(email)
	if err != nil {
		http.Error(w, "Unable to retrieve collections", http.StatusInternalServerError)
		return
	}
	if err := h.writeJSONResponse(w, details.Watchlist); err == nil {
		h.logger.Info("Successfully sent favorites")
	}
}

func (h *AccountHandler) GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	user, err := GetUserFromRequest(r, h.storage, h.logger)
	if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
	}
	json.NewEncoder(w).Encode(user.ToUserInfo())
}

func NewAccountHandler(storage data.AccountStorage, log *logger.Logger) *AccountHandler {
	return &AccountHandler{
		storage: storage,
		logger:  log,
	}
}
