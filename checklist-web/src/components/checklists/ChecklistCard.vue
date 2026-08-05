<script setup lang="ts">
import type { Checklist } from "../../types/checklist";

defineProps<{
    checklist: Checklist;
}>();

const emit = defineEmits<{
    changeStatus: [];
}>();
</script>

<template>
    <article
        class="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between gap-4">
            <h2 class="text-lg font-semibold text-slate-800">
                {{ checklist.nome }}
            </h2>

            <span class="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Pronto
            </span>
        </div>

        <p v-if="checklist.descricao" class="mb-5 line-clamp-3 text-sm leading-6 text-slate-500">
            {{ checklist.descricao }}
        </p>

        <p v-else class="mb-5 text-sm italic text-slate-400">
            Sem descrição
        </p>

        <div class="mt-auto space-y-2">
            <p class="text-sm text-slate-500">
                {{ checklist.checklistItems.length }}
                {{
                    checklist.checklistItems.length === 1
                        ? "item"
                        : "itens"
                }}
            </p>

            <RouterLink :to="`/checklists/${checklist.id}`"
                class="block rounded-lg bg-blue-950  px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-cyan-500">
                Visualizar checklist
            </RouterLink>

            <button type="button"
                class="block w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                @click="emit('changeStatus')">
                Alterar status
            </button>
        </div>
    </article>
</template>