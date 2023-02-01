<template lang="pug">
v-pagination(:total-visible="7" circle v-model="current_page" :length="total"
        v-on:input="onPageChange" v-on:next="onNextPage" v-on:previous="onPreviousPage" )
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "Paginator",
    props: {links: Array, current_page: Number, total: Number},
    methods: {
        onPageChange() {
            this.$inertia.visit(this.link_address);
        },
        onNextPage() {
            this.$inertia.visit(this.next_link);
        },
        onPreviousPage() {
            this.$inertia.visit(this.previous_link);
        },
    },
    computed: {
        link_address() {
            return this.links.find(
                (item) => item.label === this.current_page.toString()
            ).url;
        },
        next_link() {
            return this.links.find((item) => item.label === "Next &raquo;").url;
        },
        previous_link() {
            return this.links.find((item) => item.label === "&laquo; Previous")
                .url;
        },
    },
});
</script>

<style scoped></style>
