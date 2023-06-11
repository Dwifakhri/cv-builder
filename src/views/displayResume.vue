<script>
export default {
  name: "displayResume",
  props: {
    newData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      color: "#F0F0F0",
    };
  },
};
</script>

<template>
  <div class="display">
    <header :style="{ background: color }">
      <div class="w-25 text-center align-self-center">
        <img
          class="img-profile"
          :src="
            newData?.avatar ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
          "
          alt=""
        />
      </div>
      <div class="w-75">
        <h3>DWI FAKHRI CHUSAINI</h3>
        <h5>FRONTEND ENGINEER</h5>
        <div class="d-flex">
          <div class="d-flex align-items-center me-3">
            <i class="bi-geo-alt-fill me-1"></i>
            <p>Gresik Indonesia</p>
          </div>
          <div class="d-flex align-items-center">
            <i class="bi bi-whatsapp me-1"></i>
            <p>089531416428</p>
          </div>
        </div>
      </div>
    </header>
    <input v-model="color" type="color" name="color" id="color" />
  </div>
</template>

<style lang="scss" scoped>
.display {
  width: 40rem;
}

header {
  display: flex;
}

p {
  font-size: 12px;
}

i {
  font-size: 12px;
}

.img-profile {
  width: 4em;
  height: 4em;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: -5px 0px 0px -1px black;
}
</style>
