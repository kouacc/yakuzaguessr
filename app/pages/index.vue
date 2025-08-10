<script setup lang="ts">
import { ref } from "vue";
import type { LeafletMouseEvent } from "leaflet";

const zoom = ref(10);

const answer = reactive({
  currentAnswer: { lat: 83.65755395878921, lng: 517.3242187500001 },
  selectedPoint: {} as { lat: number; lng: number },
  submitted: false
});

const canBeSubmitted = computed(() => {
  return answer.selectedPoint && !answer.submitted;
});

function onMapClick(e: LeafletMouseEvent) {
  if (answer.submitted) return;

  const { latlng } = e;
  answer.selectedPoint = { lat: latlng.lat, lng: latlng.lng };
}

function validateAnswer() {
  if (!canBeSubmitted.value) return;

  answer.submitted = true;
}
</script>

<template>
  <div style="height: 1024px; width: 1024px">
    <LMap
      ref="map"
      :zoom="zoom"
      :min-zoom="10"
      :max-zoom="15"
      :center="[512, 512]"
      :use-global-leaflet="false"
      @click="onMapClick"
    >
      <LTileLayer
        url="/map0.jpeg"
        layer-type="base"
        :tile-size="1024"
        :no-wrap="true"
        :bounds="[[0,0],[1024,1024]]"
      />
      <LCircle
        v-if="answer.selectedPoint"
        :lat-lng="[answer.selectedPoint.lat, answer.selectedPoint.lng]"
        :radius="100"
        color="red"
      />
      <LCircle
        v-if="answer.currentAnswer && answer.submitted"
        :lat-lng="[answer.currentAnswer.lat, answer.currentAnswer.lng]"
        :radius="100"
        color="red"
      />
      <LPolyline
        v-if="answer.currentAnswer && answer.submitted && answer.selectedPoint"
        :lat-lngs="[
          [answer.selectedPoint.lat, answer.selectedPoint.lng],
          [answer.currentAnswer.lat, answer.currentAnswer.lng]
        ]"
        :radius="100"
        color="red"
      />
    </LMap>
  </div>
</template>
