<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore'
import { friendService } from '@/services/FriendService'

const router = useRouter();
const authStore = useAuthStore();

const error = ref('');
const friends = ref("");
const loggedInUserId = authStore.userId;


onMounted(() => {
    friendService.getFriends(loggedInUserId)
        .then((response) => {
            friends.value = response
        })
        .catch((exception) => {
            console.log(exception);
            error.value = exception;
        });

});

const redirectToPage = function (id) {
    router.push({ name: 'user', params: { userId: id } });
}

const removeFriend = function (userId) {
    if (confirm('Are you sure you want to remove this friend?')) {
        friendService.removeFriend(loggedInUserId, userId);
    }
}
</script>

<template>
    <div class="container">
        <ul class="friendsList">
            <li v-for="item in friends" :key="item.id">
                <span class="friend-name" @click="redirectToPage(item.id)">{{ item.name }}</span>
                <button class="remove-button" @click="removeFriend(item.id)">Remove Friend</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.container {
    width: 300px;
    /* Adjust the width as needed */
    padding: 10px;
    border: 1px solid #ccc;
}

.friendsList {
    list-style: none;
    padding: 0;
}

.friendsList li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    cursor: pointer;
}

.friend-name {
    flex-grow: 1;
    text-decoration: underline;
}

.remove-button {
    background-color: #ff0000;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 10px;
}

.remove-button:hover {
    background-color: #cc0000;
}
</style>