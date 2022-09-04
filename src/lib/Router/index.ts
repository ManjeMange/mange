import { derived, writable } from '@crikey/stores-strict';
import { setContext, type ComponentType } from 'svelte';
import { createHistoryRouteStore, type State, type RouteStore } from './RouteStore';
import {
  flattenRoutes,
  parseBase,
  type RouteMatcher,
  type Route,
  addRoute,
  matchRoute,
} from './utils';

type RouteData = [ComponentType, unknown][];

export function useRoutes(
  routes: Array<Route>,
  store: RouteStore = createHistoryRouteStore(),
  base = ''
) {
  const { test, fmt, ...b } = parseBase(base);
  base = b.base;
  const matchers: RouteMatcher<RouteData>[] = [];
  const handlers = derived(store, ({ path, state }) => {
    path = fmt(path);
    const handlers = matchRoute(matchers, path, state);
    return handlers || [];
  });
  setContext('svelte-router-internal-handlers', handlers);

  flattenRoutes(routes).forEach(r => {
    r.handlers.reverse();
    addRoute(matchers, r.path, (params, ctx = {}) => {
      return r.handlers.map<[ComponentType, unknown]>(([c, h]) => [
        c,
        h && h(params, ctx),
      ]);
    });
  });

  function clickHandler(e: MouseEvent) {
    const x = (e.target as Element).closest('a'),
      y = x && x.getAttribute('href');
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.shiftKey ||
      e.button ||
      e.defaultPrevented
    )
      return;
    if (!y || x.target || x.host !== location.host || y[0] == '#') return;
    if (y[0] != '/' || test.test(y)) {
      e.preventDefault();
      store.push(y, {});
    }
  }

  return {
    clickHandler,
  };
}
