import ListUsers from '../../app/usecases/ListUsers';
import CreateUser from '../../app/usecases/CreateUser';
import GetUser from '../../app/usecases/GetUser';
import UpdateUser from '../../app/usecases/UpdateUser';
import DeleteUser from '../../app/usecases/DeleteUser';

export default {

  async list(req: any, res: any) {

    const dependencies = req.dependencies;

    const users = await ListUsers(dependencies);

    return res.send(users);
  },

  async create(req: any, res: any) {

    const { name, password } = req.body;

    const dependencies = req.dependencies;

    const user = await CreateUser(name, password, dependencies);

    return res.send(user);
  },

  async get(req: any, res: any) {

    const userId = req.params.userId;

    const dependencies = req.dependencies;

    const user = await GetUser(userId, dependencies);

    return res.send(user);
  },

  async update(req: any, res: any) {

    const userId = req.params.userId;

    const { name, password } = req.body;

    const dependencies = req.dependencies;

    const user = await UpdateUser(userId, name, password, dependencies);

    return res.send(user);
  },

  async delete(req: any, res: any) {

    const userId = req.params.userId;

    const dependencies = req.dependencies;

    await DeleteUser(userId, dependencies);

    return res.status(204).send();
  }
}
