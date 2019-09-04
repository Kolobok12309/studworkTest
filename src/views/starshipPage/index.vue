<template>
    <v-container>
        <v-progress-linear
            :active="loading"
            :indeterminate="loading"
        />
        <v-layout
            v-for="prop in properties"
            :key="prop.key"
        >
            <v-flex xs6>
                {{prop.key}}
            </v-flex>
            <v-flex xs6>
                {{prop.value}}
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Starship } from '@/types';

export default Vue.extend({
    name: 'starshipPage',
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            starship: {} as Starship,
            loading: true,
        };
    },
    computed: {
        properties() {
            const keys = Object.keys(this.starship);
            return keys.map(key => ({ key, value: this.starship[key] }));
        },
    },
    mounted() {
        this.loadStarship(this.id);
    },
    beforeRouteUpdate(to, from, next) {
        next();
        this.loadStarship(Number(to.params.id));
    },
    methods: {
        loadStarship(id: number) {
            this.loading = true;
            this.$Net.get(`/api/starships/${id}`)
                .then((starship: Starship) => {
                    console.log(starship);
                    this.starship = starship;
                })
                .catch((err) => {
                    console.error(err);
                    alert(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
});
</script>
