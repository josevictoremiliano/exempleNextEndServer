import fastify from 'fastify';
import * as z from 'zod';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const server = fastify();

const prisma = new PrismaClient();

// Definir o esquema de validação usando zod
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

// Rota de registro
server.post('/register', async (request, reply) => {
  try {
    // Validar os dados de entrada
    const { name, email, password } = userSchema.parse(request.body);

    // Verificar se o usuário já está registrado
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('O usuário já está registrado');
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    reply.send({ message: 'Registro bem-sucedido' });
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
});

// Rota de login
server.post('/login', async (request, reply) => {
  try {
    // Validar os dados de entrada
    const { email, password } = userSchema.parse(request.body);

    // Verificar se o usuário existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    reply.send({ message: 'Login bem-sucedido' });
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
});

// Lidar com erros de rota não encontrada
server.setNotFoundHandler((request, reply) => {
  reply.code(404).send({ error: 'Rota não encontrada' });
});

// Lidar com erros de tipo de mídia não suportado
server.setErrorHandler((error, request, reply) => {
  if (error instanceof z.ZodError) {
    reply.code(415).send({ error: 'Tipo de mídia não suportado' });
  } else {
    reply.send({ error: 'Erro interno do servidor' });
  }
});