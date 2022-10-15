<template>
  <div
       class="left-0 right-0 p-6 bg-gradient-to-r from-green-700/30 to-emerald-600/95 backdrop-blur-2xl shadow-xl">
    <div ref="mobileNavbar" class="">
      <div class="flex justify-between items-center">
        <h2 class="font-patua text-white text-2xl">Brf Gröna Gatan</h2>
        <button @click="toggleMenu" class="block rounded-md">
          <svg v-if="mobileMenuIsActive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg
               v-else
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6">
            <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
          </svg>
        </button>
      </div>
      <nav ref="mainMenu" v-if="mobileMenuIsActive" class="flex flex-col items-end">
        <ul
            class="leading-loose text-xl transition-all duration-300 lg:block hover:text-emerald-900/70 text-emerald-900 text-right">
          <li v-for="item in menuItems" :class="{'decoration-cyan-500 font-bold': (item?.uri == currentUrl)}"
              class="block">
            <a class="group whitespace-nowrap hover:text-black underline decoration-4 decoration-transparent hover:decoration-cyan-500 transition-all duration-200"
               :class="{'mr-8': !(item?.childItems?.nodes?.length)}"
               :href="item?.connectedNode?.node?.uri">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor"
                   class="group-hover:text-white transition-all duration-700 text-transparent inline-block w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
              {{item?.label}}
            </a>
            <svg @click="expand = !expand" v-if="item?.childItems?.nodes?.length" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                 class="ml-2 w-6 h-6 inline-block">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <a class="block mr-8 text-lg " v-if="expand" v-for="child in item?.childItems?.nodes"
               :href="item?.connectedNode?.node?.uri + '#'">{{child?.label}}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import autoAnimate from '@formkit/auto-animate';
import type { getMenuItems } from '@src/ts/queries';
const mobileMenuIsActive = ref(false);
const mainMenu = ref<HTMLElement>(null);
const mobileNavbar = ref<HTMLElement>(null);

const expand = ref<boolean>(false);

defineProps<{
  // menuItems: {
  //   name: string
  //   url: string
  // },
  menuItems: Awaited<ReturnType<typeof getMenuItems>>,
  currentUrl: string
}>()

function toggleMenu() {
  console.log('menu was toggled');
  mobileMenuIsActive.value = !mobileMenuIsActive.value;
}

onClickOutside(mobileNavbar, (ev) => {
  console.log('clicked outside menu');
  mobileMenuIsActive.value = false;
})

onMounted(() => {
  autoAnimate(mobileNavbar.value);
})

</script>

<style scoped>

</style>