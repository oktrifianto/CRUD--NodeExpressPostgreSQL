
# How? It is note about POSTGRESQL

## PostgreSQL 

<em>Installation</em>

```
brew install postgresql
```

<em>Running database</em>

```
brew services start postgresql
```

---

<em>Command Prompt</em>

Connect to the default `postgres` db with the default login information - no option flags

```
psql postgres
```

result, ...

`#` : logged in as the superuser / root

```
postgres=# 
```

command within `psql` start with a backslash `\`. Let's test command using `\conninfo`


```
postgres=# \conninfo
You are connected to database "postgres" as user "oktrifianto" via socket in "/tmp" at port "5432".
```

Reference table of a few common commands, 

`\q`    --- exit psql connection

`\c`    --- connect to a new database

`\dt`   --- list all tables

`\du`   --- list all roles

`\list` --- list databases

Example:

```
postgres=# \du
                                    List of roles
 Role name  |                         Attributes                         | Member of 
------------+------------------------------------------------------------+-----------
 postgres   | Superuser, Create role, Create DB                          | {}
 your_name  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

```


---

## Create a role in PostgreSQL

a role called `me` and give it a password `awesome`.

```
CREATE ROLE me WITH LOGIN PASSWORD 'awesome';
```

result:
```
your_name=# CREATE ROLE me WITH LOGIN PASSWORD 'awesome';
CREATE ROLE
```



```
                                    List of roles
 Role name  |                         Attributes                         | Member of 
------------+------------------------------------------------------------+-----------
 me         |                                                            | {}
 postgres   | Superuser, Create role, Create DB                          | {}
 my_name    | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
```

we want `me` to be able to create a database

```
ALTER ROLE me CREATEDB;
```

result
```
 Role name  |                         Attributes                         | Member of 
------------+------------------------------------------------------------+-----------
 me         | Create DB                                                  | {}
 postgres   | Superuser, Create role, Create DB                          | {}
 my_name    | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
```

quit session root

```
postgres=# \q
```


connect postgres with me

```
psql -d postgres -U me

postgres=> \conninfo
You are connected to database "postgres" as user "me" via socket in "/tmp" at port "5432".
```

---

## Creating a database in Postgres

```
postgres=> CREATE DATABASE api;
CREATE DATABASE
```

check db

```
postgres=> \list
                                List of databases
    Name    |   Owner    | Encoding | Collate | Ctype |     Access privileges     
------------+------------+----------+---------+-------+---------------------------
 api        | me         | UTF8     | C       | C     | 

```

connect new `api` database with `me` using `\c` command.

```
postgres=> \c api
You are now connected to database "api" as user "me".
api=> 
```

---

## Creating a table in POSTGRES

```
postgres=> CREATE TABLE users (ID SERIAL PRIMARY KEY,
postgres(> name VARCHAR(30),
postgres(> email VARCHAR(30));
CREATE TABLE
```

test 

```
postgres=> SELECT * FROM users;
 id | name | email 
----+------+-------
(0 rows)
```

test: add two `users` to init data.

```
postgres=> INSERT INTO users (name, email) VALUES ('John', 'john@mail.com');
INSERT 0 1

postgres=> INSERT INTO users (name, email) VALUES ('Jane', 'jane@mail.com');
INSERT 0 1

```

let see:

```
postgres=> SELECT * FROM users;
 id | name |     email     
----+------+---------------
  1 | John | john@mail.com
  2 | Jane | jane@mail.com
(2 rows)
```