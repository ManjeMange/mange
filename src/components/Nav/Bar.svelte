<script lang="ts">
  import NavLink from './Link.svelte';
  import MenuMobile from './MenuMobile.svelte';
  import MobileLink from './MobileLink.svelte';

  const pages = [
    {
      href: '/',
      label: 'Inventory',
    },
    {
      href: '/',
      label: 'Shopping',
    },
    {
      href: '/',
      label: 'Recipes',
    },
    {
      href: '/',
      label: 'Calendar',
    },
  ];
</script>

<nav class="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none">
  <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
    <div
      class="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25"
    >
      <div class="flex items-center px-2 lg:px-0">
        <div class="flex-shrink-0">
          <img
            class="block h-8 w-8"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
            alt="Your Company"
          />
        </div>
        <div class="hidden lg:(ml-10 block)">
          <div class="flex space-x-4">
            {#each pages as { href, label } (label)}
              <NavLink {href}>{label}</NavLink>
            {/each}
          </div>
        </div>
      </div>
      <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
        <div class="w-full max-w-lg lg:max-w-xs">
          <label for="search" class="sr-only">Search</label>
          <div class="relative text-gray-400 focus-within:text-gray-600">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <span class="i-heroicons:magnifying-glass text-xl" />
            </div>
            <input
              id="search"
              class="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:(border-white outline-none ring-2 ring-white ring-offset-2 ring-offset-indigo-600) sm:text-sm"
              placeholder="Search"
              type="search"
              name="search"
            />
          </div>
        </div>
      </div>
      <div class="flex lg:hidden">
        <MenuMobile>
          {#each pages as { href, label } (label)}
            <MobileLink {href}>{label}</MobileLink>
          {/each}
        </MenuMobile>
      </div>
      <div class="hidden lg:ml-4 lg:block">
        <div class="flex items-center">
          <!-- <button -->
          <!--   type="button" -->
          <!--   class="flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 mr-3" -->
          <!-- > -->
          <!--   <span class="sr-only">View notifications</span> -->
          <!--   <span class="i-heroicons:bell text-2xl" /> -->
          <!-- </button> -->

          <!-- Profile dropdown -->
          <div class="relative flex-shrink-0">
            <div>
              <button
                type="button"
                class="flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>

            <!--
                  Dropdown menu, show/hide based on menu state.

                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                -->
            <div
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <!-- Active: "bg-gray-100", Not Active: "" -->
              <a
                href="/profile"
                class="block py-2 px-4 text-sm text-gray-700"
                role="menuitem"
                id="user-menu-item-0">Your Profile</a
              >

              <a
                href="/auth/login"
                class="block py-2 px-4 text-sm text-gray-700"
                role="menuitem"
                id="user-menu-item-1"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
