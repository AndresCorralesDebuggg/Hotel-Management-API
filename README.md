Hotel Management API

This project is my first attempt at building and testing API connections using JavaScript. It is a simple REST API for managing a hotel system, including clients, rooms, reservations, and payments.

Technologies Used
Node.js
Express
PostgreSQL
pg (node-postgres)
CORS

Database Structure
The database includes the following tables:

clientes → stores client information
tipos_habitacion → room categories (simple, double, suite)
habitaciones → hotel rooms
reserva → reservations
pagos → payment records
API Endpoints
GET routes
/clientes → get all clients
/tipos_habitacion → get room types
/habitaciones → get all rooms
/reserva → get reservations
/pagos → get payments
POST routes
/clientes → create a new client
DELETE routes
/habitaciones/:id_habi → delete a room
