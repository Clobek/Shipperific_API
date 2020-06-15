# Shipperific
Created by Team Codarific: Bryce Belock, Jonathan Rhymes.

## About
Shipperific is an application that allows you to search/look up a package that is currently being tracked by a carrier. It will take your input (tracking number/carrier) and return details about your package including location, date, etc. You're also able to sign up/in and save packages you would like to monitor or look back on.

## Back-End Setup
We decided to split our workload between front-end and back-end so the back-end was mostly done by Jon. Jon made use of express as our framework and mongoDB as our database with mongoose being the controller. Sensitive data is being encrypted with Bcrypt and user sessions are being managed with a JsonWebToken. Once our back-end was completed it was deployed to Heroku. 

### Repositories
[Front-End](https://github.com/Clobek/Shipperific)

[Back-End](https://github.com/Clobek/Shipperific_API)

### Hosts
[Front-End](https://shipperific.netlify.app)

[Back-End](https://shipperific.herokuapp.com/)