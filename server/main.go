// Package main provides ...
package main

import (
	"crypto/rsa"
	"encoding/json"
	"errors"
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
	http.Handle("/api/login", appHandler(LoginHandler))
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
