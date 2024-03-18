# Api documentation



### User routes :

/createAccount

Route permettant de créer un nouvel utilisateur. 

```
firstname: { type: String, required },
lastname: { type: String, required },
owner: { type: Boolean, required },
email: { type: String, required },
password: { type: String, required },
isAdmin: { type: Boolean, default: false },
```
return a success response if everything is good or an error response

/login

Route permettant de se connecter. 

```
email: { type: String, required },
password: { type: String, required },
```

router.post("/login", login);
router.get("/status", verifyJWT, getStatus)
