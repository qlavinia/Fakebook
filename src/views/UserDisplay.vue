<script setup>


import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore'
import { friendService } from '@/services/FriendService'

const router = useRouter();
const authStore = useAuthStore();

const loggedInUserId = authStore.userId;
const userId = ref(null);
const userIsFriend = ref(false);

const addFriend = function () {
    if (confirm('Are you sure you want to add this friend?')) {
        friendService.addFriend(loggedInUserId, userId.value);
    }
}

const removeFriend = function () {
    if (confirm('Are you sure you want to remove this friend?')) {
        friendService.removeFriend(loggedInUserId, userId.value);
    }
}

onMounted(() => {
    userId.value = router.currentRoute.value.params.userId;
    console.log(userId.value);
    friendService.userIsFriend(loggedInUserId, userId.value)
        .then((response) => {
            userIsFriend.value = response
            console.log(response);
        })
        .catch((exception) => {
            console.log(exception);
        });
}
);

</script>


<template>
    <div>
        <h1>User {{ this.$route.params.userId }}</h1>
        <button v-if="userIsFriend" @click="removeFriend"> Remove Friend
        </button>
        <button v-else="userIsFriend" @click="addFriend"> Add Friend
        </button>
    </div>
</template>



<style scoped></style>