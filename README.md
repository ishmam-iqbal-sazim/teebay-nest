# Teebay

An app for all your renting and buying/selling needs

# To run the project on your localhost

## Install Docker

Follow the installation guide in their [site](https://docs.docker.com/compose/install/)

## Clone the repo

Navigate to your desired directory

Run the following commands in your terminal

`git clone git@github.com:Md-Ishmam-Iqbal/teebay.git teebay`

`cd teebay`

## docker build

Prior to running the `docker compose up --build` command please ensure that the **DATABASE_URL**, in `teebay/backend/.env`, for **localhost** is **commented out** and not the **docker** url

Run the command `docker compose up --build`

This will run the application at http://localhost:5173

If you are using docker desktop, you can find a running container called teebay

## If docker doesn't work

Clone the repo

`git clone git@github.com:Md-Ishmam-Iqbal/teebay.git teebay`

Via terminal, navigate to the frontend directory `cd teebay/frontend` and run `npm run dev`

Via terminal, navigate to the backend directory `cd teebay/backend` and run `npm run dev`

This will run the application at http://localhost:5173
