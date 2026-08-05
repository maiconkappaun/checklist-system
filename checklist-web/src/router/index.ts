import {
    createRouter,
    createWebHistory,
} from "vue-router";

import DefaultLayout from "../layouts/DefaultLayout.vue";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL,
    ),

    routes: [
        {
            path: "/",
            component: DefaultLayout,

            children: [
                {
                    path: "",
                    redirect: "/checklists",
                },
                {
                    path: "itens",
                    name: "itens",
                    component: () =>
                        import("../pages/ItensPage.vue"),
                },
                {
                    path: "checklists",
                    name: "checklists",
                    component: () =>
                        import("../pages/ChecklistsPage.vue"),
                },
                {
                    path: "checklists/:id",
                    name: "checklist",
                    component: () =>
                        import("../pages/ChecklistPage.vue"),
                },
                {
                    path: "/checklists/rascunhos",
                    name: "checklist-drafts",
                    component: () =>
                        import("../pages/ChecklistsDraftsPage.vue"),
                },
            ],
        },
    ],
});

export default router;