package main

import (
    "github.com/gorilla/mux"
    "log"
    "net/http"
    "time"
)

func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Do stuff here
        log.Println(r.RequestURI)
        // Call the next handler, which can be another middleware in the chain, or the final handler.
        next.ServeHTTP(w, r)
    })
}

func main() {
    r := mux.NewRouter()

    url := []string{
	"/contact",
    }

    for _, val := range url {
	r.HandleFunc(val, index).Methods("GET")
    }
    buildHandler := http.FileServer(http.Dir("../build"))
    r.PathPrefix("/").Handler(buildHandler)
    r.Use(loggingMiddleware)
    srv := &http.Server{
        Handler:      r,
        Addr:         ":80",
        WriteTimeout: 15 * time.Second,
        ReadTimeout:  15 * time.Second,
    }

    log.Fatal(srv.ListenAndServe())

}

func index(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "../build/index.html")
}
