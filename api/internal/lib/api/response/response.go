package response

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/go-chi/render"
	"github.com/go-playground/validator/v10"
)

type ResponseStatuses struct {
	Status string `json:"status"`
	Error  string `json:"error,omitempty"`
}

const (
	StatusOK    = "OK"
	StatusError = "Error"
)

func OK() ResponseStatuses {
	return ResponseStatuses{
		Status: StatusOK,
	}
}

func Error(msg string) ResponseStatuses {
	return ResponseStatuses{
		Status: StatusError,
		Error:  msg,
	}
}

func ValidationError(errs validator.ValidationErrors) ResponseStatuses {
	var errMsgs []string

	for _, err := range errs {
		switch err.ActualTag() {
		case "required":
			errMsgs = append(errMsgs, fmt.Sprintf("field %s is a required field", err.Field()))
		case "base":
			errMsgs = append(errMsgs, fmt.Sprintf("field %s is not a valid URL", err.Field()))
		default:
			errMsgs = append(errMsgs, fmt.Sprintf("field %s is not valid", err.Field()))
		}
	}

	return ResponseStatuses{
		Status: StatusError,
		Error:  strings.Join(errMsgs, ", "),
	}
}

func ResponseOK(w http.ResponseWriter, r *http.Request, serverRes any) {
	(w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	render.JSON(w, r, serverRes)
}		
