
<script setup>

</script>

<template>
    <div>
        <button v-if="isAuthenticated" @click="performLogout">Log Out</button>
    </div>
</template>

<style lang="scss" scoped></style>