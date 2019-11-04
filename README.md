# express-ad-basicauth

[![Build Status](https://ci.p.webish.one/buildStatus/icon?job=express-ad-basicauth%2Fmaster&style=flat-square)](https://ci.p.webish.one/blue/organizations/jenkins/express-ad-basicauth/activity)
![npm (tag)](https://img.shields.io/npm/v/express-ad-basicauth/latest?style=flat-square) ![npm](https://img.shields.io/npm/v/express-ad-basicauth?style=flat-square) [![GitHub issues](https://img.shields.io/github/issues/flweber/express-ad-basicauth?style=flat-square)](https://github.com/flweber/express-ad-basicauth/issues) ![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/flweber/express-ad-basicauth?style=flat-square) ![npm](https://img.shields.io/npm/dt/express-ad-basicauth?style=flat-square) [![GitHub license](https://img.shields.io/github/license/flweber/express-ad-basicauth?style=flat-square)](https://github.com/flweber/express-ad-basicauth/blob/master/LICENSE) 

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
