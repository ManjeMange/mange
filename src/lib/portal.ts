import { tick } from 'svelte';

export default function portal(el: HTMLElement, target: HTMLElement | string = 'body') {
  async function update(target: HTMLElement | string) {
    let targetEl = null;
    if (typeof target === 'string') {
      let targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
        if (targetEl === null) {
          throw new Error(`No element found matching css selector: "${target}"`);
        }
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(
        `Unknown portal target type: ${
          target === null ? 'null' : typeof target
        }. Allowed types: string (CSS selector) or HTMLElement.`
      );
    }
    targetEl?.appendChild(el);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    el.hidden = false;
  }

  function destroy() {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  void update(target);
  return {
    update,
    destroy,
  };
}
