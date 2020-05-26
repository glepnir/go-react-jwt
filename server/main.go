// Package main provides ...
package main

import (
	"crypto/rsa"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

const (
	privKeyPath = "keys/app.rsa"
	pubKeyPath  = "keys/app.rsa.pub"
)

type User struct {
	UserName string
	PassWord string
}

type Token struct {
	Token string `json:"token"`
}

var (
	verifyKey *rsa.PublicKey
	signKey   *rsa.PrivateKey
)

func main() {
	http.HandleFunc("/api/login", LoginHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func init() {
	verifyBytes, err := ioutil.ReadFile(pubKeyPath)
	verifyKey, err = jwt.ParseRSAPublicKeyFromPEM(verifyBytes)
	if err != nil {
		log.Fatal("Error parse private key")
		return
	}
	signBytes, err := ioutil.ReadFile(privKeyPath)
	signKey, err = jwt.ParseRSAPrivateKeyFromPEM(signBytes)
	if err != nil {
		log.Fatal("Error reading public key")
		return
	}
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	if r.Method != "POST" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintln(w, "No POST", r.Method)
		return
	}
	username := r.FormValue("username")
	password := r.FormValue("password")
	if username != "admin" && password != "123456" {
		w.WriteHeader(http.StatusForbidden)
		fmt.Fprintf(w, "Wrong info")
		return
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
		return
	}
	response := Token{tokenstring}
	jsonResponse(response, w)
}

func jsonResponse(response interface{}, w http.ResponseWriter) {
	json, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
}
