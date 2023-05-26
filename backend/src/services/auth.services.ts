import { AuthRespository_Interface } from "../contract/RepositoryContract";
import { AuthServices_Interface } from "../contract/ServiceContract";
import { UsersAtrribute, UsersAtrributeCreation } from "../db/models/users";
import {
  Auth_Payload,
  Auth_Result,
  Auth_Token,
  RegisterAuth_Payload,
} from "../dto/auth.dto";
import AuthRespository from "../repository/auth.repository";
import Auntentifikation from "../utils/Auntentifikation";
import CryptoSecure from "../utils/CryptoSecure";
export default class AuthServices implements AuthServices_Interface {
  private readonly authRepository: AuthRespository_Interface =
    AuthRespository.getInstance();

  login = async (data: Auth_Payload): Promise<Auth_Result> => {
    const { username, password } = data;
    const value = await this.authRepository.login(username);
    if (!value) {
      throw new Error("Failed");
    }

    if (!(await Auntentifikation.compare(password, value.password))) {
      throw new Error("Failed");
    }

    delete value.createAt;
    delete value.updateAt;
    delete value.id;
    const token = Auntentifikation.generateToken(value as Auth_Token);

    return {
      accessToken: {
        token: token,
        role: value.status,
        expiredAt: 2,
      },
    };
  };

  register = async (data: RegisterAuth_Payload): Promise<UsersAtrribute> => {
    const { username, password, rePass, token } = data;
    const tokenGuru = process.env.tokenGuru as string;
    const tokenMurid = process.env.tokenMurid as string;
    const value = await this.authRepository.login(username);
    let status!: string;
    const xid = CryptoSecure.secureRandomString(20);
    if (value) {
      throw new Error("Conflik");
    }

    if (!CryptoSecure.secureCompareString(password, rePass)) {
      throw new Error("Failed");
    }
    if (CryptoSecure.secureCompareString(token, tokenGuru)) {
      status = "guru";
    } else if (CryptoSecure.secureCompareString(token, tokenMurid)) {
      status = "murid";
    } else {
      throw new Error("Token");
    }

    const haspassword = await Auntentifikation.hash(password);

    const createdValue: UsersAtrributeCreation = {
      xid,
      username,
      password: haspassword,
      active: true,
      status,
    };

    const created = this.authRepository.register(createdValue);

    return created;
  };
}
