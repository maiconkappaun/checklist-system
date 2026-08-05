<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useItemStore } from "../../stores/item.store";
import { useChecklistStore } from "../../stores/checklist.store";

import type { ChecklistStatus } from "../../types/checklist";

const itemStore = useItemStore();
const checklistStore = useChecklistStore();

const nome = ref("");
const descricao = ref("");
const status = ref<ChecklistStatus>("RASCUNHO");

const itensSelecionados = ref<string[]>([]);

const success = ref("");

const podeCadastrar = computed(() => {
    return (
        nome.value.trim() !== "" &&
        itensSelecionados.value.length > 0
    );
});

onMounted(() => {
    itemStore.carregarItens();
});

function alternarItem(itemId: string) {
    const index =
        itensSelecionados.value.indexOf(itemId);

    if (index === -1) {
        itensSelecionados.value.push(itemId);
    } else {
        itensSelecionados.value.splice(index, 1);
    }
}

function itemSelecionado(itemId: string) {
    return itensSelecionados.value.includes(itemId);
}

async function handleSubmit() {
  if (!podeCadastrar.value) {
    return;
  }

  try {
    success.value = "";

    await checklistStore.cadastrarChecklist({
      nome: nome.value.trim(),
      descricao: descricao.value.trim() || undefined,
      status: status.value,
      itemIds: itensSelecionados.value,
    });

    nome.value = "";
    descricao.value = "";
    status.value = "RASCUNHO";
    itensSelecionados.value = [];

    await checklistStore.carregarDisponiveis();

    emit("success");
  } catch {
    // Erro tratado pelo store.
  }
}
const emit = defineEmits<{
    success: [];
}>();
</script>

<template>
    <section class="rounded-xl bg-white p-6 shadow-sm">
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-slate-800">
                Novo checklist
            </h2>

            <p class="mt-1 text-sm text-slate-500">
                Preencha as informações e selecione os
                itens que farão parte do checklist.
            </p>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Nome -->
            <div>
                <label for="nome" class="mb-2 block text-sm font-medium text-slate-700">
                    Nome
                </label>

                <input id="nome" v-model="nome" type="text" placeholder="Ex.: Checklist de abertura"
                    class="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </div>

            <!-- Descrição -->
            <div>
                <label for="descricao" class="mb-2 block text-sm font-medium text-slate-700">
                    Descrição
                    <span class="font-normal text-slate-400">
                        (opcional)
                    </span>
                </label>

                <textarea id="descricao" v-model="descricao" rows="3"
                    placeholder="Descreva o objetivo deste checklist..."
                    class="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </div>

            <!-- Status -->
            <div>
                <span class="mb-3 block text-sm font-medium text-slate-700">
                    Status
                </span>

                <div class="flex gap-6">
                    <label class="flex cursor-pointer items-center gap-2">
                        <input v-model="status" type="radio" value="RASCUNHO" class="h-4 w-4" />

                        <span class="text-sm text-slate-700">
                            Rascunho
                        </span>
                    </label>

                    <label class="flex cursor-pointer items-center gap-2">
                        <input v-model="status" type="radio" value="PRONTO" class="h-4 w-4" />

                        <span class="text-sm text-slate-700">
                            Pronto
                        </span>
                    </label>
                </div>
            </div>

            <!-- Itens -->
            <div>
                <div class="mb-3">
                    <h3 class="text-sm font-medium text-slate-700">
                        Itens do checklist
                    </h3>

                    <p class="mt-1 text-xs text-slate-500">
                        Selecione um ou mais itens.
                    </p>
                </div>

                <!-- Carregando -->
                <div v-if="
                    itemStore.loading &&
                    !itemStore.items.length
                " class="rounded-lg border border-slate-200 p-6 text-center text-sm text-slate-500">
                    Carregando itens...
                </div>

                <!-- Nenhum item -->
                <div v-else-if="!itemStore.items.length"
                    class="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                    Nenhum item cadastrado.

                    <RouterLink to="/itens" class="ml-1 font-medium text-blue-600 hover:underline">
                        Cadastrar item
                    </RouterLink>
                </div>

                <!-- Lista -->
                <div v-else class="divide-y divide-slate-100 rounded-lg border border-slate-200">
                    <label v-for="item in itemStore.items" :key="item.id"
                        class="flex cursor-pointer items-center gap-3 p-4 transition hover:bg-slate-50">
                        <input type="checkbox" :checked="itemSelecionado(item.id)" class="h-4 w-4 rounded"
                            @change="alternarItem(item.id)" />

                        <span class="text-sm text-slate-700">
                            {{ item.descricao }}
                        </span>
                    </label>
                </div>

                <p v-if="
                    itemStore.error
                " class="mt-2 text-sm text-red-600">
                    {{ itemStore.error }}
                </p>
            </div>

            <!-- Erro -->
            <p v-if="checklistStore.error" class="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {{ checklistStore.error }}
            </p>

            <!-- Sucesso -->
            <p v-if="success" class="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                {{ success }}
            </p>

            <!-- Botão -->
            <div class="flex justify-end">
                <button type="submit" :disabled="!podeCadastrar ||
                    checklistStore.loading
                    "
                    class="rounded-lg bg-blue-950  px-6 py-3 font-medium text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50">
                    {{
                        checklistStore.loading
                            ? "Cadastrando..."
                            : "Cadastrar checklist"
                    }}
                </button>
            </div>
        </form>
    </section>
</template>