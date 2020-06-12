package session

import (
	"time"

	"github.com/apm-ai/DataV/web/pkg/db"
	"github.com/apm-ai/DataV/web/pkg/log"
	"github.com/labstack/echo"
	"go.uber.org/zap"
)

type Session struct {
	Token      string `json:"token"`
	User       *User  `json:"user"`
	CreateTime time.Time
}

func storeSession(s *Session) error {
	q := `UPDATE sessions SET  user_id=? WHERE sid=?`
	_, err := db.SQL.Exec(q, s.User.ID, s.Token)
	if err != nil {
		log.Out.Info("store session error", zap.Error(err))
		return err
	}
	return nil
}

func loadSession(sid string) *Session {
	var userid string
	q := `SELECT user_id FROM sessions WHERE sid=?`
	err := db.SQL.QueryRow(q, sid).Scan(&userid)
	if err != nil {
		return nil
	}

	user := loadUser(userid)
	if user == nil {
		return nil
	}
	return &Session{
		Token: sid,
		User:  user,
	}
}

func deleteSession(sid string) {
	q := `DELETE FROM sessions  WHERE sid=?`
	_, err := db.SQL.Exec(q, sid)
	if err != nil {
		log.Out.Info("delete session error", zap.Error(err))
	}
}

func getToken(c echo.Context) string {
	return c.Request().Header.Get("X-Token")
}

func GetUser(c echo.Context) *User {
	token := getToken(c)
	sess := loadSession(token)
	if sess == nil {
		// 用户未登陆或者session失效
		return nil
	}

	return sess.User
}
