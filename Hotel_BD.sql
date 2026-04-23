create table clientes
(
	id_clientes serial primary key,
	nombre varchar(100) not null,
	direccion varchar(150),
	telefono varchar(20)
);

create table tipos_habitacion
(
	id_tipos serial primary key,
	tamano varchar(100) not null,
	descripcion text
);

create table habitaciones 
(
	id_habi serial primary key,
	nombre varchar(100) not null,
	descripcion text,
	id_tipos int,
	constraint fk_habitaciones_tipo foreign key (id_tipos) references tipos_habitacion(id_tipos) on delete set null
);

create table reserva
(
	id_reserva serial primary key,
	tipo varchar(100) not null,
	descripcion text,
	id_habi int,
	id_clientes int,
	constraint fk_reserva_habitaciones foreign key (id_habi) references habitaciones(id_habi) on delete set null,
	constraint fk_reserva_clientes foreign key (id_clientes) references clientes(id_clientes) on delete set null
);

create table pagos
(
	id_pagos serial primary key,
	cantidad int not null,
	descripcion text,
	id_reserva int,
	constraint fk_pagos_reserva foreign key (id_reserva) references reserva(id_reserva) on delete set null
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(50) NOT NULL
);

INSERT INTO usuarios (usuario, contrasena) VALUES 
('admin', '1234'),
('Andres', '1412'),
('Dani', '6666');


insert into clientes (nombre, direccion, telefono) values
('Juan Perez', 'San José', '8888-1111'),
('Maria Lopez', 'Alajuela', '8888-2222'),
('Carlos Ruiz', 'Heredia', '8888-3333');

insert into tipos_habitacion (tamano, descripcion) values
('Simple', 'Habitación individual'),
('Doble', 'Para dos personas'),
('Suite', 'Habitación de lujo');

insert into habitaciones (nombre, descripcion, id_tipos) values
('Hab 101', 'Vista al jardín', 1),
('Hab 102', 'Vista al mar', 2),
('Hab 201', 'Suite presidencial', 3);

insert into reserva (tipo, descripcion, id_habi, id_clientes) values
('Online', 'Reserva por app', 1, 1),
('Presencial', 'Reserva en recepción', 2, 2),
('Online', 'Reserva web', 3, 3);

insert into pagos (cantidad, descripcion, id_reserva) values
(50000, 'Pago completo', 1),
(30000, 'Adelanto', 2),
(100000, 'Pago suite', 3);