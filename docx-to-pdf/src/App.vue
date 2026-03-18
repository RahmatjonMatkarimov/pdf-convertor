<template>
  <div class="min-h-screen w-full flex items-center justify-center relative p-5 bg-slate-950 overflow-hidden font-['Outfit']">
    <div class="absolute top-[-100px] left-[-200px] w-[500px] h-[500px] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[80px] z-0 animate-float pointer-events-none"></div>
    <div class="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-pink-500/20 rounded-full mix-blend-screen filter blur-[80px] z-0 animate-float [animation-delay:-5s] pointer-events-none"></div>

    <div class="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-3xl p-8 sm:p-12 w-full max-w-lg flex flex-col gap-8 animate-[slideIn_0.6s_ease-out]">
      <div class="text-center">
        <h1 class="text-3xl sm:text-4xl font-bold bg-linear-to-br from-white to-slate-400 text-transparent bg-clip-text mb-2">
          Fayllarni PDF'ga aylantirish
        </h1>
        <p class="text-slate-400 text-base">Word, Excel, Rasm va istalgan hujjatni tez va oson PDF'ga o'tkazing</p>
      </div>

      <div 
        class="relative group border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 overflow-hidden cursor-pointer flex flex-col items-center justify-center"
        :class="[isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/20 bg-white/5 hover:border-indigo-500 hover:bg-indigo-500/5']"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <input 
          type="file" 
          id="fileInput" 
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          @change="getFile"
          accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.bmp,.gif,.tiff,.txt,.rtf"
        >
        
        <div class="flex flex-col items-center gap-4 pointer-events-none">
          <template v-if="!file">
            <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:text-indigo-300 transition-all duration-300">
              <Icon icon="ph:cloud-arrow-up-duotone" class="w-10 h-10" />
            </div>
            <p class="text-slate-300 text-lg">
              Faylni bu yerga tashlang, yoki <span class="text-indigo-400 font-semibold underline">tanlang</span>
            </p>
          </template>

          <template v-else>
            <div class="text-pink-500 w-12 h-12 mb-1">
              <Icon icon="ph:file-duotone" class="w-12 h-12" />
            </div>
            <span class="text-white font-medium text-lg break-all max-w-[90%]">{{ file.name }}</span>
            <span class="text-slate-400 text-sm">{{ formatSize(file.size) }}</span>
          </template>
        </div>
      </div>

      <button 
        class="relative w-full overflow-hidden bg-linear-to-br from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white border-none rounded-xl py-4 text-lg font-semibold shadow-[0_10px_20px_-10px_rgba(99,102,241,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_25px_-10px_rgba(99,102,241,0.7)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-none disabled:bg-white/10 disabled:shadow-none disabled:transform-none group"
        :class="{ 'text-transparent! bg-indigo-500/80!': isLoading }"
        @click="sumbit"
        :disabled="!file || isLoading"
      >
        <span>PDF'ga o'tkazish</span>
        
        <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import convertor from './utils/api';

const file = ref(null);
const isDragging = ref(false);
const isLoading = ref(false);

function getFile(event) {
  const selectedFile = event.target.files[0];
  if (selectedFile) file.value = selectedFile;
}

function handleDrop(event) {
  isDragging.value = false;
  const droppedFile = event.dataTransfer.files[0];
  if (droppedFile) {
    file.value = droppedFile;
    const fileInput = document.getElementById('fileInput');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(droppedFile);
    fileInput.files = dataTransfer.files;
  }
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function sumbit() {
  if (!file.value) return;
  isLoading.value = true;
  try {
    await convertor(file.value);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>