import User from '../models/user.model.js';

export default async function (app) {
  // Cadastrar usuario
  app.post('/users', async (request, reply) => {
    try {
      const { name, email, password } = request.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return reply.status(400).send({ message: 'Email já está em uso' });
      }

      const user = new User({ name, email, password });
      await user.save();

      const userDto = { id: user._id, name: user.name, email: user.email };

      reply.status(201).send(userDto);
    } catch (error) {
      app.log.erro(error);
      reply.status(500).send({ message: 'Erro ao registrar o usuário' });
    }
  });
}
