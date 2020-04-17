import * as Yup from 'yup'; // nao da para importar igual as outras, yup nao tem export default
import User from '../models/User';
import File from '../models/File';

class UserController {
  // método de  criação
  async store(req, res) {
    // validações de dados de entrada
    const schema = Yup.object().shape({
      // definindo o formato do objeto que é passado no body
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // validando se o req.body está de acordo com o schema definido
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExist = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExist) {
      return res.status(400).json({ error: 'User already exist.' });
    }

    const { id, name, email, helper } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      helper,
    });
  }

  // método index, lista usuários
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(users);
  }

  // método de update, usuario fazer modificação de seus dados cadastrais
  async update(req, res) {
    // validações de dados de entrada
    const schema = Yup.object().shape({
      // definindo o formato do objeto que é passado no body
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        // when é uma validação condicional
        .when('oldPassword', (oldPassword, field) =>
          // field se refere ao password
          oldPassword ? field.required() : field
        ),
      // quando o usuario quiser alterar a senha vai ter que ter uma confirmação da senha
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // validando se o req.body está de acordo com o schema definido
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // console.log(req.userId);  pegar a variavel que vai inserida dentro do req pelo middleware auth
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // validação se o usuário vai cadastrar email novo
    if (email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });

      if (userExist) {
        return res.status(400).json({ error: 'User already exist.' });
      }
    }

    // validação se o usuario quer trocar a senha e se a oldPassword bate com a cadastrada
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // se todas as verificações passarem ele dá update no usuario com as informações do body
    await user.update(req.body);

    const { id, name, helper, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      helper,
      avatar,
    });
  }
}

export default new UserController();
