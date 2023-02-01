<template lang="pug">
v-app
    FrontNavigation
    v-main
        slot(name="main")
</template>

<script>
import FrontNavigation from "./Navigation/FrontNavigation.vue";

export default {
    name: "FrontContentViewer",
    components: {FrontNavigation}
}
</script>

<style scoped>

</style>
