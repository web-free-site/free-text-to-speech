<script setup>
import { PlayIcon } from 'lucide-vue-next';

defineProps({
  voices: {
    type: Array,
    required: true,
  },
  selectedVoice: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['voiceChange', 'voicePreview']);

const handleVoiceChange = (event) => {
  emit('voiceChange', event.target.value);
};

const handlePreview = (voiceId) => {
  emit('voicePreview', voiceId);
};
</script>

<template>
  <div class="flex items-center gap-2 flex-1">
    <div class="relative flex-1">
      <select
        id="voice-selector"
        :value="selectedVoice"
        class="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        @change="handleVoiceChange"
      >
        <option v-for="voice in voices" :key="voice.id" :value="voice.id">
          {{ voice.name }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    <button
      class="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
      title="Preview this voice"
      @click="handlePreview(selectedVoice)"
    >
      <PlayIcon class="w-4 h-4 text-gray-600 dark:text-gray-300" />
    </button>
  </div>
</template>