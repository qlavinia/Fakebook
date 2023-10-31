<script setup>

import MessageDisplay from '@/components/MessageDisplay.vue';
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { messageService } from '@/services/MessageService.js'

const router = useRouter();
const authStore = useAuthStore();

const messages = ref(null);

const messagesSourceEnum = {
  PUBLIC: 'public',
  FRIENDS: 'friends',
  OWN: 'own',
};

const props = defineProps(['page', 'sourcePage']);
const pageNumber = computed(() => props.page);
const messagesSourcePage = computed(() => props.sourcePage);

const loggedInUser = authStore.userId;
const totalMessagesNumber = ref(0);

const hasNextPage = computed( () => {
  const totalPages = Math.ceil(totalMessagesNumber.value / 4);
  return pageNumber.value < totalPages;
})   

onMounted(() => {
  watchEffect(() => {
    if (messagesSourcePage.value == messagesSourceEnum.PUBLIC) {
      messageService.getMessages(pageNumber.value, 4, -1)
        .then((response) => {
          messages.value = response.messages;
          totalMessagesNumber.value = response.totalCount;
        })
        .catch((error) => {
          console.log(error)
        })
    }
    else if (messagesSourcePage.value == messagesSourceEnum.FRIENDS) {
      messageService.getMessages(pageNumber.value, 4, loggedInUser)
        .then((response) => {
          messages.value = response.messages;
          totalMessagesNumber.value = response.totalCount;
        })
        .catch((error) => {
          console.log(error)
        })
    }
    else if (messagesSourcePage.value == messagesSourceEnum.OWN) {
      console.log(loggedInUser);
      messageService.getOwnMessages(pageNumber.value, 4, loggedInUser)
        .then((response) => {
          messages.value = response.messages;
          totalMessagesNumber.value = response.totalCount;
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
});

</script>

<template>
  <h1>Messages</h1>

  <div class="messageDisplay">
    <MessageDisplay v-for="message in messages" :key="message.id" :message="message" />
  </div>
  <router-link :to=" { name: router.currentRoute.value.name, query: { page: pageNumber - 1, items: 5} } " rel="prev"
    v-if=" pageNumber != 1 " class="prevPage">
    Prev Page
  </router-link>

  <router-link :to=" { name: router.currentRoute.value.name, query: { page: pageNumber + 1 } } " rel="next"
    v-if="hasNextPage" class="nextPage">
    Next Page
  </router-link>

</template>

<style scoped>
.messageDisplay {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nextPage
{
  float:right;
  padding-right: 440px;
}

.prevPage
{
  float: left;
  padding-left: 440px;
}

</style>