export interface createUserDto {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

export interface getUserDto {
  username: string;
  password: string;
}
