export interface Auth_Payload {
  username: string;
  password: string;
}

export interface RegisterAuth_Payload {
  username: string;
  password: string;
  token: string;
  rePass: string;
}

interface AccessToken {
  token: string;
  role: string;
  expiredAt: number;
}

export interface EncodeToken {
  value: Auth_Token;
}

export interface UserProfile {
  username: string;
  createdAt: number;
  status: string;
}

export interface Auth_Result {
  accessToken: AccessToken;
}

export interface Auth_Token {
  xid: string;
  username: string;
  active: boolean;
  status: string;
  password: string;
}