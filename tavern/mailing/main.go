package main

import (
	"os"
	"fmt"
	"net/http"
	"net/smtp"
	"encoding/json"
)

type EmailData struct {
	Subject string `json:"subject"`
	Body      string `json:"body"`
	Email	string `json:"email"`
}

func sendEmail(from, password, to, subject, body, smtpHost string, smtpPort int) error {
	auth := smtp.PlainAuth("", from, password, smtpHost)

	message := fmt.Sprintf("Subject: %s\r\n\r\n%s", subject, body)

	return  smtp.SendMail(fmt.Sprintf("%s:%d", smtpHost, smtpPort), auth, from, []string{to}, []byte(message))
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	 if r.Method == http.MethodOptions {
        // Preflight request, respond with 200 OK
        return
    }


    	from, exists := os.LookupEnv("from")
	if !exists {
		return
	}
	pwd, exists := os.LookupEnv("pwd")
	if !exists {
		return
	}
	to, exists := os.LookupEnv("to")
	
	if !exists {
		return
	}
	
	fmt.Println(from, to, pwd)
	
	if r.Method == http.MethodPost {
		// Parse the JSON request body
		var emailData EmailData
		err := json.NewDecoder(r.Body).Decode(&emailData)
		if err != nil {
			http.Error(w, "Invalid JSON format", http.StatusBadRequest)
			return
		}

		// Access the values from the JSON data
		subject := emailData.Subject
		body := emailData.Email + " \n\n"+emailData.Body
		if ok :=sendEmail(from, pwd, to, subject, body, "smtp.gmail.com", 587); ok  != nil {
			fmt.Println(ok)
		}
		fmt.Fprint(w, "Received a POST request. Email data processed successfully.")
	} else {
		// Handle other HTTP methods
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func main() {
	http.HandleFunc("/", helloHandler)

	err := http.ListenAndServe(":8086", nil)
	if err != nil {
		fmt.Println("Error:", err)
	}
}
