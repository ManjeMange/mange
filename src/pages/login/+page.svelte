<script lang="ts">
  import { createForm } from 'felte';

  import logo from '../../assets/SVG/mange-no-logo-w.svg';
  import Input from 'components/forms/Input.svelte';
  import Checkbox from 'components/forms/Checkbox.svelte';
  import { login } from 'lib/users/auth';

  type FormData = {
    email: string;
    password: string;
    remember: boolean;
  };

  const { form } = createForm<FormData>({
    onSubmit: async data => {
      console.log(data);
      return await login(data.email, data.password);
    },
    onError: e => {
      // show error message
      // wromg email & pass
      // invalid email etc
      console.error(e);
    },
    onSuccess: () => {
      // send to main page
    },
  });
</script>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <img class="mx-auto h-24 w-auto" src={logo} alt="Mange Logo" />
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      Sign in to your account
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" use:form>
        <Input
          type="text"
          label="Email Address"
          name="email"
          autocomplete="email"
          required
        />
        <Input
          type="password"
          label="Password"
          name="password"
          autocomplete="current-password"
          required
        />
        <div class="flex items-center justify-between">
          <Checkbox name="remember" label="Remember me" />

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
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
    </div>
  </div>
</div>
