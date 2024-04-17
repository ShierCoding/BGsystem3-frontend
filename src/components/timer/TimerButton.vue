<template>
    <div class="btn"><slot></slot></div>
</template>

<style scoped>
.btn {
    display: inline-block;
    padding: 0.3em 0.7em;
    background-color: #fff1;
    backdrop-filter: blur(1em);
    border: 1px solid #fff4;
    /* color: #fff; */
    border-radius: .5em;
    cursor: pointer;
    transition: .5s;

    font-size: 1.2em;
}

.btn:active {
    background-color: #fff3;
}
</style>