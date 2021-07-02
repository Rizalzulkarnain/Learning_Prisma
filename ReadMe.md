1. yarn add prisma -D, yarn prisma init, setup your DB on ".env".

2. npx prisma init, make model on schema.prisma:

`
model Car {
id Int @id @default(autoincrement())
model String
year Int
user User @relation(fields: [userId], references: [id])
userId Int
}

model User {
id Int @id @default(autoincrement())
username String @unique
password String
cars Car[]
}

`, and "yarn prisma format".

3. Migrate DB:
   `prisma migrate dev --name init`

4. make seeding file on folder prisma, and Seeding DB:
   `yarn prisma db seed --preview-feature`

- List Endpoint :

1.  GET http://localhost:5000
2.  GET http://localhost:5000/users/:id
3.  POST http://localhost:5000
4.  POST http://localhost:5000/addMany
5.  PUT http://localhost:5000
6.  DELETE http://localhost:5000/:id
7.  POST http://localhost:5000/addManyCars
8.  GET http://localhost:5000/cars
