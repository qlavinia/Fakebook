<script setup>

import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import userService from '@/services/UserService.js'
import debounce from 'lodash.debounce'
import { useAuthStore } from '../stores/AuthStore';

const router = useRouter();
const searchName = ref('');
const authStore = useAuthStore();
const searchResults = ref(null);
const showResults = ref(false);
const userId = authStore.userId;
const userIsLoggedIn = authStore.isAuthenticated;


onMounted(() => {
    const divToHide = document.getElementById('searchResultUi');
    if (divToHide != null) {
        if (searchResults.value == null) {

            divToHide.style.display = 'none';
        }
        else {
            divToHide.style.display = 'block';
        }
    }
})

const update = debounce(() => {
    userService.getUsers(searchName.value, userId)
        .then((response) => {
            searchResults.value = response;
            console.log(response);
            showResults.value = response.length > 0
        })
}, 500)

watch(searchName, () => {
    update()
})

function performLogout() {
    authStore.clearUser();

    router.push('/');
    window.location.reload();
}

// const hideSearchResults = function()
// {
//     const divToHide = document.getElementById('searchResultUi');
//   if (searchResultUi) {
//     divToHide.style.display = 'none';
//   }
// }

const redirectToPage = function (id) {
    //showResults = false;
    const divToHide = document.getElementById('searchResultUi');
    searchResults.value = null;
    router.push({ name: 'user', params: { userId: id } })
}

// const emitLogoutEvent = () => {
//   const userIsLoggedOut = true;
//   emit("logout-user", userIsLoggedOut);

//   authStore.clearUser();
//   router.push('/');
// };

</script>


<template>
    <div v-if="userIsLoggedIn" class="searchLogout">
        <div>
            <input v-model="searchName" type="text" class="search-input" placeholder="Search users">

            <ul v-if="showResults" class="search-results" id="searchResultUi">
                <li v-for="result in searchResults" :key="result.id" @click="redirectToPage(result.id)">{{ result.name }}
                </li>
            </ul>
        </div>
        <button @click="$emit('logout-user')" class="logout-button">Logout</button>
    </div>
</template>

<style scoped>
.search-input {
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    background-color: #f2f2f2;
    color: #333;
    font-size: 14px;
    width: 250px;
}

.search-input:hover {
    border-color: cadetblue;
}

.search-results {
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    color: black;
    padding: 10px;
    width: 250px;
    max-height: 300px;
    overflow-y: auto;
    position: absolute;
    cursor: pointer;
    margin-top: 0px;
}

.search-results li {
    display: block;
    text-align: left;
    padding: 2px;
}

.searchLogout {
    float: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    margin-right: 100px;
}

.logout-button {
    border: none;
    background-color: transparent;
    color: white;
    font-weight: bolder;
    padding: 0;
    cursor: pointer;
    /* Add pointer cursor for interaction */
}
</style>