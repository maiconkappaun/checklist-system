<script setup lang="ts">
import ItemForm from "../components/itens/ItemForm.vue";
import ItemList from "../components/itens/ItemList.vue";
</script>

<template>
  <div
    class="mx-auto min-h-[calc(100vh-73px)] max-w-5xl px-6 py-10"
  >
    <div class="mb-8">
      <h1
        class="text-3xl font-bold text-slate-800"
      >
        Itens de verificação
      </h1>

      <p class="mt-2 text-slate-500">
        Cadastre e gerencie os itens utilizados
        nos checklists.
      </p>
    </div>

    <div class="space-y-6">
      <ItemForm />

      <ItemList />
    </div>
  </div>
</template>