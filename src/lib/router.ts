import { getContext } from 'svelte';

export function getRefetch() {
  const { route } = getContext<{ route: (p: string, r: boolean) => void }>(
    'svelte-router'
  );
  return () => route(location.pathname, true);
}
