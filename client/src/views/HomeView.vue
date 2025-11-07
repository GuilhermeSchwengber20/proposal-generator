<template>
  <div>
    <component
      :is="currentStep === 'form' ? ProposalForm : ProposalPreview"
      :formData="formData"
      @next="handleNext"
      @back="handleBack"
      @submit="handleSubmit"
    />

    <!-- Modal simples de carregamento -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
    >
      <div class="bg-white px-6 py-4 rounded-lg shadow">
        <p class="text-gray-700">Gerando PDF, aguarde...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProposalForm from '../components/ProposalForm.vue'
import ProposalPreview from '../components/ProposalPreview.vue'

const currentStep = ref('form')
const loading = ref(false)

const formData = ref({
  clientName: '',
  serviceDescription: '',
  price: '',
  paymentTerms: '',
  notes: ''
})

function handleNext(data) {
  formData.value = data
  currentStep.value = 'preview'
}

function handleBack() {
  currentStep.value = 'form'
}

async function handleSubmit(data) {
  loading.value = true
  try {
    // Exemplo de envio para backend (mock)
    const res = await fetch('http://localhost:3000/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')
  } catch (err) {
    alert('Erro ao gerar PDF')
  } finally {
    loading.value = false
  }
}
</script>