<template>
    <section>
        <p class="content"><b><h3>Auto-complete</h3></b></p>
        <b-field label="For quick help, use Auto-complete">
            <b-autocomplete
                rounded
                v-model="name"
                :data="filteredDataArray"
                placeholder="e.g. My fitness Tracker"
                icon="magnify"
                clearable
                @select="option => selected = option">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
import { userInfo } from 'os'

    export default {
        data() {
            return {
                data: [userInfo],
                name: '',
                selected: null
            }
        },
        computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }
        }
    }
</script>
hgvgj