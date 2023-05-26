import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Auth_Token } from "../dto/auth.dto";

class Auntentifikation {
  public static compare = async (
    text: string,
    encryptedText: string
  ): Promise<boolean> => {
    return await bcrypt.compare(text, encryptedText);
  };

  public static hash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  public static generateToken = (value: Auth_Token): string => {
    const key = process.env.KEY as string;

    const token: string = jwt.sign(
      {
        value,
      },
      key
    );

    return token;
  };
}
export default Auntentifikation;
