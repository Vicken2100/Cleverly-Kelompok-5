export interface ClassCreated_Payload {
  name: string;
}

export interface SubClassCreated_Payload {
  name: string;
  image: string;
  class: string;
  materi: string;
}

export interface QuizsCreated_Payload{
  judul : string;
  tingkatkesulitan: string;
  deskripsi: string;
  soal: string;
  subclass: string;
  type: boolean;
  nomor: number;
  jawaban: string;
}

export interface HasilsCreated_Payload{
  username : string;
  hasil :string;
  judulKuiz: string;
}