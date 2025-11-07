<template>
  <main class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">
        Gerador de Propostas Comerciais
      </h1>

      <div class="grid md:grid-cols-2 gap-8">
        <ProposalForm @update="proposal = $event" />
        <ProposalPreview :proposal="proposal" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProposalForm from "./components/ProposalForm.vue";
import ProposalPreview from "./components/ProposalPreview.vue";
const proposal = ref<any>(null);
</script>