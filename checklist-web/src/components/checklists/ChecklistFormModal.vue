<script setup lang="ts">
import ChecklistForm from "./ChecklistForm.vue";

defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    close: [];
}>();
</script>

<template>
    <Teleport to="body">
        <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            @click.self="emit('close')">
            <div class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-slate-50">
                <div
                    class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
                    <h2 class="text-xl font-semibold text-slate-800">
                        Novo checklist
                    </h2>

                    <button type="button"
                        class="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                        @click="emit('close')">
                        ×
                    </button>
                </div>

                <div class="p-4 sm:p-6">
                    <ChecklistForm @success="emit('close')" />
                </div>
            </div>
        </div>
    </Teleport>
</template>