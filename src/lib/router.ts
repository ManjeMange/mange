import type { useHandlers } from '@mpaupulaire4/svelte-router';
import { getContext } from 'svelte';

export function getRefetch() {
  const { route } = getContext<{ route: (p: string, r: boolean) => void }>(
    'svelte-router'
  );
  return () => route(location.pathname, true);
}

export function useRouter() {
  return getContext<ReturnType<typeof useHandlers>>('svelte-router');
}
