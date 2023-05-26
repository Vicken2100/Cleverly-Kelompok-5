import { ClassRepository_Interface } from "../contract/RepositoryContract";
import { ClassService_Interface } from "../contract/ServiceContract";
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
import { Auth_Token } from "../dto/auth.dto";
import {
  ClassCreated_Payload,
  HasilsCreated_Payload,
  QuizsCreated_Payload,
  SubClassCreated_Payload,
} from "../dto/class.dto";
import { List_Payload } from "../dto/default.dto";
import ClassRepository from "../repository/class.repository";
import CryptoSecure from "../utils/CryptoSecure";

export default class ClassService implements ClassService_Interface {
  private readonly classRepository: ClassRepository_Interface =
    ClassRepository.getInstance();

  findAllClass = async (
    payload: List_Payload
  ): Promise<Array<ClassJoinAttribute>> => {
    const value = await this.classRepository.findAllClass(payload);
    return value;
  };

  findAllSubClass = async(payload: List_Payload): Promise<Array<SubClassAtrribute>> =>{
    const value = await this.classRepository.findSubClassByClass(payload);
    return value;
  }

  getQuizs = async(payload: List_Payload) : Promise<Array<QuizsAttribute>> => {
    const value = await this.classRepository.getQuizs(payload);
    return value;
  }

  getHasils = async(payload : Auth_Token) : Promise<Array<HasilsAttribute>> =>{
    return await this.classRepository.getHasils(payload);
  }

  insertHasil = async(payload: HasilsCreated_Payload) : Promise<HasilsAttribute> =>{
    const xid = CryptoSecure.secureRandomString(20);
    const createdValue: HasilsCreationAttribute = {
      xid,
      username: payload.username,
      hasil: payload.hasil,
      judulkuiz: payload.judulKuiz
    };
    return this.classRepository.insertHasils(createdValue);
    
  }

  deleteMateri = async(xid: string): Promise<void> =>{
    await this.classRepository.deleteMateri(xid);
  }

  getAllQuizUniq = async() : Promise<Array<QuizsAttribute>> =>{
    const value = await this.classRepository.getAllUniqQuiz();
    const uniqData: QuizsAttribute[] = [];

    value.forEach((soal) => {
      // Cari index data yang sama pada uniqData
      const isDuplicate = uniqData.some(
        (item) =>
          {
            return item.judul === soal.judul &&
          item.subclassname === soal.subclassname &&
          item.tingkatkesulitan === soal.tingkatkesulitan}
      );

      // Jika tidak ditemukan, tambahkan data ke uniqData
      if (!isDuplicate) {
        uniqData.push(soal);
      }
    });

    return uniqData;
  }

  create = async (payload: ClassCreated_Payload): Promise<ClassAtrribute> => {
    const value = await this.classRepository.findClass(payload.name);
    if (value) {
      throw new Error("Conflik");
    }

    const xid = CryptoSecure.secureRandomString(20);
    const createdValue: ClassAtrributeCreation = {
      xid,
      name: payload.name,
    };

    const created = this.classRepository.insertClass(createdValue);

    return created;
  };

  createQuiz = async(payload:QuizsCreated_Payload) : Promise<QuizsAttribute> =>{
    const xid = CryptoSecure.secureRandomString(20);
    const createdValue : QuizsCreationAttribute = {
      xid,
      nomor: payload.nomor,
      subclassname: payload.subclass,
      soal: payload.soal,
      tipe: payload.type,
      tingkatkesulitan: payload.tingkatkesulitan,
      judul: payload.judul,
      deskripsi: payload.deskripsi,
      jawaban: payload.jawaban
    }

    const created = this.classRepository.createdQuiz(createdValue);

    return created;
  }

  createdSubClass = async (
    payload: SubClassCreated_Payload
  ): Promise<SubClassAtrribute> => {
    const value = await this.classRepository.findSubClass(payload.name);

    if (value) {
      throw new Error("Conflik");
    }

    const xid = CryptoSecure.secureRandomString(20);
    const createdValue: SubClassAtrributeCreation = {
      xid,
      name: payload.name,
      class: payload.class,
      image: payload.image,
      materi: payload.materi,
    };
    const created = this.classRepository.insertSubClass(createdValue);
    return created;
  };
}
