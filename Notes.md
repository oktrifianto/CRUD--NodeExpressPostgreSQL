
# How?

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


