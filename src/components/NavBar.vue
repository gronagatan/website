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
      <!-- Container for main categories -->
      <nav :class="{'!max-h-0 mobileMenuHidden': !showMenu, 'mobileMenuExpanded': showMenu}" ref="navElement" class="mobileMenu md:grid md:!max-h-fit grid-flow-row grid-rows-1 gap-4 ml-auto overflow-hidden text-lg md:grid-flow-col auto-cols-fr lg:gap-8 md:text-base lg:text-xl">
        <div @mouseover="onHover(menuRefs[index])" ref="menuRefs" v-for="(item, index) in menuItems" :class="{'hover:border-kombugreen': !isTouchDevice}" class="flex flex-col leading-loose tracking-wide transition-all duration-300 border-t-2 border-russian-green/50 md:tracking-tighter lg:tracking-tight xl:tracking-normal" >
          <div class="flex items-center justify-between">
            <a @click="onClickLink" class="whitespace-nowrap hover:text-white hover:underline"
              :class="{'font-extrabold': (item?.path == currentUrl)}"
              :href="item?.path + '#'">
              {{item?.label}}
            </a>
            <button v-if="item?.childItems?.nodes?.length" @click="onClickExpand(index)">
              <svg class="w-6 h-6 transition-transform duration-300" :class="{'hidden': !isTouchDevice, 'block': isTouchDevice, 'rotate-180': currentlyExpandedItem === menuRefs[index]}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
          <!-- Container for Submenu-->
          <div class="overflow-y-hidden pl-2 md:pl-0 transition-all duration-500 foldout" :class="{'!max-h-0': isMobileScreen && currentlyExpandedItem !== menuRefs[index], 'md:!max-h-0': currentlyExpandedItem === null, 'text-zinc-400': currentlyExpandedItem !== menuRefs[index]}">
            <a @click="onClickLink" class="block hover:text-white hover:underline" v-for="child in item?.childItems?.nodes"
            :href="(item?.connectedNode?.node?.uri + '#' + (child?.connectedNode?.node as Page).slug)">{{child?.label}}</a>
          </div>
        </div>
      </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
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

const isTouchDevice = ref<boolean>(true);
const isMobileScreen = ref<boolean>(true);

const screens = tailwindOptions.theme?.screens as KeyValuePair<string, string>;

defineProps<{
  menuItems: Awaited<ReturnType<typeof getMenuItems>>,
  currentUrl: string
}>()

onMounted(() => {
  if (!("ontouchstart" in document.documentElement)) {
    isTouchDevice.value = false;
  }
  let tallestSubMenus = 0;
  menuRefs.value.forEach(ref => {
    const foldoutDiv: HTMLElement | null = ref.querySelector('.foldout');
    if(!foldoutDiv){
      return;
    }
    const scrollHeight = foldoutDiv.scrollHeight;
    tallestSubMenus = scrollHeight > tallestSubMenus ? scrollHeight : tallestSubMenus;
    foldoutDiv.style.maxHeight = scrollHeight + 'px';
  })

  if(navElement.value){
    navElement.value.style.maxHeight = navElement.value.scrollHeight + tallestSubMenus + 'px';
    // navElement.value.style.maxHeight = '100vh';
  }
  const mediaQuery = window.matchMedia(`(min-width: ${screens['md']})`)
  if(mediaQuery.matches){
    isMobileScreen.value = false;
  }
})

const showMenu = computed(() => {
  return !isMobileScreen.value || mobileMenuIsActive.value;
})

function collapseSubmenus() {
  currentlyExpandedItem.value = null;
}

function closeMobileMenu() {
  mobileMenuIsActive.value = false;
}

function onHover(target: HTMLElement) {
  // console.log(`menu item was hovered_ ${target}`);
  const mediaQuery = window.matchMedia('(hover:none)');
  if(isTouchDevice.value || mediaQuery.matches){
    // console.log(`ignoring hover because touchdevice`);
    return;
  }
  currentlyExpandedItem.value = target;
}

function onClickExpand(index: number){
  console.log(`expand button nr ${index} clicked`);
  const wasAlreadyExpanded = currentlyExpandedItem.value === menuRefs.value[index];
  console.log(`was already expanded ${wasAlreadyExpanded}`);
  if(!wasAlreadyExpanded){
    currentlyExpandedItem.value = menuRefs.value[index];
  } else {
    currentlyExpandedItem.value = null
  } 
  console.log(`currentlyExpandedItem after click: ${currentlyExpandedItem.value}`);
}

function onClickLink(){
  console.log(`clicked a link`);
  if(!isMobileScreen){
    collapseSubmenus();
  }
  closeMobileMenu();
}

</script>

<style scoped>
.mobileMenu {
  transition: all 0.5s ease , opacity 0.3s ease;
}

.mobileMenuExpanded{
  opacity: 1;
  /* transition: all 0.2s ease, opacity 0.1s ease 0.2s; */
}
.mobileMenuHidden{
  opacity: 0;
  /* transition: all 0.4s ease 0.1s, opacity 0.1s ease; */
}

</style>