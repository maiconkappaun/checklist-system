<template>
    <div class="min-h-screen bg-slate-50">
        <header class="border-b border-slate-200 bg-white">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <h1 class="text-xl font-bold text-slate-800">
                    Checklist
                </h1>

                <nav class="flex gap-6">
                    <RouterLink to="/itens" class="text-slate-600 hover:text-blue-600">
                        Itens
                    </RouterLink>

                    <RouterLink to="/checklists" class="text-slate-600 hover:text-blue-600">
                        Checklists
                    </RouterLink>
                </nav>
            </div>
        </header>

        <main>
            <RouterView />
        </main>
    </div>
</template>