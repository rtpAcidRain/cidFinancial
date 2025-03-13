package sqlite

import (
	"cid/financemanager/internal/storage"
	"database/sql"
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/mattn/go-sqlite3"
)

type Storage struct {
	db *sql.DB
}

func New(storagePath string, sqlInitFilePath string) (*Storage, error) {
	const op = "storage.sqlite.New"

	db, err := sql.Open("sqlite3", storagePath)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	queries, err := readSQLFile(sqlInitFilePath)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	for _, query := range queries {
		_, err := db.Exec(query)
		if err != nil {
			return nil, fmt.Errorf("%s: %w", op, err)
		}
	}

	return &Storage{db: db}, nil
}

func readSQLFile(filePath string) ([]string, error) {
	// Read the SQL file
	content, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read SQL file: %v", err)
	}

	// Split the file content into individual queries
	queries := strings.Split(string(content), ";")

	// Trim whitespace and filter out empty queries
	cleanedQueries := []string{}
	for _, query := range queries {
		query = strings.TrimSpace(query)
		if query != "" {
			cleanedQueries = append(cleanedQueries, query)
		}
	}

	return cleanedQueries, nil
}

type Base struct {
	ID           int    `json:"id"`
	Basename     string `json:"basename"`
	Password     string `json:"password"`
	MainCurrency int    `json:"main_currency"`
	Url          string `json:"url"`
}

func (s *Storage) SaveBase(basename string, password string, mainCurrency int, url string) (int64, error) {
	const op = "storage.sqlite.SaveBase"

	stmt, err := s.db.Prepare("INSERT INTO base(basename, password, main_currency, url) VALUES(?, ?, ?, ?)")
	if err != nil {
		return 0, fmt.Errorf("%s: %w", op, err)
	}

	res, err := stmt.Exec(basename, password, mainCurrency, url)
	if err != nil {
		if sqliteErr, ok := err.(sqlite3.Error); ok && sqliteErr.ExtendedCode == sqlite3.ErrConstraintUnique {
			return 0, fmt.Errorf("%s: %w", op, storage.ErrBaseExists)
		}

		return 0, fmt.Errorf("%s: %w", op, err)
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("%s: failed to get last insert id: %w", op, err)
	}

	return id, nil
}

func (s *Storage) GetBaseByUrl(url string) (*Base, error) {
	const op = "storage.sqlite.GetBaseByUrl"

	query := "SELECT id, basename, password, main_currency, url FROM base WHERE url = ?"
	stmt, err := s.db.Prepare(query)
	if err != nil {
		return nil, fmt.Errorf("%s: prepare statement: %w", op, err)
	}

	var base Base
	err = stmt.QueryRow(url).Scan(&base.ID, &base.Basename, &base.Password, &base.MainCurrency, &base.Url)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, storage.ErrBaseNotFound
		}
		return nil, fmt.Errorf("%s: execute statement: %w", op, err)
	}
	return &base, nil
}

func (s *Storage) DeleteBase(id int) error {
	const op = "storage.sqlite.DeleteBase"

	stmt, err := s.db.Prepare("DELETE FROM base WHERE id = ?")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	res, err := stmt.Exec(id)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("%s: failed to get rows affected: %w", op, err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("%s: %w", op, storage.ErrBaseNotFound)
	}

	return nil
}
