<script setup lang="ts">
import { ref } from 'vue'

const file = ref<File | null>(null)

function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        file.value = target.files[0] || null
    }
}

async function uploadFile() {
    if (!file.value) return

    const formData = new FormData()
    formData.append('file', file.value)
    console.log(formData.get('file'))

    await $fetch('/api/images/upload', {
        method: 'POST',
        body: formData
    })
}
</script>

<template>
    <form @submit.prevent="uploadFile">
        <input type="file" @change="onFileChange" />
        <button type="submit">Upload</button>
    </form>
</template>