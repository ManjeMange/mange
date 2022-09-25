import { readable } from '@crikey/stores-strict';
import { client } from 'lib/client';
import type { User } from './types';

export async function login(email: string, password: string): Promise<User> {
  const u = await client.users.authViaEmail(email, password);
  return u.user;
}

export function register(
  email: string,
  password: string,
  pswdConfirm: string
): Promise<User> {
  return client.users.create({
    email,
    password,
    passwordConfirm: pswdConfirm,
  });
}

export function logout() {
  return client.authStore.clear();
}

export const AuthStore = readable<User | null>(null, set => {
  return client.authStore.onChange(() => {
    set(client.authStore.model);
  });
});
