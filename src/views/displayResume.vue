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
  computed: {
    noLink() {
      const x = this.newData?.link?.filter((item) => item.value === "");
      if (x.length > 2) {
        return true;
      }
      return false;
    },
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
      <div class="w-75 py-2">
        <h3>DWI FAKHRI CHUSAINI</h3>
        <h5>FRONTEND ENGINEER</h5>
        <div class="d-flex">
          <div class="d-flex align-items-center me-3">
            <i :class="newData?.about[1]?.icon + ' me-1'"></i>
            <p>{{ newData?.about[1]?.value }}</p>
          </div>
          <div class="d-flex align-items-center me-3">
            <i class="bi bi-whatsapp me-1"></i>
            <p>{{ newData?.about[2]?.value }}</p>
          </div>
          <div v-if="noLink" class="d-flex align-items-center">
            <i :class="newData?.about[0]?.icon + ' me-1'"></i>
            <p>{{ newData?.about[0]?.value }}</p>
          </div>
        </div>
      </div>
    </header>
    <div class="px-3 py-2">
      <div
        :class="
          !noLink
            ? 'd-flex justify-content-around'
            : 'd-flex justify-content-between'
        "
      >
        <div
          v-if="!noLink"
          class="mb-2 d-flex justify-content-between align-items-center"
        >
          <i :class="newData?.about[0]?.icon"></i>
          <p class="ms-1">{{ newData?.about[0]?.value }}</p>
        </div>
        <template v-for="(item, i) in newData?.link" :key="i">
          <div
            v-if="item.value !== ''"
            class="mb-2 d-flex justify-content-center align-items-center"
          >
            <i :class="item.icon"></i
            ><a :href="item.url" target="_blank" class="ms-1">{{
              item.value
            }}</a>
          </div>
        </template>
      </div>
    </div>
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

i,
a {
  font-size: 12px;
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.img-profile {
  width: 4em;
  height: 4em;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: -5px 0px 0px -1px black;
}
</style>
