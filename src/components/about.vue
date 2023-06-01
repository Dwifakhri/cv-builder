<!-- eslint-disable vue/no-mutating-props -->
<script>
import { Field, ErrorMessage, Form } from "vee-validate";
export default {
  name: "about-view",
  components: { Field, ErrorMessage, Form },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    addAbout() {
      const data = {
        fullName: this.data.fullName,
        workField: this.data.workField,
      };
      const temp = JSON.stringify(data);
      localStorage.setItem("form", temp);
    },
  },
};
</script>
<template>
  <Form @input="addAbout">
    <div class="mb-2">
      <label for="fullname" class="form-label mb-1">Full Name</label>
      <Field
        name="full name"
        class="form-control"
        aria-labelledby="fullname"
        placeholder="Angga Wicaksana"
        type="text"
        :value="data.fullName"
        rules="required|alpha_spaces|min:3|max:50"
        validate-on-input
      />
      <ErrorMessage name="full name" class="error-message" />
    </div>
    <div class="mb-2">
      <label for="workfield" class="form-label mb-1">Work Field</label>
      <Field
        name="work field"
        type="text"
        class="form-control"
        aria-labelledby="workfield"
        placeholder="Accountant"
        :value="data.workField"
        rules="required|alpha_spaces|min:3|max:50"
        validate-on-input
      />
      <ErrorMessage name="work field" class="error-message" />
    </div>
    <!-- <div v-for="(item, i) in data.about" :key="i" class="mb-2">
      <label :for="item.form" class="form-label mb-1 text-capitalize"
        ><i :class="item.icon"></i> {{ item.form }}
      </label>
      <Field
        :name="item.form"
        type="text"
        class="form-control"
        :aria-labelledby="item.form"
        :placeholder="item.value"
        v-model="item.value"
        :rules="
          item.form === 'email'
            ? 'required|email|max:30'
            : item.form === 'phone'
            ? 'required|numeric|min:3|max:14'
            : 'required|alpha_spaces|max:14'
        "
        validate-on-input
      />
      <ErrorMessage :name="item.form" class="error-message" />
    </div>
    <div v-for="(item, i) in data.link" :key="i" class="mb-2">
      <label :for="item.form" class="form-label mb-1 text-capitalize"
        ><i :class="item.icon"></i> {{ item.form }}</label
      >
      <Field
        :name="item.form + ' text'"
        type="text"
        class="form-control"
        :aria-labelledby="item.form"
        :placeholder="item.value"
        v-model="item.value"
        rules="required"
        validate-on-input
      />
      <ErrorMessage :name="item.form + ' text'" class="error-message mt-2" />
      <Field
        :name="item.form + ' url'"
        type="text"
        class="form-control mt-2"
        :aria-labelledby="item.form"
        :placeholder="item.url"
        v-model="item.url"
        rules="required|url"
        validate-on-input
      />
      <ErrorMessage :name="item.form + ' url'" class="error-message mt-2" />
    </div> -->
  </Form>
</template>

<style lang="scss" scoped></style>
