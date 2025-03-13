package storage

import "errors"

var (
	ErrBaseNotFound = errors.New("Base not found")
	ErrBaseExists   = errors.New("Base exists")
)
