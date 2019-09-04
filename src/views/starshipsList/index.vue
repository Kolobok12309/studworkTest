<template>
    <v-data-table
        class="starship-table"
        :headers="headers"
        :items="starships"
        :loading="loading"
        loading-text="Результаты загружаются..."
        disable-filtering
        disable-sort
        :items-per-page="10"
        :options.sync="options"
        :server-items-length="count"
        @click:row="openRow"
    />
</template>

<script lang="ts">
import Vue from 'vue';
import { Starship } from '@/types';

const headers = [
    {
        text: 'Модель',
        value: 'model',
    },
    {
        text: 'Название',
        value: 'name',
    },
    {
        text: 'Класс',
        value: 'starship_class',
    },
    {
        text: 'Создан',
        value: 'created',
    },
];

export default Vue.extend({
    name: 'starshipList',
    props: {
        query: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            loading: true,
            count: -1,
            options: {
                page: 1,
            },
            starships: [] as Starship[],
            headers,
        };
    },
    watch: {
        options: {
            deep: true,
            handler(newVal, oldVal) {
                if (newVal.page !== oldVal.page) this.loadPage(newVal.page, this.query);
            },
        },
    },
    mounted() {
        this.loadPage(1, this.query);
    },
    beforeRouteUpdate(to, from, next) {
        next();
        this.options.page = Number(to.query.page) || 1;
        this.loadPage(1, to.query.search);
    },
    methods: {
        loadPage(page?: number, searchQuery?: string) {
            let requestUrl = `/api/starships/?page=${page || 1}`;
            if (searchQuery) requestUrl += `&search=${searchQuery}`;

            this.loading = true;
            this.$Net.get(requestUrl)
                .then(({ count, results }) => {
                    this.count = count;
                    this.starships = results;
                })
                .catch((err) => {
                    this.starships = [];
                    console.error(err);
                    alert(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        openRow(starship: Starship) {
            const regex = /\/starships\/(\d*)\//;
            const regexResult = starship.url.match(regex);
            if (regexResult) {
                const id = regexResult[1];

                this.$router.push(`/starship/item_${id}`);
            }
        },
    },
});
</script>

<style lang="scss">
.starship-table {
    tbody tr {
        cursor: pointer;
    }
}
</style>
