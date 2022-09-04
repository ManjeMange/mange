import type { Writable } from 'svelte/store';
import { writable } from '@crikey/stores-strict';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type State = Record<string | number, any>;
export interface RouteData {
  path: string;
  state: State;
}

export interface RouteStore extends Writable<RouteData> {
  push(path: string, state?: State): void;
  replace(path: string, state?: State): void;
}

let HistoryStore: RouteStore;
export function createHistoryRouteStore(): RouteStore {
  if (!HistoryStore) {
    const { subscribe, set, update } = writable<RouteData>({
      path: location.pathname,
      state: (history.state as State) || {},
    });
    const nav = function (path: string, state: State = {}, replace = false): void {
      const data = {
        path,
        state,
      };
      replace ? history.replaceState(data, '', path) : history.pushState(data, '', path);
      set(data);
    };
    HistoryStore = {
      push: function (path: string, state: State = {}): void {
        nav(path, state);
      },
      replace: function (path: string, state: State = {}): void {
        nav(path, state, true);
      },
      set,
      update,
      subscribe,
    };
  }

  return { ...HistoryStore };
}
