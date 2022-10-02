<template>
  <div class="fixed left-0 right-0 top-0 p-6 bg-gradient-to-r from-green-700/30 to-emerald-600/95 backdrop-blur-2xl shadow-xl">
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
          <li v-for="item in menuItems" :class="{'decoration-cyan-500 font-bold': (item.url == currentUrl)}"
              class="group block whitespace-nowrap hover:text-black underline decoration-4 decoration-transparent hover:decoration-cyan-500 transition-all duration-200">
            <a
               :href="item.url">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor"
                   class="group-hover:text-white transition-all duration-700 text-transparent inline-block w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
              {{item.name}}
            </a>

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
const mobileMenuIsActive = ref(false);
const mainMenu = ref<HTMLElement>(null);
const mobileNavbar = ref<HTMLElement>(null);

defineProps<{
  menuItems: {
    name: string
    url: string
  },
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