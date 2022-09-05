import { parse as convert, type RouteParams } from 'regexparam';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Context = Record<string | number, any>;
export type RouteMatcher = {
  keys: string[];
  pattern: RegExp;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (params: any, ctx: any, uri: string) => void;
};

export function cleanPath(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  path = path.match(/^[^?#]*/)![0];
  return `/${path.replace(/^\/|\/$/g, '')}`;
}

export default function Navaid(base = '') {
  const routes: RouteMatcher[] = [];

  base = cleanPath(base);
  const rgx = base == '/' ? /^\/+/ : new RegExp('^\\' + base + '(?=\\/|$)\\/?', 'i');

  function fmt(uri: string) {
    if (!uri) return uri;
    uri = cleanPath(uri);
    return rgx.test(uri) ? uri.replace(rgx, '/') : '';
  }

  function route(uri: string, replace = false): Context | undefined {
    if (uri[0] == '/' && !rgx.test(uri)) uri = base + uri;
    const ctx = run(uri);
    history[replace ? 'replaceState' : 'pushState']({ uri, ctx }, '', uri);
    return ctx;
  }

  function on<S extends string, T>(
    pat: S,
    fn: (params: RouteParams<S>, ctx: Context, uri: string) => T
  ) {
    routes.push({
      ...convert(pat),
      fn,
    });
  }

  function run(uri: string, ctx: Context = {}): Context | undefined {
    const params: Context = {};
    let arr: RegExpExecArray | null, obj: RouteMatcher;
    if ((uri = fmt(uri || location.pathname))) {
      for (let i = 0; i < routes.length; i++) {
        if ((arr = (obj = routes[i]).pattern.exec(uri))) {
          for (i = 0; i < obj.keys.length; ) {
            params[obj.keys[i]] = arr[++i] || null;
          }
          obj.fn(params, ctx, uri);
          return ctx;
        }
      }
    }
  }

  function listen() {
    function handle(e: PopStateEvent) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      run(e.state?.uri as string, e.state?.ctx as Context);
    }

    function click(e: MouseEvent) {
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
      if (y[0] != '/' || rgx.test(y)) {
        e.preventDefault();
        route(y);
      }
    }

    addEventListener('popstate', handle);
    addEventListener('click', click);
    route(location.pathname, true)

    return () => {
      removeEventListener('popstate', handle);
      removeEventListener('click', click);
    };
  }

  return {
    route,
    run,
    listen,
    on,
  };
}
