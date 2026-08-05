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
    <article class="rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-start justify-between gap-4">
            <h2 class="text-lg font-semibold text-slate-800">
                {{ checklist.nome }}
            </h2>

            <span class="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                Rascunho
            </span>
        </div>

        <p v-if="checklist.descricao" class="mb-4 text-sm leading-6 text-slate-500">
            {{ checklist.descricao }}
        </p>

        <p v-else class="mb-4 text-sm italic text-slate-400">
            Sem descrição
        </p>

        <p class="mb-5 text-sm text-slate-500">
            {{ checklist.checklistItems.length }}

            {{
                checklist.checklistItems.length === 1
                    ? "item"
                    : "itens"
            }}
        </p>

        <div class="flex gap-2">
            <RouterLink :to="`/checklists/${checklist.id}`"
                class="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Visualizar
            </RouterLink>

            <button type="button"
                class="flex-1 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                @click="emit('changeStatus')">
                Tornar pronto
            </button>
        </div>
    </article>
</template>