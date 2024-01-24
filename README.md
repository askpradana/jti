# Tingali.ie

Tingali.ie is a fullstack app that generates and manages phone numbers for different providers. It uses Go for the backend, Next.js for the frontend, and PostgreSQL for the database.

## Features

- Authentication with Google using NextAuth
- Input form to submit phone number and provider
- Auto function to generate 25 random phone numbers and providers
- Output table to view, edit, and delete the data stored in the database

## Installation

To run this project, you need to have Go, Next.js, and PostgreSQL installed on your system.

1. Clone this repository
2. configure your own db on be/src/db.go
3. on fe/ edit file 'jti' to .env
4. On fe/ Run `npm install` to install the dependencies for the frontend
5. on fe/ Run `npm run dev` to start the frontend server on http://localhost:3000
6. on be/ Run `go mod download` to install the dependencies for the backend
7. on be/ Run `go run main.go` to start the backend server on http://localhost:4321

## Usage

- To use the app, you need to sign in with your Google account(Not necessary im not restricting tho)
- To submit a phone number and a provider, go to the /input page and fill the form
- To generate 25 random phone numbers and providers, go to the /input page and click the Auto button
- To view, edit, and delete the data, go to the /output page and use the table actions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details

I hope this helps you with your project. Good luck! 🍀.