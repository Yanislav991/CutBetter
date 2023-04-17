<template>
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
                    <input type="number" :name="'size-' + index" />
                    <input type="number" :name="'size-count' + index" />
                </li>
            </ul>
        </section>
        <button type="button" @click="addItem()">Add new size</button>
        <input type="submit" text="Submit" />
    </form>
</template>
<script>
import CutService from '@/services/cut_service';

export default {
    name: "HomeComponent",
    data() {
        return {
            materialPipeSize: 0,
            sizes: []
        }
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
            this.materialPipeSize = 100;
            sizesObj = [20, 30, 40, 50, 45];
            var result = service.getPieces(this.materialPipeSize, sizesObj)
            console.log(result)
        }

    }
}

</script>
<style lang="">
    
</style>