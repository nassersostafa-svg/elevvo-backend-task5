# Elevvo Backend Task 5: PostgreSQL + Prisma

Express + TypeScript REST API backed by PostgreSQL through Prisma ORM.

## Models
- User (id, name, email unique)
- Post (id, title, content, authorId) with a one-to-many relation to User

## Setup
1. npm install
2. Create a .env file: DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/elevvo_task5"
3. npx prisma migrate dev
4. npx tsx src/index.ts

## Endpoints
- POST/GET /users, GET/PUT/DELETE /users/:id
- POST/GET /posts, DELETE /posts/:id