export interface createUserDto {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

export interface getUserDto {
  email: string;
  password: string;
}
