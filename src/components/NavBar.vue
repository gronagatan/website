<template>
  <div @mouseleave="currentlyExpandedItem = null" ref="navBar" class="flex flex-wrap justify-between w-full p-4 pr-2 shadow-xl md:pr-4 gap-x-6 text-baby-powder/90 text-glow-black bg-gradient-to-l from-kombugreen to-green-800/80 backdrop-blur-2xl">
    <h2 class="text-2xl text-transparent font-patua bg-gradient-to-r fr bg-clip-text from-lichen to-baby-powder whitespace-nowrap lg:text-3xl xl:text-4xl">Brf Gröna Gatan</h2>
    
    
        <button @click="mobileMenuIsActive = !mobileMenuIsActive" class="block rounded-md md:hidden">
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
    <div class="h-0 md:hidden basis-full"></div>
    <Transition>
        <nav :class="{'!max-h-0': !mobileMenuIsActive, 'mt-4': mobileMenuIsActive}" ref="navElement" class="md:grid md:!max-h-fit grid-flow-row grid-rows-1 gap-4 ml-auto overflow-hidden text-lg md:grid-flow-col auto-cols-fr lg:gap-8 md:text-base lg:text-xl">
          <div @mouseover="onHover(menuRefs[index])" ref="menuRefs" v-for="(item, index) in menuItems" :class="{'hover:border-kombugreen': !touchDevice}" class="flex flex-col leading-loose tracking-wide transition-all duration-300 border-t-2 border-russian-green/50 md:tracking-tighter lg:tracking-tight xl:tracking-normal" >
          <div class="flex items-center justify-between">
            <a class="whitespace-nowrap hover:text-white hover:underline"
              :class="{'font-extrabold': (item?.path == currentUrl)}"
              :href="item?.path + '#'">
              {{item?.label}}
            </a>
            <button v-if="item?.childItems?.nodes?.length" @click="currentlyExpandedItem === menuRefs[index]? currentlyExpandedItem = null : currentlyExpandedItem = menuRefs[index]">
              <svg class="w-6 h-6 transition-transform duration-300" :class="{'hidden': !touchDevice, 'block': touchDevice, 'rotate-180': currentlyExpandedItem === menuRefs[index]}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
          <div class="overflow-y-hidden transition-all duration-500 foldout" :class="{'md:!max-h-0': currentlyExpandedItem === null, 'text-zinc-400, !max-h-0': currentlyExpandedItem !== menuRefs[index]}">
            <a class="block hover:text-white hover:underline" v-for="child in item?.childItems?.nodes"
            :href="(item?.connectedNode?.node?.uri + '#' + (child?.connectedNode?.node as Page).slug)">{{child?.label}}</a>
          </div>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { getMenuItems } from '@src/ts/queries';
import type { Page } from '@src/generated/graphql';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.cjs';
import type { KeyValuePair } from 'tailwindcss/types/config';

const tailwindOptions = resolveConfig(tailwindConfig);

const mobileMenuIsActive = ref<boolean>(false);
const currentlyExpandedItem = ref<HTMLElement | null>(null);
const navBar = ref<HTMLElement | null>(null);
const navElement = ref<HTMLElement | null>(null);
const menuRefs = ref<HTMLElement[]>([]);

const touchDevice = ref<boolean>(true);

const screens = tailwindOptions.theme?.screens as KeyValuePair<string, string>;

defineProps<{
  menuItems: Awaited<ReturnType<typeof getMenuItems>>,
  currentUrl: string
}>()

onMounted(() => {
  console.log(screens);
  if (!("ontouchstart" in document.documentElement)) {
    touchDevice.value = false;
  }
  menuRefs.value.forEach(ref => {
    const foldoutDiv: HTMLElement | null = ref.querySelector('.foldout');
    if(!foldoutDiv){
      return;
    }
    foldoutDiv.style.maxHeight = foldoutDiv?.scrollHeight + 'px';
  })

  if(navElement.value){
    // navElement.value.style.maxHeight = navElement.value.scrollHeight + 'px';
    navElement.value.style.maxHeight = '100vh';
  }
  const mediaQuery = window.matchMedia(`(min-width: ${screens['md']})`)
  if(!mediaQuery.matches){
    mobileMenuIsActive.value = false;
  }
})

function onHover(target: HTMLElement) {
  const mediaQuery = window.matchMedia('(hover:none)');
  if(mediaQuery.matches){
    return;
  }
  currentlyExpandedItem.value = target;
}

</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active{
  
  transition: all 0.2s ease, opacity 0.1s ease 0.2s;
}
.v-leave-active {
  transition: all 0.4s ease 0.1s, opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  margin-top: 0;
  max-height: 0 !important;
  opacity: 0;
}
</style>