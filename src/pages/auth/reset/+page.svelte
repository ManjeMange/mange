<script lang="ts">
  import { useRouter } from '@mpaupulaire4/svelte-router';
  import { createForm } from 'felte';

  import Input from 'components/forms/Input.svelte';
  import { resetPassConfirm, resetPassRequest } from 'lib/users/auth';
  import { title } from '../title';

  interface FormData {
    email: string;
    password: string;
    passwordConfirm: string;
  }

  const token = new URLSearchParams(location.search).get('token');

  const { route } = useRouter();

  const { form } = createForm<FormData>({
    onSubmit: data => {
      if (token) {
        return resetPassConfirm(token, data.password, data.passwordConfirm);
      }
      return resetPassRequest(data.email);
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
  title.set('Reset Passwoard');
</script>

<form class="space-y-6" use:form>
  {#if token}
    <Input
      type="text"
      label="New Passwoord"
      name="password"
      autocomplete="new-password"
      required
    />
    <Input
      type="text"
      label="Confirm Password"
      name="passwordConfirm"
      autocomplete="new-password"
      required
    />
  {:else}
    <Input type="text" label="Email Address" name="email" autocomplete="email" required />
  {/if}

  <div class="flex items-center justify-between">
    <div />
    <div class="text-sm">
      <a href="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
        Need to log in?
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
