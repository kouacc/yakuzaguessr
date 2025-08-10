<script setup lang="ts">
import { ref } from "vue";
import type { LeafletMouseEvent } from "leaflet";

const zoom = ref(0);

const imageWidth = 1129;
const imageHeight = 983;

const selectedPoint = ref<{ lat: number; lng: number } | null>(null);

const answer = reactive({
  currentAnswer: { lat: 83.65755395878921, lng: 517.3242187500001 },
  submitted: false,
});

const score = computed(() => {
  if (!selectedPoint.value || !answer.currentAnswer) return { score: 0, distance: 0 };

  return {
    score: calculateScore(selectedPoint.value, answer.currentAnswer),
    distance: calculateDistance(selectedPoint.value, answer.currentAnswer),
  };
});

const canBeSubmitted = computed(() => {
  return selectedPoint.value && !answer.submitted;
});

function onMapClick(e: LeafletMouseEvent) {
  if (answer.submitted) return;

  const { latlng } = e;
  selectedPoint.value = { lat: latlng.lat, lng: latlng.lng };
}

function validateAnswer() {
  if (!canBeSubmitted.value) return;
  answer.submitted = true;
}
</script>

<template>
  <div>
    <div style="height: 800px; width: 800px">
      <LMap
        ref="map"
        :zoom="zoom"
        :center="[491.5, 564.5]"
        :crs="'Simple'"
        :use-global-leaflet="false"
        :options="{ }"
        @click="onMapClick"
      >

        <LImageOverlay
          url="/maps/y0_kamuro.webp"
          
          :bounds="[
            [0, 0],
            [imageHeight, imageWidth],
          ]"
          :interactive="false"
        />
        <LCircle
          v-if="selectedPoint"
          :lat-lng="[selectedPoint.lat, selectedPoint.lng]"
          :radius="2"
          color="red"
        />
        <LCircle
          v-if="answer.currentAnswer && answer.submitted"
          :lat-lng="[answer.currentAnswer.lat, answer.currentAnswer.lng]"
          :radius="2"
          color="red"
        />
        <LPolyline
          v-if="answer.currentAnswer && answer.submitted && selectedPoint"
          :lat-lngs="[
            [selectedPoint.lat, selectedPoint.lng],
            [answer.currentAnswer.lat, answer.currentAnswer.lng],
          ]"
          :radius="100"
          dash-array="4"
          color="red"
        />
      </LMap>
    </div>
    <button :disabled="!canBeSubmitted" @click="validateAnswer()">Lock guess</button>
    <div v-if="answer.submitted">
      <p>Score: {{ score.score }}</p>
      <p>Distance: {{ score.distance }} km</p>
    </div>
  </div>
</template>
