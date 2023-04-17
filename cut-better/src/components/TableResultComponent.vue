<template lang="">
    <div class="bars-container" v-for="item in filteredResult" :key="item">
        <div class="bar" :class="'piece-' + piece.type" v-for="(piece, index) in item" :key="piece" :style="{ width: pieceWidth(index, item) }">
            <span :class="'piece-' + piece.type">{{piece.value}}</span>
        </div>
    </div>
    <div class="legend" v-if="filteredResult.length > 0">
        <h5>Legend: </h5>
        <div class="legend-row">
            <div class="piece-circle circle"></div>
            <p> - Piece |</p>
        </div>
        <div class="legend-row">
            <div class="cut-circle circle"></div>
            <p> - Cut |</p>
        </div>
        <div class="legend-row">
            <div class="residue-circle circle"></div>
            <p> - Residue</p>
        </div>
        <button id="pdf" v-on:click="saveAsPdf">Save as PDF</button>
    </div>
</template>
<script>

export default {
    props: {
        result: Array,
    },
    watch: {
        result(newVal) {
            console.log(newVal)
        }
    },
    computed: {
        filteredResult() {
            return JSON.parse(JSON.stringify(this.result))
        }
    },
    methods: {
        getTotalValue(items) {
            return items.reduce((total, item) => total + item.value, 0)
        },
        pieceWidth(index, items) {
            const totalValue = this.getTotalValue(items)
            const pieceValue = items[index].value
            const percentWidth = (pieceValue / totalValue) * 100
            return `${percentWidth}%`
        },
        saveAsPdf() {
            // TODO: Export
            console.log("test")
        }
    }
}
</script>
<style scoped>
.bars-container {
    display: flex;
    width: 1200px;
}

.bar {
    padding: 20px;
    position: relative;
    height: 20px;
    margin: 10px 0px;
    background-color: #ddd;
    border: 1px solid black;
}

.piece-piece,
.piece-circle {
    background-color: lightblue;
}

.piece-cut,
.cut-circle {
    background-color: gray;
}

.piece-residuе,
.residue-circle {
    background-color: greenyellow;
}

.circle {
    width: 14px;
    height: 14px;
    border-radius: 50%
}

.legend {
    display: flex;
    gap: 15px;
}

.legend-row {
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>