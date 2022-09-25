<script lang="ts">
  import portal from 'lib/portal';
  let open = false;
  function toggle() {
    open = !open;
  }
</script>

{#if open}
  <!-- Mobile menu, show/hide based on mobile menu state. -->
  <div class="lg:hidden" use:portal>
    <!--
        Mobile menu overlay, show/hide based on mobile menu state.

        Entering: "duration-150 ease-out"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "duration-150 ease-in"
          From: "opacity-100"
          To: "opacity-0"
      -->
    <div
      class="fixed inset-0 z-20 bg-black bg-opacity-25"
      aria-hidden="true"
      on:click={toggle}
    />

    <!--
        Mobile menu, show/hide based on mobile menu state.

        Entering: "duration-150 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-150 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      -->
    <div
      class="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
    >
      <div
        class="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="pt-3 pb-2">
          <div class="flex items-center justify-between px-4">
            <div>
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <div class="-mr-2">
              <button
                type="button"
                on:click={toggle}
                class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Close menu</span>
                <span class="i-heroicons:x-mark text-2xl" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <slot />
          </div>
        </div>
        <div class="pt-4 pb-2">
          <!-- <div class="flex items-center px-5 mb-3"> -->
          <!--   <div class="flex-shrink-0"> -->
          <!--     <img -->
          <!--       class="h-10 w-10 rounded-full" -->
          <!--       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" -->
          <!--       alt="" -->
          <!--     /> -->
          <!--   </div> -->
          <!--   <div class="ml-3 min-w-0 flex-1"> -->
          <!--     <div class="truncate text-base font-medium text-gray-800">Tom Cook</div> -->
          <!--     <div class="truncate text-sm font-medium text-gray-500"> -->
          <!--       tom@example.com -->
          <!--     </div> -->
          <!--   </div> -->
          <!--   <button -->
          <!--     type="button" -->
          <!--     class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" -->
          <!--   > -->
          <!--     <span class="sr-only">View notifications</span> -->
          <!--     <span class="i-heroicons:bell text-2xl" aria-hidden="true" /> -->
          <!--   </button> -->
          <!-- </div> -->
          <div class="space-y-1 px-2">
            <a
              href="/"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
            >
              Your Profile
            </a>

            <a
              href="/auth/login"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <button
    type="button"
    class="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
    aria-controls="mobile-menu"
    aria-expanded="false"
    on:click={toggle}
  >
    <span class="sr-only"> Open main menu </span>
    <span class="i-heroicons:bars-3 text-2xl" />
  </button>
{/if}
