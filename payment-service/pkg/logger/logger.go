package logger

import (
	"main/config"
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type Logger struct {
	*zap.SugaredLogger
}

func New(_ string) *Logger {
	loggerLevel := zap.InfoLevel
	if config.Env.Development {
		loggerLevel = zap.DebugLevel
	}

	// Arquivo para onde os logs vão ser escritos
	file, _ := os.OpenFile("logs/app.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder // formato mais legível

	core := zapcore.NewTee(
		// Log para o terminal
		zapcore.NewCore(zapcore.NewConsoleEncoder(encoderConfig), zapcore.AddSync(os.Stdout), loggerLevel),
		// Log para o arquivo
		zapcore.NewCore(zapcore.NewJSONEncoder(encoderConfig), zapcore.AddSync(file), loggerLevel),
	)

	logger := zap.New(core, zap.AddCaller(), zap.AddStacktrace(zapcore.ErrorLevel))

	return &Logger{SugaredLogger: logger.Sugar()}
}
