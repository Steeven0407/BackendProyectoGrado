CREATE DATABASE bdrepositorio;

CREATE TABLE usuarios (
    codigo SERIAL PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(300) UNIQUE NOT NULL,
    contrasena VARCHAR(400) NOT NULL,
    primerinicio BOOLEAN DEFAULT TRUE
);

CREATE TABLE procesos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    objetivo TEXT,
    alcance TEXT,
    fecha_creacion DATE NOT NULL,
    usuario_subida INTEGER NOT NULL,
    CONSTRAINT fk_procesos_usuario
        FOREIGN KEY (usuario_subida)
        REFERENCES usuario(codigo)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE factor (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    alcance TEXT,
    responsable VARCHAR(100),
    proceso_asociado INTEGER NOT NULL,
    CONSTRAINT fk_factor_proceso
        FOREIGN KEY (proceso_asociado)
        REFERENCES procesos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE indicadores (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    alcance TEXT,
    responsable VARCHAR(100),
    proceso_asociado INTEGER NOT NULL,
    CONSTRAINT fk_indicadores_proceso
        FOREIGN KEY (proceso_asociado)
        REFERENCES procesos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    usuario_subida INTEGER NOT NULL,
    CONSTRAINT fk_eventos_usuario
        FOREIGN KEY (usuario_subida)
        REFERENCES usuario(codigo)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    archivos TEXT,
    usuario_subida INTEGER NOT NULL,
    pertenece_a INTEGER,
    CONSTRAINT fk_categoria_usuario
        FOREIGN KEY (usuario_subida)
        REFERENCES usuario(codigo)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_categoria_padre
        FOREIGN KEY (pertenece_a)
        REFERENCES categoria(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);


CREATE TABLE documentos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(100),
    descripcion TEXT,
    extension VARCHAR(10),
    tamanio INTEGER,
    enlace TEXT
);