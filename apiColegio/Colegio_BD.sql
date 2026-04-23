create table colegio
(
	id_colegio serial primary key,
	nombre varchar(100) not null,
	direccion varchar(150),
	telefono varchar(20)
);

create table materia 
(
	id_materia serial primary key,
	nombre varchar(100) not null,
	descripcion text
);

create table estudiante
(
	id_estudiante serial primary key,
	nombre varchar(100) not null,
	apellido varchar(100) not null,
	edad int,
	grado varchar(20),
	id_colegio int,
	id_materia int,	
	constraint fk_colegio foreign key (id_colegio) references colegio(id_colegio) on delete set null,
	constraint fk_materia foreign key (id_materia) references materia(id_materia) on delete set null
);

INSERT INTO colegio (nombre, direccion, telefono)
VALUES ('Colegio Técnico Central', 'San José, Costa Rica', '2222-3333');

INSERT INTO materia (nombre, descripcion)
VALUES 
('Matemáticas', 'Estudio de números y operaciones'),
('Programación', 'Introducción a la programación'),
('Ciberseguridad', 'Seguridad informática básica');

INSERT INTO estudiante (nombre, apellido, edad, grado, id_colegio, id_materia)
VALUES
('Carlos', 'Ramírez', 16, '10°', 1, 2),
('María', 'Fernández', 17, '11°', 1, 3),
('Luis', 'Gómez', 15, '9°', 1, 1);

select * from colegio;
select * from materia;
select * from estudiante;
