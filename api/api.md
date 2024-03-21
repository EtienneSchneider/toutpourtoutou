# Api documentation

## User routes :

#### /createAccount POST

Route permettant de créer un nouvel utilisateur.

```
{
  firstname: string, required,
  lastname: string, required,
  owner: boolean, required,
  email: string, required,
  password: string, required,
  isAdmin: boolean, default: false,
}
```

Return a success response if everything is good or an error response. Return an error instead

#### /login POST

Route permettant de se connecter.

```
{
  email: string, required,
  password: string, required,
}
```

Return a success response with a token the user connected.

#### /status GET

Token checking route.

```
authorization : Bearer token (local storage)
```

Return a success response with the user connected.

## Dogs routes :

#### /addDog POST

Dog adding route.

```
{
  chipNumber: string, required ,
  owner: ObjectId, required,
  identification: {
    name: string,
    gender: boolean,
    birthDate: string
    breed: string
  },
  health: {
    sterilized: boolean,
    heathIssues: array,
    otherHeathIssues: array,
    treatments: array,
    otherTreatments: array,
    weight: array, (couples of date JJ/MM/YYYY and weight) : [{date: ..., weight: ...}]
  },
  feed: {
    meals: number,
    feedBasis: array,
    otherFeedBasis: array,
  },
  activity: {
    outings: number
  },
  education: {
    training: boolean,
    trainingDog: boolean,
  }
}
```
Return a success response if everything is good. 
Return an error instead

#### /userDogs GET

Route that return all dogs for a user.

```
{
  owner: string, required
}
```

Return an array containing all dogs owned by an user.

## Order routes :

#### /createOrder POST

Create order route.

```
{
  orderNumber: string, required,
  orderedProducts: array : [
    {
      serialNumber: string, quantity: number
    },
    ...
  ],
  orderDate: string (JJ/MM/YYYY), required
  user: ObjectId, required
}
```
Return a success response if everything is good. 
Return an error instead

#### /userOrders GET

Route that return all orders for a user.

```
{
  user: ObjectId, required
}
```
Return an array containing all orders of an user.

## Product routes :

#### /addProduct POST

Create product route.

```
{
  serialNumber: string, required,
  brand: string, required,
  description: string, required,
  type: string, required,
  dogType: string, required,
  image: string, required,
  price: string, required,

}
```
Return a success response if everything is good. 
Return an error instead.

### /allProducts GET

Route that return all products.
Return an array containing all products.

#### /recommendations GET

Route that return all products recommendation.

```
{
  dogs: array : Dogs[], required,
}
```

Return an array containing all recommendations for one user's dogs.