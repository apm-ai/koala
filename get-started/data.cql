CREATE KEYSPACE datav WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3'}  
    AND durable_writes = true;


USE datav;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id               text,
    password         text,
    name             text,
    mobile           text,
    email            text,
    priv             text,
    avatar_url       text,
    last_login_date  text,
    PRIMARY KEY (id)
) WITH gc_grace_seconds = 10800;


INSERT INTO account (id,name,password,priv,email) VALUES ('admin','admin','admin','super_admin','cto@188.com');


CREATE TABLE IF NOT EXISTS sessions (
    sid              text,     -- session id
    user_id          text,     
    PRIMARY KEY (sid)
) WITH gc_grace_seconds = 10800 AND  default_time_to_live = 259200;