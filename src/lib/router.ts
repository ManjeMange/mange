import { useRouter } from '@mpaupulaire4/svelte-router';

export function getRefetch() {
  const { route } = useRouter();
  return () => route(location.pathname, true);
}
