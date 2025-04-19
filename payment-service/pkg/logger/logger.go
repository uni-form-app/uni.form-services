package logger

import (
	"fmt"
	"log"
	"time"
)

type Logger struct {
	name string
}

const (
	Reset    = "\033[0m"
	Red      = "\033[31m"
	BlueBold = "\033[34;1m"
	Yellow   = "\033[33m"
	Green    = "\033[32m"
)

func New(name string) *Logger {
	return &Logger{name: name}
}

func (l *Logger) log(color string, msg ...interface{}) {
	timestamp := time.Now().UTC().Format(time.RFC3339)
	message := fmt.Sprint(msg...)
	log.Printf("%s[%s] %s%s %s\n", color, timestamp, l.name, Reset, message)
}

func (l *Logger) Info(msg ...interface{})    { l.log(BlueBold, msg...) }
func (l *Logger) Warning(msg ...interface{}) { l.log(Yellow, msg...) }
func (l *Logger) Success(msg ...interface{}) { l.log(Green, msg...) }
func (l *Logger) Error(msg ...interface{})   { l.log(Red, msg...) }

func (l *Logger) HealthCheck(msg ...interface{}) {
	if time.Now().Minute()%10 == 0 {
		l.Success(msg...)
	}
}

// Helpers
func FatalError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func LogError(err error) {
	if err != nil {
		log.Println(err)
	}
}
