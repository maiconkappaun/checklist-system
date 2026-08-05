<script setup lang="ts">
import type {
    Checklist,
    ChecklistStatus,
} from "../../types/checklist";

const props = defineProps<{
    open: boolean;
    checklist: Checklist | null;
}>();

const emit = defineEmits<{
    close: [];
    save: [status: ChecklistStatus];
}>();

function alterarStatus() {
    if (!props.checklist) {
        return;
    }

    const novoStatus: ChecklistStatus =
        props.checklist.status === "PRONTO"
            ? "RASCUNHO"
            : "PRONTO";

    emit("save", novoStatus);
}
</script>

<template>
    <Teleport to="body">
        <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            @click.self="emit('close')">
            <div class="w-full max-w-md rounded-2xl bg-white shadow-xl">
                <!-- Cabeçalho -->
                <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 class="text-xl font-semibold text-slate-800">
                            Alterar status
                        </h2>

                        <p v-if="checklist" class="mt-1 text-sm text-slate-500">
                            {{ checklist.nome }}
                        </p>
                    </div>

                    <button type="button"
                        class="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100"
                        @click="emit('close')">
                        ×
                    </button>
                </div>

                <!-- Conteúdo -->
                <div class="p-6">
                    <!-- Rascunho -->
                    <template v-if="
                        checklist?.status === 'RASCUNHO'
                    ">
                        <p class="text-slate-600">
                            Deseja tornar este checklist
                            <strong>Pronto</strong>?
                        </p>

                        <p class="mt-3 text-sm text-slate-500">
                            O checklist ficará disponível na lista
                            de checklists.
                        </p>
                    </template>

                    <!-- Pronto -->
                    <template v-else>
                        <p class="text-slate-600">
                            Deseja voltar este checklist para
                            <strong>Rascunho</strong>?
                        </p>

                        <p class="mt-3 text-sm text-slate-500">
                            O checklist deixará de aparecer na lista
                            de checklists disponíveis.
                        </p>
                    </template>
                </div>

                <!-- Footer -->
                <div class="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                    <button type="button"
                        class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        @click="emit('close')">
                        Cancelar
                    </button>

                    <button type="button"
                        class="rounded-lg bg-blue-950  px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
                        @click="alterarStatus">
                        {{
                            checklist?.status === "PRONTO"
                                ? "Voltar para rascunho"
                                : "Tornar pronto"
                        }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>