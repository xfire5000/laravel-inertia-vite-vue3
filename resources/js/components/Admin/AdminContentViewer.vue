<template lang="pug">
v-app
    admin-navigation
    v-main
        slot(name="main")
    admin-footer
</template>

<script>
import AdminNavigation from "./Navigation/AdminNavigation.vue";
import AdminFooter from "./Footer/AdminFooter.vue";

export default {
    name: "AdminContentViewer",
    components: {AdminFooter, AdminNavigation}
}
</script>

<style scoped>

</style>
