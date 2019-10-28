# express-ad-basicauth

Active directory basic auth middleware for express.

## API

### Simple usage

```javascript
const  app  =  require("express")();
const  AdAuth  =  require("./src");
const port = 8080;

AdAuth.initAd(
  {
    url:  "ldap://ad.local:389",
    baseDN:  "dc=ad,dc=local",
    username:  "",
    password:  ""
  },
  null
);

app.use(AdAuth.app);

app.get("/", (req, res) => {
  res.send("Secret...!");
});

app.listen(port, () =>  console.log(`App is listening on port ${port}!`));
```

### Check group membership

```javascript
const  app  =  require("express")();
const  AdAuth  =  require("./src");
const port = 8080;

AdAuth.initAd(
  {
    url:  "ldap://ad.local:389",
    baseDN:  "dc=ad,dc=local",
    username:  "",
    password:  ""
  },
  "domain-admins"
);

app.use(AdAuth.app);

app.get("/", (req, res) => {
  res.send("Only for domain admins!");
});

app.listen(port, () =>  console.log(`App is listening on port ${port}!`));
```

### Edit / prepare username and / or password

```javascript
...
AdAuth.editName(user  => {
  if (!user.includes("@")) user  =  `${user}@ad.local`;
  return  user;
});

AdAuth.editPass(password => {
  password = "Replace the password or do something else here";
  return  password;
});
...
```

## Active Directory configuration

### Simple config

```javascript
{
    url:  "ldap://ad.local:389",
    baseDN:  "dc=ad,dc=local",
    username:  "",
    password:  ""
}
```

### Simple Query

```javascript
{
    url:  "ldap://ad.local:389",
    baseDN:  "dc=ad,dc=local",
    cn: "*Exchange*",
    username:  "",
    password:  ""
}
```

### More Options

For more options visit the `activedirectory2` package.
You can find it [here](https://github.com/jsumners/node-activedirectory). All options are available.
