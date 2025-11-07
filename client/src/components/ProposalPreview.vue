<template>
  <div class="bg-white p-6 rounded-2xl shadow overflow-y-auto max-h-[80vh]">
    <div v-if="proposal" class="space-y-6">
      <!-- Cabeçalho -->
      <div class="flex justify-between items-center border-b pb-3">
        <div>
          <h2 class="text-xl font-bold text-gray-800">{{ proposal.company.name }}</h2>
          <p class="text-sm text-gray-500">{{ proposal.company.contact }}</p>
        </div>
        <img v-if="proposal.company.logo" :src="proposal.company.logo" alt="Logo"
             class="h-12 object-contain" />
      </div>

      <!-- Dados do cliente -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Cliente</h3>
        <p class="text-gray-700">{{ proposal.client.name }}</p>
        <p v-if="proposal.client.company" class="text-gray-500">{{ proposal.client.company }}</p>
        <p class="text-gray-500">{{ proposal.client.email }}</p>
        <p class="text-gray-500">{{ proposal.client.phone }}</p>
      </div>

      <!-- Detalhes -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">{{ proposal.proposal.title }}</h3>
        <p class="text-gray-600 whitespace-pre-line">{{ proposal.proposal.description }}</p>
      </div>

      <!-- Itens -->
      <div>
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="p-2">Serviço</th>
              <th class="p-2">Qtd</th>
              <th class="p-2">Valor Unitário</th>
              <th class="p-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in proposal.items" :key="index" class="border-t">
              <td class="p-2">{{ item.name }}</td>
              <td class="p-2">{{ item.quantity }}</td>
              <td class="p-2">R$ {{ item.price.toFixed(2) }}</td>
              <td class="p-2 text-right">R$ {{ (item.quantity * item.price).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Total -->
      <div class="text-right text-lg font-semibold pt-2 border-t">
        Total: R$ {{ proposal.total.toFixed(2) }}
      </div>

      <!-- Condições -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Condições comerciais</h3>
        <p><strong>Forma de pagamento:</strong> {{ proposal.paymentMethod }}</p>
        <p><strong>Validade:</strong> {{ proposal.validity }} dias</p>
        <p v-if="proposal.notes" class="text-gray-600 mt-2 whitespace-pre-line">{{ proposal.notes }}</p>
      </div>

      <div v-if="proposal">
        <button type="button" class="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition" @click="generatePDF">
          Gerar PDF
        </button>
      </div>
    </div>

    <div v-else class="text-gray-500 text-center">
      Preencha os dados ao lado para visualizar a proposta.
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ proposal: any }>();


const generatePDF = async () => {
  // Lógica para gerar o PDF da proposta
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
  try {
    console.log(props.proposal);

    const res = await fetch(`${BASE_URL}/proposals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props.proposal),
    });

    console.log(res);
    if(!res.ok) {
      throw new Error('Erro ao gerar PDF');
    }

    const blob = await res.blob();

    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');


    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 5000);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
};
</script>