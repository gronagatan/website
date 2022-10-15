<template>
  <div class="w-full p-6 flex items-center justify-between backdrop-blur-2xl shadow-xl">
    <h2 class="font-patua text-fogra text-4xl">Brf Gröna Gatan</h2>
    <nav ref="mainMenu" class="flex gap-12 text-xl">
        <div v-for="item in menuItems" class="w-min" :class="{'decoration-cyan-500 font-bold': (item?.uri == currentUrl)}">
          <a class="group whitespace-nowrap hover:text-black underline decoration-4 decoration-transparent hover:decoration-cyan-500 transition-all duration-200"
             :href="item?.connectedNode?.node?.uri">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="group-hover:text-white transition-all duration-700 text-transparent inline-block w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg> -->
            {{item?.label}}
          </a>
          <!-- <svg v-if="item?.childItems?.nodes?.length" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="ml-2 w-6 h-6 inline-block">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg> -->
          <div class="w-0 overflow-visible">
            <a class="" v-for="child in item?.childItems?.nodes"
            :href="item?.connectedNode?.node?.uri + '#'">{{child?.label}}</a>
          </div>
        </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import autoAnimate from '@formkit/auto-animate';
import type { getMenuItems } from '@src/ts/queries';

defineProps<{
  // menuItems: {
  //   name: string
  //   url: string
  // },
  menuItems: Awaited<ReturnType<typeof getMenuItems>>,
  currentUrl: string
}>()

// function toggleMenu() {
//   console.log('menu was toggled');
//   mobileMenuIsActive.value = !mobileMenuIsActive.value;
// }

// onClickOutside(mobileNavbar, (ev) => {
//   console.log('clicked outside menu');
//   mobileMenuIsActive.value = false;
// })

onMounted(() => {
  // autoAnimate(mobileNavbar.value);
})

</script>

<style scoped>

</style>