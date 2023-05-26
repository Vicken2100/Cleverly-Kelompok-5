import { AuthRespository_Interface } from "../contract/RepositoryContract";
import User, {
  UsersAtrribute,
  UsersAtrributeCreation,
} from "../db/models/users";

class AuthRespository implements AuthRespository_Interface {
  private static instance: AuthRespository;

  public static getInstance(): AuthRespository {
    if (!AuthRespository.instance) {
      AuthRespository.instance = new AuthRespository();
    }
    return AuthRespository.instance;
  }

  login = async (username: string): Promise<UsersAtrribute | null> => {
    return User.findOne({
      where: {
        username,
      },
    });
  };

  register = async (
    payload: UsersAtrributeCreation
  ): Promise<UsersAtrribute> => {
    return await User.create(payload);
  };

  update = async (
    payload: Partial<UsersAtrributeCreation>
  ): Promise<number> => {
    const result = await User.update(payload, { where: { xid: payload.xid } });

    return result[0];
  };
}

export default AuthRespository;
