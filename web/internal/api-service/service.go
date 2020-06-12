package apiservice

import (
	"net/http"

	"database/sql"

	"github.com/apm-ai/DataV/web/internal/session"
	"github.com/apm-ai/DataV/web/pkg/common"
	"github.com/apm-ai/DataV/web/pkg/config"
	"github.com/apm-ai/DataV/web/pkg/db"
	"github.com/apm-ai/DataV/web/pkg/i18n"
	"github.com/apm-ai/DataV/web/pkg/log"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	_ "github.com/mattn/go-sqlite3"
	"go.uber.org/zap"
)

// Web ...
type Service struct {
}

// New ...
func New() *Service {
	return &Service{}
}

// Start ...1
func (s *Service) Start() error {
	s.initDB()
	go func() {
		e := echo.New()
		e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
			AllowHeaders:     append([]string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept}, "X-Token"),
			AllowCredentials: true,
		}))

		e.Use(middleware.GzipWithConfig(middleware.GzipConfig{Level: 5}))

		e.POST("/api/login", session.Login)
		e.POST("/api/logout", session.Logout)

		e.Logger.Fatal(e.Start(config.Data.Web.Addr))
	}()

	return nil
}

// Close ...
func (s *Service) Close() error {
	return nil
}

func (s *Service) checkLogin(f echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		li := session.GetUser(c)
		if li == nil {
			return c.JSON(http.StatusUnauthorized, common.ResponseErrorMessage(nil, i18n.ON, i18n.NeedLoginMsg))
		}

		return f(c)
	}
}

func (s *Service) initDB() {
	d, err := sql.Open("sqlite3", "./datav.db")
	if err != nil {
		log.Out.Fatal("open sqlite error", zap.Error(err))
	}
	db.SQL = d
}
