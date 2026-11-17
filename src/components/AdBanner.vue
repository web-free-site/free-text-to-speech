<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  slotKey: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  label: { type: String, default: 'Advertisement' },
});

const frame = ref(null);

onMounted(() => {
  if (!frame.value) return;
  const params = new URLSearchParams({
    key: props.slotKey,
    w: String(props.width),
    h: String(props.height),
  });
  frame.value.src = `/ad-iframe.html?${params.toString()}`;
});
</script>

<template>
  <div class="ad-slot flex flex-col items-center gap-1 my-2" :aria-label="label">
    <iframe
      ref="frame"
      :title="label"
      class="border-0 bg-transparent max-w-full"
      :style="{ width: width + 'px', height: height + 'px' }"
      scrolling="no"
      loading="lazy"
    />
  </div>
</template>