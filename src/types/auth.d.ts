export type AccessToken = {
  value: string;
};

export type RefreshToken = {
  value: string;
};

export type Session = {
  userId: string;
  userName: string;
  email: string;
};

export type AuthResponseDto = {
  accessToken: AccessToken;
  expiresIn: string;
  refreshToken: RefreshToken;
};

export type RegisterRequestDto = {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type LoginRequestDto = {
  email: string;
  password: string;
};
