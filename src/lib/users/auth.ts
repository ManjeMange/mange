import { client } from 'lib/client';
import type { User } from './types';

export async function login(email: string, password: string): Promise<User> {
  const u = await client.users.authViaEmail(email, password);
  return u.user;
}

export function register(email: string, password: string, pswdConfirm: string) {
  return client.users.create({
    email,
    password,
    passwordConfirm: pswdConfirm,
  });
}
