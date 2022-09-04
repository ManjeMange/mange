import { type RouteParams, parse as convert } from 'regexparam';
import type { ComponentType } from 'svelte';

type RouteFN<T, S extends string> = (params: RouteParams<S>) => T;

export type RouteMatcher<T> = {
  keys: string[];
  pattern: RegExp;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (params: any, ctx: any) => T;
};

export function cleanPath(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  path = path.match(/^[^?#]*/)![0];
  return `/${path.replace(/^\/|\/$/g, '')}`;
}

export function parseBase(base: string) {
  base = cleanPath(base);
  const rgx: RegExp =
    base == '/' ? /^\/+/ : new RegExp('^\\' + base + '(?=\\/|$)\\/?', 'i');

  function fmt(uri: string) {
    if (!uri) return uri;
    uri = cleanPath(uri);
    return rgx.test(uri) ? uri.replace(rgx, '/') : '';
  }

  return {
    test: rgx,
    base,
    fmt,
  };
}

export function addRoute<T, S extends string>(
  routes: RouteMatcher<T>[],
  path: S,
  fn: RouteFN<T, S>
) {
  routes.push({
    ...convert(path),
    fn,
  });
}

export function matchRoute<T>(
  routes: RouteMatcher<T>[],
  uri: string,
  ctx: any
): T | undefined {
  let i = 0,
    arr,
    obj;
  const params: Record<string, string | null> = {};
  // uri = uri.match(/^[^?#]*/)![0];
  for (i = 0; i < routes.length; i++) {
    if ((arr = (obj = routes[i]).pattern.exec(uri))) {
      for (i = 0; i < obj.keys.length; ) {
        params[obj.keys[i]] = arr[++i] || null;
      }
      return obj.fn(params, ctx);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataFN = (params: any, ctx: any) => any;

export interface Route {
  path: string;
  dataFN?: DataFN;
  component?: ComponentType;
  routes?: Route[];
}

export interface FlatRoute {
  path: string;
  handlers: [ComponentType, DataFN | undefined][];
}

export function flattenRoutes(routes: Route[], base = ''): FlatRoute[] {
  return routes.flatMap(({ path, component, routes, dataFN }) => {
    path = `${base}${cleanPath(path)}`;
    const handlers: FlatRoute[] = routes ? flattenRoutes(routes, path) : [];
    if (component) {
      if (!handlers.length) {
        handlers.push({
          path,
          handlers: [],
        });
      }
      handlers.forEach(h => {
        h.handlers.push([component, dataFN]);
      });
    }
    return handlers;
  });
}
