// Package main provides ...
package main

import (
	"context"
	"crypto/rsa"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

const (
	privKeyPath = "keys/app.rsa"
	pubKeyPath  = "keys/app.rsa.pub"
)

// User model struct
type User struct {
	UserName string `json:"username"`
	PassWord string `json:"password"`
}

// ResponseData define the content on response body
type ResponseData struct {
	Code  string `json:"code"`
	Token string `json:"token"`
	Msg   string `json:"msg"`
}

var (
	verifyKey *rsa.PublicKey
	signKey   *rsa.PrivateKey
)

func main() {
	mux := http.NewServeMux()
	mux.Handle("/api/login", appHandler(LoginHandler))
	srv := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Listen:%s\n", err)
		}
	}()
	log.Println("Server started")
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Recived shutdown signal,Server will closed")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server shutdown error:%s", err)
	}
	log.Println("Server exiting")
}

func init() {
	verifyBytes, err := ioutil.ReadFile(pubKeyPath)
	fatal(err)

	verifyKey, err = jwt.ParseRSAPublicKeyFromPEM(verifyBytes)
	fatal(err)

	signBytes, err := ioutil.ReadFile(privKeyPath)
	fatal(err)

	signKey, err = jwt.ParseRSAPrivateKeyFromPEM(signBytes)
	fatal(err)
}

func fatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

type appHandler func(w http.ResponseWriter, r *http.Request) error

func (fn appHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json;charset=utf-8")
	if err := fn(w, r); err != nil {
		http.Error(w, err.Error(), 500)
	}
}

// LoginHandler that handle the request
// and verify the user account and password
func LoginHandler(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "OPTIONS" {
		return nil
	}
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return err
	}
	if user.UserName != "admin" && user.PassWord != "123456" {
		w.WriteHeader(http.StatusForbidden)
		return errors.New("Wrong username or password")
	}
	t := jwt.New(jwt.SigningMethodRS256)
	t.Claims = jwt.MapClaims{
		"iss": "admin",
		"CustomUserInfo": struct {
			Name string
			Role string
		}{user.UserName, "Member"},
		"exp": time.Now().Add(time.Minute * 20).Unix(),
	}
	tokenstring, err := t.SignedString(signKey)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error while generate token")
		log.Printf("Token Singing error %v\n", err)
		return err
	}
	response := ResponseData{"1", tokenstring, "Login Success"}
	json, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}
	w.WriteHeader(http.StatusOK)
	w.Write(json)
	return nil
}
