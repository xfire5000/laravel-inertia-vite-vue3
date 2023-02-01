<template>
    <typed :options="options">
        <h1 class="typing"></h1>
    </typed>
    <file-manager destination="des" file_type="image">
        <template #activator="{on,bind}">
            <v-btn v-bind="bind" color="info">
                upload
            </v-btn>
        </template>
    </file-manager>
    <v-btn color="primary" v-clipboard:copy="'plat text'" v-clipboard:success="onCopy">copy text</v-btn>
    <v-data-table :headers="headers" :items="items" :hide-footer="false" :no-hover="false" :rows-per-page="25"
                  :show-index="true" :loading="false" :current-page="1" body-text-direction="text-right">
        <template #item-name="item">
            {{ item.name }}
        </template>
    </v-data-table>
</template>

<script lang="ts">
import {Typed} from "@duskmoon/vue3-typed-js";
import type {TypedOptions} from "@duskmoon/vue3-typed-js";
import {defineComponent} from "vue";
import FileManager from "./FileManager.vue";

export default defineComponent({
    components: {FileManager, Typed,},
    data() {
        return {
            options: {
                strings: ["Hello", "World", "This is vue3-typed-js"],
                loop: true,
                typeSpeed: 30,
            } as TypedOptions,
            headers: [
                {text: "Name", value: "name", sortable: true},
                {text: "Height (cm)", value: "height", sortable: true},
                {text: "Weight (kg)", value: "weight", sortable: true},
                {text: "Age", value: "age", sortable: true}
            ],
            items: [
                {"name": "Curry", "height": 178, "weight": 77, "age": 20},
                {"name": "James", "height": 180, "weight": 75, "age": 21},
                {"name": "Jordan", "height": 181, "weight": 73, "age": 22}
            ]
        }
    },
    methods: {
        onCopy() {
            alert('copied')
        }
    },
})
</script>

<style scoped>

</style>
