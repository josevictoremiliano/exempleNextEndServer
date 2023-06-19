import fastify from 'fastify';
import cors from '@fastify/cors';
import Multipart from '@fastify/multipart';
import { PrismaClient } from '@prisma/client';
import jwt from '@fastify/jwt';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import getRoutes from './routes/users';

const prisma = new PrismaClient();

const app = fastify();

interface error {
  error: string;
}

app.register(Multipart);
app.register(cors, { origin: true });
app.register(jwt, { secret: 'josev' });

app.register(getRoutes)

app.post<{ Body: { email: string; password: string } }>(
  '/login',
  async (request, reply) => {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const error: error = {
        error: 'Usuário não encontrado',
      };

    } else {

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        const error: error = {
          error: 'Senha incorreta',
        };
      } else {
        const token = app.jwt.sign({ id: user.id, email: user.email, name: user.name });


        return { token };
      }
    }
  }
);

app.post<{ Body: { email: string; password: string; name: string} }>(
  '/register',
  async (request, reply) => {
    const { name, email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const error: error = {
        error: 'Usuário já existe',
      };
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = app.jwt.sign({ id: newUser.id });

      return { token };
    }
  }
);




app.listen(3030, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
