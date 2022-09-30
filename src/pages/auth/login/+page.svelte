<script lang="ts">
  import { useRouter } from '@mpaupulaire4/svelte-router';
  import { createForm } from 'felte';

  import Input from 'components/forms/Input.svelte';
  import { login, logout } from 'lib/users/auth';
  import { title } from '../title';

  type FormData = {
    email: string;
    password: string;
  };

  const { route } = useRouter();

  const { form } = createForm<FormData>({
    onSubmit: data => {
      return login(data.email, data.password);
    },
    onError: e => {
      // show error message
      // wromg email & pass
      // invalid email etc
      console.error(e);
    },
    onSuccess: () => {
      route('/');
    },
  });
  logout();
  title.set('Sign in to your account');
</script>

<form class="space-y-6" use:form>
  <Input type="text" label="Email Address" name="email" autocomplete="email" required />
  <Input
    type="password"
    label="Password"
    name="password"
    autocomplete="current-password"
    required
  />
  <div class="flex items-center justify-between">
    <div class="text-sm">
      <a href="/auth/signup" class="font-medium text-indigo-600 hover:text-indigo-500">
        Don't have an account?
      </a>
    </div>
    <div class="text-sm">
      <a href="/auth/reset" class="font-medium text-indigo-600 hover:text-indigo-500">
        Forgot your password?
      </a>
    </div>
  </div>

  <div>
    <button
      type="submit"
      class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Sign in
    </button>
  </div>
</form>
