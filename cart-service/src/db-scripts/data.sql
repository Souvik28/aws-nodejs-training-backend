create extension if not exists "uuid-ossp";

create table if not exists users (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    email text,
    password text
);

create table if not exists carts (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid not null references users(id) on delete cascade,
    created_at date not null default current_date,
    updated_at date not null default current_date
);

create table if not exists cart_items (
    id uuid default uuid_generate_v4() primary key,
    cart_id uuid not null references carts(id) on delete cascade,
    product_id uuid not null,
    count int not null default 0
);

create table if not exists orders (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid not null references users(id) on delete cascade,
    cart_id uuid not null references carts(id) on delete cascade,
    payment json,
    delivery json,
    comments text,
    status text,
    total int not null default 0
);

insert into users (id, name, email, password) 
values ('89223ab8-f323-4c2b-97ca-4a2314a0ccd9', 'test_user_1', 'test1@test.com', 'test_password_1'),
       ('1d5c1c52-386f-4ff9-8f5c-a2ef3318d801', 'test_user_2', 'test2@test.com', 'test_password_2'),
       ('777e1f4b-c3c9-4eeb-b46f-77048af7a283', 'test_user_3', 'test3@test.com', 'test_password_3');

insert into carts (id, user_id, created_at, updated_at) 
values ('d91a3408-666f-4c2c-8fd6-a418f039c5cf', '89223ab8-f323-4c2b-97ca-4a2314a0ccd9', '2022-11-21', '2022-11-21'),
       ('8e54cc12-5d5c-4622-b460-dbec65378804', '1d5c1c52-386f-4ff9-8f5c-a2ef3318d801', '2022-11-21', '2022-11-21');

insert into cart_items (cart_id, product_id, count) 
values ('d91a3408-666f-4c2c-8fd6-a418f039c5cf', '7567ec4b-b10c-48c5-9345-fc73c48a80b2', 2),
       ('d91a3408-666f-4c2c-8fd6-a418f039c5cf', '7567ec4b-b10c-48c5-9345-fc73c48a80a8', 1),
       ('d91a3408-666f-4c2c-8fd6-a418f039c5cf', '7567ec4b-b10c-48c5-9345-fc73c48a80a1', 3),
       ('8e54cc12-5d5c-4622-b460-dbec65378804', '7567ec4b-b10c-48c5-9345-fc73c48a80a8', 1),
       ('8e54cc12-5d5c-4622-b460-dbec65378804', '9604691e-cfc5-4564-a55d-3e73982de444', 4);
