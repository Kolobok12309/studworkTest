<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Starships</span>
            </v-toolbar-title>
            <v-spacer/>

            <v-form
                @submit.prevent="search"
            >
                <v-text-field
                    v-model="searchQuery"
                    placeholder="Поиск"
                    hide-details
                    single-line
                    clearable
                    color="gray"
                />
            </v-form>
            <v-btn
                to="/"
            >
                Главная
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'App',
    data: () => ({
        searchQuery: '',
    }),
    methods: {
        search() {
            this.$router.push(`/starship/list?search=${this.searchQuery}`);
            this.searchQuery = '';
        },
    },
});
</script>
