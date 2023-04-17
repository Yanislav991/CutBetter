<template>
    <div class="home-wrapper">
        <section class="home-header">
            <h3>
                Cut Better
            </h3>
            <p>This is an application you can use to optimize cutting. To use it:</p>
        </section>
        <section class="home-instructions">
            <ol>
                <li>Insert the material pipe size.</li>
                <li>Insert the count of the sizes</li>
                <li>Then click the button and on the next step insert each size in centimers.</li>
            </ol>
        </section>
        <form v-on:submit="onSubmit">
            <section class="home-initial-input">
                <label for="material-pipe-Size">Material Pipe Size</label>
                <input id="material-pipe-size" type="number" v-model="materialPipeSize" />
            </section>
            <section class="home-sizes-input">
                <ul id="sizes">
                    <li v-for="(item, index) in sizes" :key="index">
                        <label for="'size-' + index">S{{ index }}:</label>
                        <input type="number" :name="'size-' + index" />
                        <label for="'size-' + index">C{{ index }}:</label>
                        <input type="number" :name="'size-count' + index" />
                    </li>
                </ul>
            </section>
            <button type="button" @click="addItem()">Add new size</button>
            <input type="submit" text="Submit" />
        </form>
        <table-result v-bind:result="result"></table-result>
    </div>
</template>
<script>
import CutService from '@/services/cut_service';
import TableResult from './TableResultComponent.vue';

export default {
    name: "HomeComponent",
    data() {
        return {
            materialPipeSize: 0,
            sizes: [],
            result: []
        }
    },
    components: {
        TableResult
    },
    methods: {
        addItem: function () {
            this.sizes.push({})
        },
        onSubmit: function (e) {
            e.preventDefault();
            var service = new CutService();

            var formData = new FormData(e.target);
            var sizes = Array.from(formData.values())
            var sizesObj = {}

            while (sizes.length != 0) {
                var size = Number(sizes.shift())
                var count = Number(sizes.shift())
                sizesObj[size] = count
            }

            this.result = service.getPieces(this.materialPipeSize, sizesObj);
            //console.log(this.result);
        }

    }
}

</script>
<style scoped>
ol {
    display: inline-block;
    text-align: left;
}

ul {
    list-style: none;
}

.home-wrapper {
    text-align: center;
    font-size: 20px;
}

.home-initial-input {
    display: flex;
    flex-wrap: wrap;
    width: 20%;
    margin: auto;
}

.home-initial-input label,
.home-initial-input input {
    width: 100%;
}
</style>