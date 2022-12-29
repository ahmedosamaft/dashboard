

# Full-Stack Dashboard

## To Login send POST request to :
`{{URL}}api/v1/users/login`
and body:
```
{
"email":DUMMY_EMAIL,
"password":DUMMY_PASSWORD
}
```
## To Sign up send POST request to :
`{{URL}}api/v1/users/signup`
and body:
```
{
"email":DUMMY_EMAIL,
"password":DUMMY_PASSWORD,
"confirmPassword": DUMMY_PASSWORD
}
```
- [x] ***and you must be logged in and send your JWT Token in header Authorization***

## Forget Password
### 1. send POST request to :
`{{URL}}api/v1/users/forgetpassword`
and body:
```
{
"email":DUMMY_EMAIL
}
```
- [x] ***then API will response with resetPasswordToken you must save it in cookies
also it will Send a pin code to the email you sent in the body***

### 2. send POST request to:
`{{URL}}api/v1/users/resetpasswordcheck`
and body:
```
{
"pin": DUMMY_PIN_SENT_TO_DUMMY_EMAIL
}
```
- [x] ***YOU MUST SEND AUTHORIZATION TOKEN IN HEADER THAT SERVER SENT IN THE (1) STEP***

### 3. send PATCH request to:
`{{URL}}api/v1/users/resetpassword`
and body:
```
{
"pin": DUMMY_PIN_SENT_TO_DUMMY_EMAIL,
"password": DUMMY_NEW_PASSWORD,
"confirmPassword":DUMMY_NEW_PASSWORD
}
```
- [x] ***YOU MUST SEND AUTHORIZATION TOKEN IN HEADER THAT SERVER SENT IN THE (1) STEP***

## Update user password:
send PATCH request to :
`{{URL}}api/v1/users/updatepassword`
and body:
```
{
"lastPassword":OLD_PASSWORD,
"password": NEW_PASSWORD,
"confirmPassword": NEW_PASSWORD
}
```
- [x] ***AND SEND USER LOGIN TOKEN IN AUTHORIZATION HEADER***

## To get all users:
send GET request to:
`{{URL}}api/v1/users`

## To get one user:
send GET request to:
`{{URL}}api/v1/users/:id`
- [x] ***and you must send user login token and you must be Admin role***

## to update one user:
send PATCH request to:
`{{URL}}api/v1/users/:id`

## to delete one user:
send DELETE request to:
`{{URL}}api/v1/users/:id`
