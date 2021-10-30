# ProShop

The repo for the MERN E-Commerce React App

# Abernachy's Pro-Shop

Welcome to my repo of the Traversify Media's ProShop course. I started this project on July 18th and after three months of juggling a multitude of real life events, I was finally able to finish the course. This course helped teach me a multitude of new technologies that I could use for future repos like Redux, Concurrently, Morgan, bCrypt, etc. I plan to do a writeup of that experience in my Learning Folder repo.

## How to install, configure , and set up this repo.

Clone the repo and do npm install in both the root and the front end. Then set up your .env file as shown below:

'''
NODE_ENV = development
PORT = 5000
MONGO_URI = ${MongoDB URI} (you set this up)
JWT_SECRET =${JWT Secret} (you also set that up)
PAYPAL_CLIENT_ID= ${PayPal sandbox ID} (you also set that up)

'''

### Running the server and the client

'''
npm run dev -> concurrently starts the back and front end
npm run data:import -> imports the seed data into the database
'''
