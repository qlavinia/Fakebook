<script setup>

import {ref} from 'vue';

let showImagePopup = ref(false);

const openImagePopup = function () {
  showImagePopup.value = true;
  console.log(showImagePopup.value);
}

const closeImagePopup = function () {
  showImagePopup.value = false;
}

const formatShortDate = function(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

defineProps({
  message: {
    type: Object, 
    required: true,
  },
})

</script>

<template>
  <div class="message-container">
    <div class="message-content">

      <img class="message-image" :src="message.imagePath"  @click="openImagePopup" /> 
      <div class="message-text">{{ message.messageText }}</div>
      <div class="published-date">{{ formatShortDate(message.datePublished) }}</div>
      <div>Posted by: {{message.author}}</div>
    </div>
    <div v-if="showImagePopup" class="image-popup">
      <img class="popup-image" :src="message.imagePath" @click="closeImagePopup" />
    </div>
  </div>
</template>

<style scoped>

.message-container {
    border: 1px solid #ccc;
    margin: 10px;
    width: 1000px;
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.message-display:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.author {
    font-weight: bold;
}

.message-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.message-image {
    width: 150px;
    height: auto;
    cursor: pointer;
}

.message-text {
    margin: 10px 0;
}

.published-date {
    color: #999;
}

.image-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-image {
    max-width: 80%;
    max-height: 80%;
    cursor: pointer;
}

</style>