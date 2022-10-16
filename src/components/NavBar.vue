<template>
  <div @mouseleave="expanded = false" ref="navBar" class="w-full p-2 lg:p-6 flex justify-between text-kombugreen bg-baby-powder/40 backdrop-blur-2xl shadow-xl">
    <h2 class="font-patua self-center text-2xl xl:text-4xl">Brf Gröna Gatan</h2>
    <nav class="m-2 shrink grid grid-flow-col grid-rows-1 auto-cols-fr gap-4 lg:gap-8 text-base lg:text-xl">
        <div @mouseover="expanded = true" ref="menuRefs" v-for="item in menuItems" class="border-b-2 leading-loose border-dotted border-kombugreen flex flex-col" >
          <a class="whitespace-nowrap hover:text-cyan-700 hover:underline"
            :class="{'font-extrabold': (item?.path == currentUrl)}"
            :href="item?.path + '#'">
            {{item?.label}}
          </a>
          <div class="overflow-hidden transition-all duration-700" :class="{'!max-h-0': !expanded}">
            <a class="block hover:text-cyan-700 hover:underline" v-for="child in item?.childItems?.nodes"
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

const expanded = ref(false);
const navBar = ref<HTMLElement>(null);
const menuRefs = ref<HTMLElement[]>([]);

defineProps<{
  menuItems: Awaited<ReturnType<typeof getMenuItems>>,
  currentUrl: string
}>()

onMounted(() => {
  menuRefs.value.forEach(ref => {
    const foldoutDiv = ref.querySelector('div');
    if(!foldoutDiv){
      return;
    }
    foldoutDiv.style.maxHeight = foldoutDiv?.scrollHeight + 'px';
  })
})

</script>

<style scoped>

</style>