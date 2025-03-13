package base

import (
	resp "cid/financemanager/internal/lib/api/response"
	"cid/financemanager/internal/lib/logger/sl"
	"cid/financemanager/internal/lib/random"
	"cid/financemanager/internal/storage"
	"cid/financemanager/internal/storage/sqlite"
	"errors"
	"io"
	"net/http"

	"log/slog"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"github.com/go-playground/validator/v10"
)

type BaseSaveRequest struct {
	Basename     string `json:"basename"`
	Password     string `json:"password"`
	MainCurrency int    `json:"main_currency"`
	Url          string `json:"url"`
}

type BaseSaveResponse struct {
	BaseId int64  `json:'base_id'`
	Url    string `json:url`
}

type BaseSaver interface {
	SaveBase(basename string, password string, mainCurrency int, url string) (int64, error)
}

const urlLength = 6

func New(log *slog.Logger, baseSaver BaseSaver) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		const op = "handlers.base.New"

		log := log.With(
			slog.String("op", op),
			slog.String("request_id", middleware.GetReqID(r.Context())),
		)

		var req BaseSaveRequest

		err := render.DecodeJSON(r.Body, &req)
		if errors.Is(err, io.EOF) {
			log.Error("request body is empty")

			render.JSON(w, r, resp.Error("empty request"))

			return
		}

		if err != nil {
			log.Error("failed to decode request body", sl.Err(err))

			render.JSON(w, r, resp.Error("failed to decode request"))

			return
		}

		log.Info("request body decoded", slog.Any("request", req))

		if err := validator.New().Struct(req); err != nil {
			validateErr := err.(validator.ValidationErrors)

			log.Error("invalid request", sl.Err(err))

			render.JSON(w, r, resp.ValidationError(validateErr))

			return
		}

		currency := req.MainCurrency
		if currency == 0 {
			currency = 1
		}

		url := random.NewRandomString(urlLength)

		id, err := baseSaver.SaveBase(req.Basename, req.Password, currency, url)
		if errors.Is(err, storage.ErrBaseExists) {
			log.Info("base already exists", slog.String("base", req.Basename))

			render.JSON(w, r, resp.Error("base already exists"))

			return
		}
		if err != nil {
			log.Error("failed to add base", sl.Err(err))

			render.JSON(w, r, resp.Error("failed to add base"))

			return
		}

		resp.ResponseOK(w, r, BaseSaveResponse{
			BaseId: id,
			Url:    url,
		})
	}
}

type BaseGetRequest struct {
	Url string `json:"url"`
}

type BaseGetter interface {
	GetBaseByUrl(url string) (*sqlite.Base, error)
}

func GetByUrl(log *slog.Logger, baseGetter BaseGetter) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		const op = "handlers.base.GetByUrl"

		log := log.With(
			slog.String("op", op),
			slog.String("request_id", middleware.GetReqID(r.Context())),
		)

		alias := chi.URLParam(r, "alias")
		if alias == "" {
			http.Redirect(w, r, "/", http.StatusFound)
		}

		base, err := baseGetter.GetBaseByUrl(alias)
		if errors.Is(err, storage.ErrBaseExists) {
			log.Info("base already exists", slog.String("base", alias))

			render.JSON(w, r, resp.Error("base already exists"))

			return
		}
		if err != nil {
			log.Error("failed to add base", sl.Err(err))

			render.JSON(w, r, resp.Error("failed to add base"))

			return
		}

		resp.ResponseOK(w, r, &base)
	}
}
