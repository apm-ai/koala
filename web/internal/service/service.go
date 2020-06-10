package service

import (
	"net/http"

	"database/sql"

	"github.com/apm-ai/DataV/web/config"
	"github.com/apm-ai/DataV/web/internal/session"
	"github.com/apm-ai/DataV/web/utils"
	"github.com/imdevlab/g"
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

		e.POST("/web/login", session.Login)
		e.POST("/web/logout", session.Logout)

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
			return c.JSON(http.StatusOK, g.Result{
				Status:  http.StatusUnauthorized,
				ErrCode: g.NeedLoginC,
				Message: g.NeedLoginE,
			})
		}

		return f(c)
	}
}

func (s *Service) initDB() {
	db, err := sql.Open("sqlite3", "./datav.db")
	if err != nil {
		g.L.Fatal("open sqlite error", zap.Error(err))
	}
	utils.DB = db
}
