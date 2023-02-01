<template lang="pug">
v-dialog(v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition")
    template(v-slot:activator="{ props }")
        slot(name="activator" :bind="props")
    v-card(:loading="loading")
        v-toolbar(dark color="primary")
            v-btn(icon dark @click="dialog = false")
                v-icon mdi-close
            v-toolbar-title مدیریت فایل
            v-spacer
            v-toolbar-items
                v-btn(dark text @click=`
                            $emit('selected', fileInfo);
                            dialog = false;
                        ` :disabled=`
                            !multiSelect
                                ? selectedFile === null
                                : !selectedFile.length
                        `)
                    v-icon(small) mdi-check
                        | ذخیره
        vue-dropzone#vue-dropzone.mx-3.mt-3(:options="dropzoneOptions" @vdropzone-success="successUpload")
        template(#progress)
            v-progress-linear.mb-0(indeterminate color="primary")
        v-row.mt-3.mx-3
            v-col(cols="6" md="3")
                v-select(:items="sort_types" v-model="sort_type" item-text="title" item-value="value" label="مرتب سازی" hide-details outlined dense @change="sortDate")
            v-col(cols="6" md="2")
                v-switch.mt-0(inset color="warning" :label="des_sort === 1 ? 'مرتبط' : 'همه'" v-model="des_sort" :true-value="1" :false-value="0" @change="destination_sort" hide-details)
        v-row.custom-cols.mt-3.mx-3
            v-col(v-for="(item, index) in files" :key="index" :class="border_select(index)")
                v-tooltip(top)
                    template(v-slot:activator="{ on, attrs }")
                        v-badge.text-white(color="transparent" overlap offset-x="30" offset-y="-5")
                            template(v-slot:badge)
                                v-btn.border.border-white.shadow-sm.text-white(color="red" small fab @click="deleteFile(index)")
                                    v-tooltip(top)
                                        template(#activator="{on,attrs}")
                                            v-icon(small v-on="on" v-bind="attrs") mdi-delete
                                        span حذف
                            v-card.mx-auto.text-center(max-width="300" max-height="300" v-on="on" v-bind="attrs" @click="selection(index)")
                                v-img.lazyload(:src="'/store/' + item.src" :alt="item.title" max-height="180px" max-width="180px" v-if="file_type === 'image'")
                                v-icon(size="64" v-else-if="file_type === 'video'") mdi-movie
                                v-icon(size="64" v-else) mdi-file
                                v-card-actions
                                    div {{ item.title | str_limit(18) }}
                    span {{ item.title }}
</template>

<script>
import VueDropzone from "vue2-dropzone-vue3";
import {defineComponent} from "vue";

export default defineComponent({
    name: "FileManager",
    props: {destination: null, multiSelect: false, file_type: ""},
    components: {VueDropzone},
    data() {
        return {
            dialog: false,
            fileInfo: {},
            files: [],
            allFiles: [],
            selectedFile: null,
            loading: true,
            dropzoneOptions: {
                url:
                    window.location.origin +
                    "/api/admin/file_manager/store/" +
                    this.destination,
                headers: {
                    "X-CSRF-TOKEN": document.head.querySelector("[name=csrf-token]").content,
                    Authorization: this.$page.props.auth.token
                },
                uploadMultiple: true,
                dictDefaultMessage:
                    '<span data-v-473af3d5="" aria-hidden="true" class="v-icon notranslate ml-2 theme--light"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg></span>' +
                    "<div class='mt-3'>فایل خود را در این محل آپلود کنید</div>",
        //     thumbnailWidth: 150,
        //     maxFilesize: 10, // MB
            },
            types: [
                {title: "عکس", value: "image"},
                {title: "ویدئو", value: "video"},
                {title: "همه", value: "all"},
                {title: "صوت", value: "audio"},
            ],
            sort_type: 0,
            sort_types: [
                {title: "بر اساس تاریخ نزولی", value: 0},
                {title: "بر اساس تاریخ صعودی", value: 1},
                {title: "بر اساس نام نزولی", value: 3},
                {title: "بر اساس نام صعودی", value: 2},
            ],
            des_sort: 1,
        };
    },
    methods: {
        async fetchFiles() {
            await this.$http
                .get(`admin/file_manager/${this.file_type}`,{
                    headers: {Authorization: this.$page.props.auth.token}
                })
                .then((res) => {
                    // this.files = res.data
                    this.allFiles = res.data;
                    this.destination_sort();
                    this.loading = false;
                });
        },
        selection(index) {
            if (!this.multiSelect) {
                if (!Object.keys(this.fileInfo).length) {
                    this.fileInfo = this.files[index];
                    this.selectedFile = index;
                } else {
                    this.fileInfo = {};
                    this.selectedFile = null;
                }
            } else {
                if (this.selectedFile.indexOf(index) === -1) {
                    this.selectedFile.push(index);
                    this.fileInfo.push(this.files[index]);
                } else {
                    this.selectedFile.splice(
                        this.selectedFile.indexOf(index),
                        1
                    );
                    this.fileInfo.splice(this.files[index], 1);
                }
            }
        },
        border_select(index) {
            let class_ = "border border-2 border-info";
            if (!this.multiSelect)
                return this.selectedFile === index ? class_ : null;
            else {
                let response = false;
                this.fileInfo.find((file) => {
                    return file.id === this.files[index].id
                        ? (response = true)
                        : null;
                });
                if (response) return class_;
            }
        },
        deleteFile(index) {
            this.$http
                .get(`admin/file_manager/del/${this.files[index].id}`,{
                    headers: {Authorization: this.$page.props.auth.token}
                })
                .then(() => {
                    if (this.multiSelect)
                        this.fileInfo.find((file) => {
                            if (file === this.files[index]) {
                                this.fileInfo.splice(this.files[index], 1);
                                this.selectedFile.splice(index, 1);
                            }
                        });
                    else {
                        this.fileInfo = {};
                        this.selectedFile = null;
                    }
                    this.files.splice(index, 1);
                });
        },
        successUpload(file, response) {
            this.files.push(response);
        },
        sortDate() {
            switch (this.sort_type) {
                case 0:
                    this.files.sort(
                        (objA, objB) =>
                            new Date(objB.updated_at) -
                            new Date(objA.updated_at)
                    );
                    break;
                case 1:
                    this.files.sort(
                        (objA, objB) =>
                            new Date(objA.updated_at) -
                            new Date(objB.updated_at)
                    );
                    break;
                case 2:
                    this.files.sort(this.compareAscName);
                    break;
                case 3:
                    this.files.sort(this.compareDescName);
                    break;
            }
        },
        compareDescName(a, b) {
            // converting to uppercase to have case-insensitive comparison
            const name1 = a.title.toUpperCase();
            const name2 = b.title.toUpperCase();

            let comparison = 0;

            if (name1 > name2) {
                comparison = 1;
            } else if (name1 < name2) {
                comparison = -1;
            }
            return comparison;
        },
        compareAscName(a, b) {
            // converting to uppercase to have case-insensitive comparison
            const name1 = a.title.toUpperCase();
            const name2 = b.title.toUpperCase();

            let comparison = 0;

            if (name1 > name2) {
                comparison = -1;
            } else if (name1 < name2) {
                comparison = 1;
            }
            return comparison;
        },
        destination_sort() {
            this.files = [];
            if (this.des_sort)
                this.allFiles.forEach((item) => {
                    if (
                        item.src.match(
                            new RegExp(this.destination.toString() + ".*")
                        )
                    )
                        this.files.push(item);
                });
            else this.files = this.allFiles;
        },
    },
    created() {
        // this.fetchFiles()
        if (this.multiSelect) {
            this.fileInfo = [];
            this.selectedFile = [];
        }
    },
});
</script>

<style scoped>
.custom-cols {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
}
</style>
