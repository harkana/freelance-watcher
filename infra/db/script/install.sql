CREATE DATABASE freelance_watcher;

USE freelance_watcher;

CREATE TABLE platform (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE user (
    id BIGSERIAL PRIMARY KEY,
    pseudo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE offer (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price BIGINT NOT NULL,
    link VARCHAR(255) NOT NULL,
    targetId VARCHAR(255) NOT NULL,
    platformId BIGINT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE cron_task (
    id BIGSERIAL PRIMARY KEY,
    platformId BIGINT PRIMARY KEY,
    userId BIGINT PRIMARY KEY,
    keywords TEXT NOT NULL
);
