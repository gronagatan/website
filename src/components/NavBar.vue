<template>
  <div @mouseleave="expanded = false" ref="navBar" class="w-full p-4 pr-2 md:pr-4 flex gap-6 justify-between text-baby-powder/90 text-glow-black bg-gradient-to-l from-kombugreen via-green-800/80 backdrop-blur-2xl shadow-xl">
    <h2 class="font-patua bg-gradient-to-r to-emerald-900 from-green-700 bg-clip-text text-transparent whitespace-nowrap text-2xl lg:text-3xl xl:text-4xl">Brf Gröna Gatan</h2>
    <nav class="grid grid-flow-col grid-rows-1 auto-cols-fr gap-4 lg:gap-8 text-base lg:text-xl">
        <div @mouseover="onHover" ref="menuRefs" v-for="item in menuItems" class="border-t-2 leading-loose supports-hover:hover:border-kombugreen border-kombugreen/50 transition-all duration-300 flex flex-col" >
          <div class="flex items-center justify-between">
            <a class="whitespace-nowrap hover:text-white hover:underline"
              :class="{'font-extrabold': (item?.path == currentUrl)}"
              :href="item?.path + '#'">
              {{item?.label}}
            </a>
            <button @click="expanded = !expanded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 supports-hover:hidden no-hover:block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
          <div class="foldout overflow-y-hidden transition-all duration-500 tracking-tighter lg:tracking-tight xl:tracking-normal" :class="{'!max-h-0': !expanded}">
            <a class="block hover:text-white hover:underline" v-for="child in item?.childItems?.nodes"
            :href="(item?.connectedNode?.node?.uri + '#' + (child?.connectedNode?.node as Page).slug)">{{child?.label}}</a>
          </div>
        </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { getMenuItems } from '@src/ts/queries';
import type { Page } from '@src/generated/graphql';

const expanded = ref(true);
const navBar = ref<HTMLElement>(null);
const menuRefs = ref<HTMLElement[]>([]);

defineProps<{
  menuItems: Awaited<ReturnType<typeof getMenuItems>>,
  currentUrl: string
}>()

onMounted(() => {
  menuRefs.value.forEach(ref => {
    const foldoutDiv = ref.querySelector('.foldout');
    if(!foldoutDiv){
      return;
    }
    foldoutDiv.style.maxHeight = foldoutDiv?.scrollHeight + 'px';
  })
})

function onHover() {
  const mediaQuery = window.matchMedia('(hover:none)');
  if(mediaQuery.matches){
    return;
  }
  expanded.value = true
}

</script>

<style scoped>

</style>