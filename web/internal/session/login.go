package session

import (
	"net/http"
	"strconv"
	"time"

	"github.com/apm-ai/DataV/web/pkg/common"
	"github.com/apm-ai/DataV/web/pkg/db"
	"github.com/apm-ai/DataV/web/pkg/i18n"
	"github.com/apm-ai/DataV/web/pkg/log"
	"github.com/labstack/echo"
	"go.uber.org/zap"
)

type LoginModel struct {
	UserID   string `json:"userid"`
	Password string `json:"password"`
}

func Login(c echo.Context) error {
	var lm = &LoginModel{}
	c.Bind(&lm)

	userid := lm.UserID
	password := lm.Password

	log.Out.Info("login with password:", zap.String("userid", userid))

	// 检查信息是否正确
	var pw, priv, name, mobile, email, avatarUrl string
	row := db.SQL.QueryRow(`select password,priv,name,mobile,email,avatar_url FROM users WHERE id=?`, userid)
	err := row.Scan(&pw, &priv, &name, &mobile, &email, &avatarUrl)
	if err != nil {
		log.Out.Info("access database error", zap.Error(err))
		return c.JSON(http.StatusInternalServerError, common.ResponseErrorMessage(nil, i18n.ON, i18n.DbErrMsg))
	}

	if pw == "" || pw != password {
		return c.JSON(http.StatusUnauthorized, common.ResponseErrorMessage(nil, i18n.ON, i18n.UsePwInvalidMsg))
	}

	// 若之前已登陆，则删除之前的登陆信息
	token := getToken(c)
	deleteSession(token)

	token = strconv.FormatInt(time.Now().UnixNano(), 10)

	// 设置权限
	if priv == "" {
		priv = common.PRIV_NORMAL
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
		return c.JSON(http.StatusInternalServerError, common.ResponseErrorMessage(nil, i18n.ON, i18n.DbErrMsg))
	}

	// 更新数据库中的user表
	_, err = db.SQL.Exec(`UPDATE users SET last_login_date=? WHERE id=?`, time.Now().Unix(), session.User.ID)
	if err != nil {
		log.Out.Info("access database error", zap.Error(err))
	}

	return c.JSON(http.StatusOK, common.ResponseSuccess(session))
}

func Logout(c echo.Context) error {
	token := getToken(c)
	// 删除用户的session
	deleteSession(token)

	return c.JSON(http.StatusOK, common.ResponseSuccess(nil))
}
