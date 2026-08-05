import { defineStore } from "pinia";
import { ref } from "vue";

import type {
    Checklist,
    ChecklistStatus,
    CreateChecklistData,
} from "../types/checklist";

import * as checklistService from "../services/checklist.service";

export const useChecklistStore = defineStore(
    "checklist",
    () => {
        const checklists = ref<Checklist[]>([]);
        const checklistsDisponiveis =
            ref<Checklist[]>([]);

        const checklistSelecionado =
            ref<Checklist | null>(null);

        const checklistsRascunho =
            ref<Checklist[]>([]);

        const loading = ref(false);
        const error = ref("");

        async function carregarChecklists() {
            try {
                loading.value = true;
                error.value = "";

                checklists.value =
                    await checklistService.getChecklists();
            } catch (err) {
                error.value =
                    err instanceof Error
                        ? err.message
                        : "Erro ao carregar checklists.";
            } finally {
                loading.value = false;
            }
        }

        async function carregarDisponiveis() {
            try {
                loading.value = true;
                error.value = "";

                checklistsDisponiveis.value =
                    await checklistService.getAvailableChecklists();
            } catch (err) {
                error.value =
                    err instanceof Error
                        ? err.message
                        : "Erro ao carregar checklists disponíveis.";
            } finally {
                loading.value = false;
            }
        }

        async function carregarChecklist(id: string) {
            try {
                loading.value = true;
                error.value = "";

                checklistSelecionado.value =
                    await checklistService.getChecklistById(id);
            } catch (err) {
                error.value =
                    err instanceof Error
                        ? err.message
                        : "Erro ao carregar checklist.";

                throw err;
            } finally {
                loading.value = false;
            }
        }

        async function cadastrarChecklist(
            data: CreateChecklistData,
        ) {
            try {
                loading.value = true;
                error.value = "";

                const checklist =
                    await checklistService.createChecklist(data);

                checklists.value.push(checklist);

                if (checklist.status === "PRONTO") {
                    checklistsDisponiveis.value.push(
                        checklist,
                    );
                }

                return checklist;
            } catch (err) {
                error.value =
                    err instanceof Error
                        ? err.message
                        : "Erro ao cadastrar checklist.";

                throw err;
            } finally {
                loading.value = false;
            }
        }

        async function alterarStatus(
            id: string,
            status: ChecklistStatus,
        ) {
            try {
                loading.value = true;
                error.value = "";

                const checklist =
                    await checklistService.updateChecklistStatus(
                        id,
                        status,
                    );

                await carregarDisponiveis();

                return checklist;
            } catch (err) {
                error.value =
                    err instanceof Error
                        ? err.message
                        : "Erro ao alterar status.";

                throw err;
            } finally {
                loading.value = false;
            }
        }



        async function carregarRascunhos() {
            try {
                loading.value = true;
                error.value = "";

                checklistsRascunho.value =
                    await checklistService.getDraftChecklists();
            } catch (err) {
                error.value =
                    err instanceof Error
                        ? err.message
                        : "Erro ao carregar rascunhos.";
            } finally {
                loading.value = false;
            }
        }


        return {
            checklists,
            checklistsDisponiveis,
            checklistsRascunho,
            checklistSelecionado,
            loading,
            error,

            carregarChecklists,
            carregarDisponiveis,
            carregarRascunhos,
            carregarChecklist,

            cadastrarChecklist,
            alterarStatus,
        };
    },
);