<template>
  <form @submit.prevent class="bg-white p-6 rounded-2xl shadow space-y-6">
    <!-- Empresa -->
    <div>
      <h2 class="text-xl font-semibold mb-3 text-gray-700">Empresa</h2>
      <div class="space-y-3">
        <input v-model="form.company.name" type="text" placeholder="Nome da empresa" class="input" />
        <p v-if="errors.companyName" class="text-red-500 text-sm mt-1">{{ errors.companyName }}</p>
        <input v-model="form.company.contact" type="text" placeholder="Contato / site"
               class="input" />
        <input type="file" accept="image/*" @change="onLogoUpload" class="input-file" />
      </div>
    </div>

    <!-- Cliente -->
    <div>
      <h2 class="text-xl font-semibold mb-3 text-gray-700">Cliente</h2>
      <div class="space-y-3">
        <input v-model="form.client.name" type="text" placeholder="Nome do cliente" class="input" />
        <p v-if="errors.clientName" class="text-red-500 text-sm mt-1">{{ errors.clientName }}</p>

        <input v-model="form.client.company" type="text" placeholder="Empresa (opcional)" class="input" />
        <input v-model="form.client.email" type="email" placeholder="E-mail" class="input" />
        <input v-model="form.client.phone" type="text" placeholder="(##) #####-####" class="input" @input="form.client.phone = formatPhone(form.client.phone)" />
        <p v-if="errors.clientPhone" class="text-red-500 text-sm mt-1">{{ errors.clientPhone }}</p>

      </div>
    </div>

    <!-- Detalhes da proposta -->
    <div>
      <h2 class="text-xl font-semibold mb-3 text-gray-700">Detalhes da proposta</h2>
      <div class="space-y-3">
        <input v-model="form.proposal.title" type="text" placeholder="Título da proposta" class="input" />
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>

        <textarea v-model="form.proposal.description" placeholder="Descrição / resumo" class="input h-24" />
      </div>
    </div>

    <!-- Itens / serviços -->
    <div>
      <h2 class="text-xl font-semibold mb-3 text-gray-700">Serviços / Itens</h2>
      <div v-for="(item, index) in form.items" :key="index" class="grid grid-cols-12 gap-3 mb-3">
        <input v-model="item.name" type="text" placeholder="Serviço" class="input col-span-4" />
        <input v-model.number="item.quantity" type="number" min="1" placeholder="Qtd" class="input col-span-2" />
        <input v-model.number="item.price" type="number" min="0" step="0.01" placeholder="Valor unitário" class="input col-span-4" />
        <button type="button" class="text-red-600 font-bold col-span-2" @click="removeItem(index)">✕</button>
      </div>
      <p v-if="errors.items" class="text-red-500 text-sm mt-1">{{ errors.items }}</p>

      <button type="button" @click="addItem" class="text-blue-600 font-semibold hover:underline">
        + Adicionar item
      </button>
    </div>

    <!-- Condições -->
    <div>
      <h2 class="text-xl font-semibold mb-3 text-gray-700">Condições comerciais</h2>
      <div class="space-y-3">
        <select v-model="form.paymentMethod" class="input">
          <option disabled value="">Forma de pagamento</option>
          <option>À vista</option>
          <option>Parcelado</option>
          <option>Pix</option>
          <option>Boleto</option>
        </select>
        <input v-model.number="form.validity" type="number" placeholder="Validade (dias)" class="input" />
        <textarea v-model="form.notes" placeholder="Observações adicionais" class="input h-20" />
      </div>
    </div>

    <!-- Total -->
    <div class="pt-4 border-t">
      <p class="text-right text-lg font-semibold text-gray-700">
        Total: R$ {{ total.toFixed(2) }}
      </p>
    </div>

    <button type="button" @click="emitUpdate"
            class="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
      Atualizar Preview
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits(["update"]);

const form = ref({
  company: { name: "", contact: "", logo: "" },
  client: { name: "", company: "", email: "", phone: "" },
  proposal: { title: "", description: "" },
  items: [{ name: "", quantity: 1, price: 0 }],
  paymentMethod: "",
  validity: 15,
  notes: "",
});

const errors = ref<Record<string, string>>({});

const validateForm = () => {
  // Adicione validações conforme necessário
  errors.value = {};
  if(!form.value.company.name) {
    errors.value.companyName = "O nome da empresa é obrigatório.";
  }
  if(!form.value.client.name) {
    errors.value.clientName = "O nome do cliente é obrigatório.";
  }
  if(!form.value.client.phone) {
    errors.value.clientPhone = "O telefone do cliente é obrigatório.";
  }

  if (!form.value.proposal.title) errors.value.title = 'O título é obrigatório'
  
  if (form.value.items.length < 2) errors.value.items = 'Adicione pelo menos um item'

  return Object.keys(errors.value).length === 0
}

const total = computed(() =>
  form.value.items.reduce((acc, item) => acc + item.quantity * item.price, 0)
);

const addItem = () => {
  form.value.items.push({ name: "", quantity: 1, price: 0 });
}

const removeItem = (index: number) => {
  form.value.items.splice(index, 1);
}

const onLogoUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => (form.value.company.logo = e.target?.result as string);
    reader.readAsDataURL(file);
  }
}

const formatPhone = (value: string) => {
  value = value.replace(/\D/g, '') // remove tudo que não for número
  if (value.length > 11) value = value.slice(0, 11)
  if (value.length <= 10) {
    return value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  } else {
    return value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  }
}

const emitUpdate = () => {
  if(!validateForm()) return;
  emit("update", { ...form.value, total: total.value });
}
</script>
