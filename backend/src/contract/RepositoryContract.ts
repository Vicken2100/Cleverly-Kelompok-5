import {
  ClassAtrribute,
  ClassAtrributeCreation,
  ClassJoinAttribute,
} from "../db/models/class";
import { HasilsAttribute, HasilsCreationAttribute } from "../db/models/hasils";
import { QuizsAttribute, QuizsCreationAttribute } from "../db/models/quizs";
import {
  SubClassAtrribute,
  SubClassAtrributeCreation,
} from "../db/models/subclass";
import { UsersAtrribute, UsersAtrributeCreation } from "../db/models/users";
import { Auth_Token } from "../dto/auth.dto";
import { List_Payload } from "../dto/default.dto";

export interface AuthRespository_Interface {
  login(username: string): Promise<UsersAtrribute | null>;

  register(payload: UsersAtrributeCreation): Promise<UsersAtrribute>;

  update(payload: Partial<UsersAtrributeCreation>): Promise<number>;
}

export interface ClassRepository_Interface {
  findAllClass(payload: List_Payload): Promise<Array<ClassJoinAttribute>>;

  insertClass(payload: ClassAtrributeCreation): Promise<ClassAtrribute>;

  findClass(name: string): Promise<ClassAtrribute | null>;

  findSubClass(name: string): Promise<SubClassAtrribute | null>;

  insertSubClass(
    payload: SubClassAtrributeCreation
  ): Promise<SubClassAtrribute>;

  findSubClassByClass(
    payload: List_Payload
  ): Promise<Array<SubClassAtrribute>>;

  createdQuiz(payload : QuizsCreationAttribute) : Promise<QuizsAttribute>;

  getAllUniqQuiz(): Promise<Array<QuizsAttribute>>;

  getQuizs(payload : List_Payload): Promise<Array<QuizsAttribute>>

  insertHasils(payload : HasilsCreationAttribute): Promise<HasilsAttribute>;

  getHasils(payload : Auth_Token) : Promise<Array<HasilsAttribute>>;

  deleteMateri(xid: string) : Promise<void>
}
