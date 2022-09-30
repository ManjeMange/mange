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

export function resetPassRequest(email: string) {
  return client.users.requestPasswordReset(email);
}

export function resetPassConfirm(token: string, pass: string, passConfirm: string) {
  return client.users.confirmPasswordReset(token, pass, passConfirm);
}

export const AuthStore = readable<User | null>(null, set => {
  return client.authStore.onChange(() => {
    set(client.authStore.model);
  });
});
