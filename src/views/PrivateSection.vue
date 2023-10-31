<script setup>

import MessageDisplay from '@/components/MessageDisplay.vue';
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/AuthStore';

import {messageService} from '@/services/MessageService.js'

const messages = ref(null);
const authStore = useAuthStore();
const name = authStore.name;
const userId = authStore.userId;

onMounted(() => {
    console.log("userID?????" + userId);
    messageService.getFriendsMessages(userId)
        .then((response) => {
            messages.value = response
        })
        .catch((error) => {
            console.log(error)
        });
})

</script>

<template>
    <div>
        <div class="title">Welcome {{ name }}</div>

        <div class="messageDisplay">
            <MessageDisplay v-for="message in messages" :key="message.id" :message="message" />
        </div>
    </div>
</template>

<style scoped>
.title {
    display: flex;
    color: cadetblue;
    flex-direction: column;
    align-items: center;
    font-size: 2em;
    font-weight: bold;
    padding: 30px;
}

.search-results {
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    padding: 10px;
    position: absolute;
    width: 250px;
    max-height: 300px;
    overflow-y: auto;
}

.search-results li {
    display: block;
    text-align: left;
    padding: 2px;
}

.messageDisplay {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>