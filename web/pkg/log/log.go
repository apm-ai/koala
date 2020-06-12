package log

import (
	"os"
	"strings"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var Out *zap.Logger
var DL *zap.Logger
var level string

func InitLogger(level string) {
	level = strings.ToLower(level)
	var lv zapcore.Level
	switch level {
	case "debug":
		lv = zap.DebugLevel
	case "info":
		lv = zap.InfoLevel
	case "warn":
		lv = zap.WarnLevel
	case "error":
		lv = zap.ErrorLevel
	}

	atom := zap.NewAtomicLevel()

	// To keep the example deterministic, disable timestamps in the output.
	encoderCfg := zap.NewProductionEncoderConfig()
	encoderCfg.EncodeTime = zapcore.ISO8601TimeEncoder
	Out = zap.New(zapcore.NewCore(
		zapcore.NewConsoleEncoder(encoderCfg),

		zapcore.Lock(os.Stdout),
		atom,
	), zap.AddCaller())

	atom.SetLevel(lv)

	atom1 := zap.NewAtomicLevel()

	// To keep the example deterministic, disable timestamps in the output.
	encoderCfg1 := zap.NewProductionEncoderConfig()
	encoderCfg1.EncodeTime = zapcore.ISO8601TimeEncoder
	DL = zap.New(zapcore.NewCore(
		zapcore.NewConsoleEncoder(encoderCfg1),

		zapcore.Lock(os.Stdout),
		atom1,
	), zap.AddCaller())

	atom1.SetLevel(zap.DebugLevel)
}
