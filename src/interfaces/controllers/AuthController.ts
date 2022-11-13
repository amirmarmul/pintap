import GenerateAccessToken from '../../app/usecases/GenerateAccessToken';

export default {

  async login(req: any, res: any) {

    const { name, password } = req.body;

    const dependencies = req.dependencies;

    const user = await GenerateAccessToken(name, password, dependencies);

    return res.send(user);
  },
}
