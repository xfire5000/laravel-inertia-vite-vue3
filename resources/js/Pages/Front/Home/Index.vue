<template lang="pug">
front-content-viewer
    template(v-slot:main)
        v-container
            AllComponentsUsable
</template>

<script>
import FrontContentViewer from "../../../components/Front/FrontContentViewer.vue";
import AllComponentsUsable from "@/components/AllComponentsUsable.vue";

export default {
    name: "Index",
    components: {AllComponentsUsable, FrontContentViewer},
}
</script>

<style scoped>

</style>
