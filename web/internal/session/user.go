package session

import (
	"sync"

	"github.com/apm-ai/DataV/web/utils"
	"github.com/imdevlab/g"
	"go.uber.org/zap"
)

var UserMap = &sync.Map{}
var UserList = make([]*User, 0)

type User struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	AvatarURL string `json:"avatarUrl"`
	Email     string `json:"email"`
	Mobile    string `json:"mobile"`
	Priv      string `json:"priv"`
}

func loadUser(id string) *User {
	var name, email, mobile, priv, avatarURL string
	err := utils.DB.QueryRow(`SELECT name,email,mobile,priv,avatar_url FROM users WHERE id=?`, id).Scan(&name, &email, &mobile, &priv, &avatarURL)
	if err != nil {
		g.L.Warn("access database error", zap.Error(err))
		return nil
	}

	if priv == "" {
		return nil
	}

	return &User{
		ID:        id,
		Name:      name,
		AvatarURL: avatarURL,
		Email:     email,
		Mobile:    mobile,
		Priv:      priv,
	}
}
