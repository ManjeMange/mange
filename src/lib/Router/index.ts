import { writable } from '@crikey/stores-strict';
import { onMount, setContext, type ComponentType } from 'svelte';
import navaid from 'lib/Router/navaid';
import { flattenRoutes, type Route } from './utils';

type RouteData = [ComponentType, unknown][];

export function useRoutes(routes: Array<Route>, base = '') {
  const { listen, on, route } = navaid(base);
  const cache = new Map<string, RouteData>();
  const handlers = writable<RouteData>([]);
  onMount(listen);
  setContext('svelte-router-internal-handlers', handlers);

  flattenRoutes(routes).forEach(r => {
    r.handlers.reverse();
    on(r.path, (params, ctx) => {
      handlers.set(
        r.handlers.map<[ComponentType, unknown]>(([c, h]) => [c, h && h(params, ctx)])
      );
    });
  });

  return {
    listen,
    push: (uri: string) => {
      route(uri);
      cache.clear();
    },
  };
}
