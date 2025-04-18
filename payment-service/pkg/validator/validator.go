package validator

import (
	"github.com/go-playground/validator/v10"
)

// Validator é uma estrutura que encapsula a biblioteca de validação
type Validator struct {
	validate *validator.Validate
}

// New cria uma nova instância do Validator
func New() *Validator {
	return &Validator{
		validate: validator.New(),
	}
}

// Validate executa a validação em uma struct
func (v *Validator) Validate(i interface{}) error {
	return v.validate.Struct(i)
}
