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
                </li>
            </ul>
        </section>
        <button type="button" @click="addItem()">Add new size</button>
        <input type="submit" text="Submit" />
    </form>
</template>
<script>

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
            console.log(e)
            var formData = new FormData(e.target);
            for (const value of formData.values()) {
                console.log(value)
                // console.log(`${pair[0]}, ${pair[1]}`);
            }
        }
    }
}
</script>
<style lang="">
    
</style>