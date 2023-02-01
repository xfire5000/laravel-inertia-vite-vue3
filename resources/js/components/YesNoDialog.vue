<template lang="pug">
v-dialog(max-width="350" v-model="dialog")
    template(v-slot:activator="{props}")
        slot(:bind="props" name="activator")
    v-card
        v-card-title
            v-icon(size="28" color="info" right) mdi-message-question
            slot(name="title")
        v-card-text
            slot(name="content")
        v-card-actions
            v-spacer
            v-btn(text small color="success" v-on:click="$emit('yes');dialog=false")
                v-icon.ml-2 mdi-check
                span بله
            v-btn(text small color="red" v-on:click="$emit('no');dialog=false")
                v-icon.ml-2 mdi-close
                span خیر
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "YesNoDialog",
    data() {
        return {
            dialog: false,
        };
    },
});
</script>

<style scoped></style>
