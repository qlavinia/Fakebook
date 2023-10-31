<script setup>
import {ref} from 'vue';
import { useAuthStore } from '../stores/AuthStore';
import { messageService } from '@/services/MessageService';
import { useRouter } from 'vue-router';


const router = useRouter();

const authStore = useAuthStore();
const userId = authStore.userId;

let selectedImageFile = ref(null);
const messageText = ref(null);

const onUpload = function () {
    const formData = new FormData();
    formData.append("messageText", messageText.value);

    formData.append('fileInput', selectedImageFile);
    // Convert FormData to a regular object for logging
    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
        formDataObject[key] = value;
    }

    // Log the object to the console
    console.log(formDataObject);
    console.log(formData.entries);

    try {
        messageService.createMessage(userId, formData)
            .then(res => {
                console.log(res);
                router.push('/posts');
    
            })
    } catch (error) {
        console.log(error)
    }
}

const onImageSelected = function (event) {
    selectedImageFile = event.target.files[0];
}

</script>

<template>
     <div class="form-container">
        <form @submit.prevent="onUpload">
            <div class="form-group">
                <label for="messageText">Text:</label>
                <textarea id="messageText" v-model="messageText" class="large-textarea"></textarea>
            </div>
            <div class="form-group">
                <label for="imageFile">Image:</label>
                <input type="file" accept=".png, .jpg" id="imageFile" @change="onImageSelected">
            </div>
            <div class="form-group">
                <button type="submit" class="submit-button">Save</button>
            </div>
        </form>
    </div>
</template>

<style scoped>

.form-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.form-group {
    margin-bottom: 20px;
}

.large-textarea {
    width: 100%;
    min-height: 150px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.submit-button {
    background-color: #007BFF;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #0056b3;
}

</style>