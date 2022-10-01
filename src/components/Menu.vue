<template>
  <nav ref="mainMenu" class="main-menu p-6 rounded-md flex flex-col">
    <button @click="toggleMenu" class="lg:hidden block rounded-md self-end">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
      >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
      </svg>
    </button>
    <ul :class="{'hidden': !mobileMenuIsActive}" class="leading-loose text-xl transition-all duration-300 lg:block hover:text-emerald-900/70 text-emerald-900">
          <li v-for="item in menuItems" class="group whitespace-nowrap hover:text-black underline decoration-4 decoration-transparent hover:decoration-cyan-500 transition-all duration-200">
            <a
              :href="item.url"
            >
              {{item.name}}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="group-hover:text-white transition-all duration-700 text-transparent inline-block w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>

          </li>
    </ul>
  </nav>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
const mobileMenuIsActive = ref(false);
const mainMenu = ref<HTMLElement>(null);

defineProps<{
  menuItems: {
    name: string
    url: string
  }
}>()

function toggleMenu () {
  mobileMenuIsActive.value = !mobileMenuIsActive.value;
}

onClickOutside(mainMenu, (ev) => {
  mobileMenuIsActive.value = false;
})

const menuUlClasses = ref([
  'bg-gray-300'
])

// const menuItems = [
//   {
//     name: "hem",
//     url: "",
//   },
//   {
//     name: "fastigheten",
//     url: "",
//   },
//   {
//     name: "service och felanmälan",
//     url: "",
//   },
//   {
//     name: "fakta",
//     url: "",
//   },
//   {
//     name: "dokument",
//     url: "",
//   },
// ];
</script>

<style scoped>

</style>