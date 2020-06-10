package sqls

// go and sqlite types compare
// |int       | integer           |
// |int64     | integer           |
// |float64   | float             |
// |bool      | integer           |
// |[]byte    | blob              |
// |string    | text              |
// |time.Time | timestamp/datetime
// Tutorial: https://www.runoob.com/sqlite/sqlite-index.html
var CreateTableSqls = []string{
	`CREATE TABLE IF NOT EXISTS users (
		id textll not null primary key, 
		name text default 'New User',
		password text not null,
		mobile text default '',
		email text not null,
		priv text not null,
		avatar_url text default '',
		last_login_date timestamp DEFAULT CURRENT_TIMESTAMP
	);
	CREATE INDEX index_name
		ON users (name);
	INSERT INTO users (id,name,password,priv,email) VALUES ('admin','admin','admin','super_admin','cto@188.com');
	`,

	`CREATE TABLE IF NOT EXISTS sessions (
		sid              text primary key,   
		user_id          text
	);
	`,
}

var DropTableSqls = []string{
	`drop table users`,
	`drop table sessions`,
}
