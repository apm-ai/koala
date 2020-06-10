package service

import (
	"net/http"
	"time"

	"github.com/apm-ai/DataV/web/config"
	"github.com/apm-ai/DataV/web/internal/session"
	"github.com/apm-ai/DataV/web/utils"
	"github.com/gocql/gocql"
	"github.com/imdevlab/g"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
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
	s.initCql()
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

func (s *Service) initCql() {
	cqlCluster := gocql.NewCluster(config.Data.Storage.Cluster...)
	cqlCluster.Keyspace = config.Data.Storage.Keyspace
	cqlCluster.Consistency = gocql.One
	cqlCluster.Timeout = 30 * time.Second
	cqlCluster.ReconnectInterval = 500 * time.Millisecond

	//设置连接池的数量,默认是2个（针对每一个host,都建立起NumConns个连接）
	cqlCluster.NumConns = config.Data.Storage.NumConns

	// cluster.RetryPolicy = &RetryPolicy{NumRetries: -1, Interval: 2}

	cql, err := cqlCluster.CreateSession()
	if err != nil {
		g.L.Fatal("Init web cql connections error", zap.String("error", err.Error()))
	}
	utils.StaticCQL = cql

	// cqlCluster1 := gocql.NewCluster(config.Data.Storage.Cluster...)
	// cqlCluster1.Keyspace = "tracing_data_v2"
	// cqlCluster1.Timeout = 30 * time.Second
	// cqlCluster1.ReconnectInterval = 500 * time.Millisecond
	// cqlCluster1.PageSize = 5000

	// //设置连接池的数量,默认是2个（针对每一个host,都建立起NumConns个连接）
	// cqlCluster1.NumConns = 30

	// // cluster.RetryPolicy = &RetryPolicy{NumRetries: -1, Interval: 2}

	// cql1, err := cqlCluster1.CreateSession()
	// if err != nil {
	// 	g.L.Fatal("Init web cql connections error", zap.String("error", err.Error()))
	// }
	// utils.TraceCQL = cql1
}
