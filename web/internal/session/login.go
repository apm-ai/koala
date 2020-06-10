package session

import (
	"net/http"
	"strconv"
	"time"

	"github.com/apm-ai/DataV/web/utils"
	"github.com/imdevlab/g"
	gutils "github.com/imdevlab/g/utils"
	"github.com/labstack/echo"
	"go.uber.org/zap"
)

func Login(c echo.Context) error {
	userid := c.FormValue("userid")
	password := c.FormValue("password")

	g.L.Info("login with password:", zap.String("userid", userid))

	// 检查信息是否正确
	var pw, priv, name, mobile, email, avatarUrl string
	row := utils.DB.QueryRow(`select password,priv,name,mobile,email,avatar_url FROM users WHERE id=?`, userid)
	err := row.Scan(&pw, &priv, &name, &mobile, &email, &avatarUrl)
	if err != nil {
		g.L.Info("access database error", zap.Error(err))
		return c.JSON(http.StatusOK, g.Result{
			Status:  http.StatusInternalServerError,
			ErrCode: g.DatabaseC,
			Message: g.DatabaseE,
		})
	}

	if pw == "" || pw != password {
		return c.JSON(http.StatusOK, g.Result{
			Status:  http.StatusUnauthorized,
			ErrCode: g.UserNotExistOrPwC,
			Message: g.UserNotExistOrPwE,
		})
	}

	// 若之前已登陆，则删除之前的登陆信息
	token := getToken(c)
	deleteSession(token)

	token = strconv.FormatInt(time.Now().UnixNano(), 10)

	// 设置权限
	if priv == "" {
		priv = g.PRIV_NORMAL
	}

	session := &Session{
		Token: token,
		User: &User{
			ID:        userid,
			Priv:      priv,
			Name:      name,
			Email:     email,
			Mobile:    mobile,
			AvatarURL: avatarUrl,
		},
		CreateTime: time.Now(),
	}
	//sub token验证成功，保存session
	err = storeSession(session)
	if err != nil {
		return c.JSON(http.StatusOK, g.Result{
			Status:  http.StatusInternalServerError,
			ErrCode: g.DatabaseC,
			Message: g.DatabaseE,
		})
	}

	// 更新数据库中的user表
	_, err = utils.DB.Exec(`UPDATE users SET last_login_date=? WHERE id=?`, gutils.Time2StringSecond(time.Now()), session.User.ID)
	if err != nil {
		g.L.Info("access database error", zap.Error(err))
	}

	return c.JSON(http.StatusOK, g.Result{
		Status: http.StatusOK,
		Data:   session,
	})
}

func Logout(c echo.Context) error {
	token := getToken(c)
	// 删除用户的session
	deleteSession(token)

	return c.JSON(http.StatusOK, g.Result{
		Status:  http.StatusOK,
		Message: "Successfully log out",
	})
}
