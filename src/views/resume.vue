<!-- eslint-disable no-unused-vars -->
<script>
import { Field, ErrorMessage, Form } from "vee-validate";
import displayResume from "./displayResume.vue";

export default {
  name: "resume-view",
  components: { Field, ErrorMessage, Form, displayResume },
  data() {
    return {
      data: {
        fullName: "Angga Wicaksana",
        workField: "Accountant",
        about: [
          {
            form: "email",
            value: "anggaw@gmail.com",
            icon: "bi bi-envelope-fill",
          },
          {
            form: "address",
            value: "Gresik Indonesia",
            icon: "bi-geo-alt-fill",
          },
          {
            form: "phone",
            value: "089647223876",
            icon: "bi bi-telephone-fill",
          },
        ],
        link: [
          {
            form: "linkedin",
            value: "Angga Wicaksana",
            url: "https://www.linkedin.com/in/anggawicaksana/",
            icon: "bi bi-linkedin",
          },
          {
            form: "github",
            value: "Angga Wicaksana",
            url: "https://github.com/Anggawicaksana",
            icon: "bi bi-github",
          },
          {
            form: "website",
            value: "My portfolio website",
            url: "https://www.anggawicaksana.com",
            icon: "bi bi-globe",
          },
        ],
        experience: [
          {
            company: "PT Astra Indo",
            position: "Accountant",
            start: "2014-07-12",
            end: "2018-10-12",
            description: "loremsdf",
          },
        ],
        education: [
          {
            institution: "PT Astra Indo",
            field: "Accountant",
            start: "2014-07-12",
            end: "2018-10-12",
            description: "loremsdf",
          },
        ],
        skills: ["data-entry"],
        avatar: null,
      },
      newSkill: "",
      education: {
        institution: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      experience: {
        companyName: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      newDataLocal: {},
    };
  },
  created() {
    this.setReactiveData();
  },
  methods: {
    setReactiveData() {
      const newData = localStorage.getItem("form");
      if (newData) {
        this.newDataLocal = JSON.parse(newData);
      } else {
        this.newDataLocal = { ...this.data };
      }
    },
    addForm() {
      const data = {
        fullName: this.newDataLocal.fullName,
        workField: this.newDataLocal.workField,
        about: this.newDataLocal.about,
        link: this.newDataLocal.link,
        experience: this.newDataLocal.experience,
        education: this.newDataLocal.education,
        skills: this.newDataLocal.skills,
        avatar: this.newDataLocal.avatar,
      };
      this.setToLocal(data);
    },
    addItem(context) {
      const experience = {
        company: this.experience.companyName,
        position: this.experience.position,
        start: this.experience.startDate,
        end: this.experience.endDate,
        description: this.experience.description,
      };
      const education = {
        institution: this.education.institution,
        field: this.education.field,
        start: this.education.startDate,
        end: this.education.endDate,
        description: this.education.description,
      };
      const items = context === "experience" ? experience : education;
      this.newDataLocal[context] = this.newDataLocal[context].concat(items);
      const newData = JSON.parse(localStorage.getItem("form"));
      const newMod = Object.assign({}, newData);
      newMod[context] = this.newDataLocal[context];
      this.setToLocal(newMod);
      this.setReactiveData();
    },
    addSkill() {
      this.newDataLocal.skills = this.newDataLocal.skills.concat(this.newSkill);
      const newData = JSON.parse(localStorage.getItem("form"));
      const newMod = Object.assign({}, newData);
      newMod.skills = this.newDataLocal.skills;
      this.setToLocal(newMod);
      this.setReactiveData();
    },
    inputPhoto(e) {
      const file = e.target.files[0];
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => {
        this.newDataLocal.avatar = fr.result;
        const newData = JSON.parse(localStorage.getItem("form"));
        const newMod = Object.assign({}, newData);
        newMod.avatar = this.newDataLocal.avatar;
        this.setToLocal(newMod);
        this.setReactiveData();
      };
    },
    deleteItem(context, i) {
      const tempForm = JSON.parse(JSON.stringify(this.newDataLocal[context]));
      const deleteItem = tempForm?.filter((item, index) => index !== i);
      this.newDataLocal[context] = deleteItem;
      this.setToLocal(this.newDataLocal);
      this.setReactiveData();
    },
    resetData() {
      const temp = JSON.stringify(this.data);
      localStorage.setItem("form", temp);
      const newData = localStorage.getItem("form");
      this.newDataLocal = JSON.parse(newData);
    },
    setToLocal(data) {
      const temp = JSON.stringify(data);
      localStorage.setItem("form", temp);
    },
  },
};
</script>

<template>
  <div class="main-content position-relative w-100">
    <nav>
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <Form @input="addForm">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#about"
                aria-expanded="false"
                aria-controls="about"
              >
                ABOUT
              </button>
            </h2>
            <div id="about" class="accordion-collapse collapse">
              <div class="accordion-body">
                <div class="ps-2">
                  <div class="accordion" id="check">
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#contact"
                          aria-expanded="false"
                          aria-controls="contact"
                        >
                          Contact
                        </button>
                      </h2>
                      <div
                        id="contact"
                        class="accordion-collapse collapse"
                        data-bs-parent="#contact"
                      >
                        <div class="accordion-body">
                          <div class="mb-2">
                            <label for="fullname" class="form-label mb-1"
                              >Full Name</label
                            >
                            <Field
                              name="full name"
                              class="form-control"
                              aria-labelledby="fullname"
                              placeholder="Angga Wicaksana"
                              v-model="newDataLocal.fullName"
                              type="text"
                              rules="required|alpha_spaces|min:3|max:50"
                              validate-on-input
                            />
                            <ErrorMessage
                              name="full name"
                              class="error-message"
                            />
                          </div>
                          <div class="mb-2">
                            <label for="workfield" class="form-label mb-1"
                              >Work Field</label
                            >
                            <Field
                              name="work field"
                              type="text"
                              class="form-control"
                              aria-labelledby="workfield"
                              placeholder="Accountant"
                              v-model="newDataLocal.workField"
                              rules="required|alpha_spaces|min:3|max:50"
                              validate-on-input
                            />
                            <ErrorMessage
                              name="work field"
                              class="error-message"
                            />
                          </div>
                          <div
                            v-for="(item, i) in newDataLocal.about"
                            :key="i"
                            class="mb-2"
                          >
                            <label
                              :for="item.form"
                              class="form-label mb-1 text-capitalize"
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
                            <ErrorMessage
                              :name="item.form"
                              class="error-message"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#link"
                          aria-expanded="false"
                          aria-controls="link"
                        >
                          Link
                        </button>
                      </h2>
                      <div
                        id="link"
                        class="accordion-collapse collapse"
                        data-bs-parent="#link"
                      >
                        <div class="accordion-body">
                          <div
                            v-for="(item, i) in newDataLocal.link"
                            :key="i"
                            class="mb-2"
                          >
                            <label
                              :for="item.form"
                              class="form-label mb-1 text-capitalize"
                              ><i :class="item.icon"></i> {{ item.form }}</label
                            >
                            <Field
                              :name="item.form + ' text'"
                              type="text"
                              class="form-control"
                              :aria-labelledby="item.form"
                              :placeholder="item.value"
                              v-model="item.value"
                              validate-on-input
                            />
                            <ErrorMessage
                              :name="item.form + ' text'"
                              class="error-message mt-2"
                            />
                            <Field
                              :name="item.form + ' url'"
                              type="text"
                              class="form-control mt-2"
                              :aria-labelledby="item.form"
                              :placeholder="item.url"
                              v-model="item.url"
                              rules="url"
                              validate-on-input
                            />
                            <ErrorMessage
                              :name="item.form + ' url'"
                              class="error-message mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#photo"
                          aria-expanded="false"
                          aria-controls="photo"
                        >
                          Photo
                        </button>
                      </h2>
                      <div
                        id="photo"
                        class="accordion-collapse collapse"
                        data-bs-parent="#photo"
                      >
                        <div class="accordion-body">
                          <div class="mb-2">
                            <label for="photo" class="form-label mb-1"
                              >Upload Photo</label
                            >
                            <Field
                              name="photo"
                              type="file"
                              class="form-control"
                              accept="image/png"
                              aria-labelledby="photo"
                              placeholder="Accountant"
                              validate-on-input
                              @change="inputPhoto"
                            />
                            <ErrorMessage name="photo" class="error-message" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#experience"
                aria-expanded="false"
                aria-controls="experience"
              >
                EXPERIENCE
              </button>
            </h2>
            <div id="experience" class="accordion-collapse collapse">
              <div class="accordion-body ps-2">
                <Form v-slot="{ meta: formMeta }">
                  <label for="company" class="form-label mb-1"
                    >Company Name</label
                  >
                  <Field
                    name="company"
                    type="text"
                    class="form-control"
                    aria-labelledby="company"
                    placeholder="PT Example"
                    v-model="experience.companyName"
                    rules="required"
                    validate-on-input
                  />
                  <ErrorMessage name="company" class="error-message mt-2" />
                  <div class="mt-2">
                    <label for="position" class="form-label mb-1"
                      >Position</label
                    >
                    <Field
                      name="position"
                      type="text"
                      class="form-control"
                      aria-labelledby="position"
                      placeholder="Accountant"
                      v-model="experience.position"
                      rules="required"
                      validate-on-input
                    />
                    <ErrorMessage name="position" class="error-message mt-2" />
                  </div>
                  <div class="d-flex justify-content-between mt-2">
                    <div>
                      <label for="startdate" class="form-label mb-1 d-flex"
                        >Start Date</label
                      >
                      <Field
                        name="startdate"
                        type="date"
                        class="form-control date-control"
                        aria-labelledby="startdate"
                        v-model="experience.startDate"
                        rules="required"
                        validate-on-input
                      />
                      <ErrorMessage name="start date" class="error-message" />
                    </div>
                    <div>
                      <label for="enddate" class="form-label mb-1 d-flex"
                        >End Date</label
                      >
                      <Field
                        name="end date"
                        type="date"
                        class="form-control date-control"
                        aria-labelledby="enddate"
                        v-model="experience.endDate"
                        rules="required"
                        validate-on-input
                      />
                      <ErrorMessage name="end date" class="error-message" />
                    </div>
                  </div>
                  <div class="mt-2 d-flex flex-column">
                    <label for="description" class="form-label mb-1"
                      >Description</label
                    >
                    <Field
                      name="description"
                      type="text"
                      v-slot="{ field }"
                      class="form-control"
                      aria-labelledby="description"
                      placeholder="Lorem"
                      v-model="experience.description"
                      rules="required"
                      validate-on-input
                    >
                      <textarea
                        v-bind="field"
                        name="description"
                        cols="39"
                        rows="6"
                      ></textarea>
                    </Field>
                    <ErrorMessage
                      name="description"
                      class="error-message mt-2"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn my-3 w-100"
                    style="font-size: 13px !important"
                    @click.prevent="addItem('experience')"
                    :disabled="!formMeta.valid"
                  >
                    Add
                  </button>
                </Form>
                <Form>
                  <div
                    v-for="(item, i) in newDataLocal.experience"
                    :key="i"
                    class="mb-2"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="'#' + i"
                          aria-expanded="false"
                          :aria-controls="i"
                        >
                          {{ item.company }}
                        </button>
                      </h2>
                      <div
                        :id="i"
                        class="accordion-collapse collapse"
                        :data-bs-parent="'#' + i"
                      >
                        <div class="accordion-body">
                          <label :for="'company' + i" class="form-label mb-1"
                            >Company Name</label
                          >
                          <Field
                            :name="'company' + i"
                            type="text"
                            class="form-control"
                            :aria-labelledby="'company' + i"
                            :placeholder="item.company"
                            v-model="item.company"
                            rules="required"
                            validate-on-input
                          />
                          <ErrorMessage
                            :name="'company' + i"
                            class="error-message mt-2"
                          />
                          <div class="mt-2">
                            <label for="position" class="form-label mb-1"
                              >Position</label
                            >
                            <Field
                              name="position"
                              type="text"
                              class="form-control"
                              aria-labelledby="position"
                              :placeholder="item.position"
                              v-model="item.position"
                              rules="required"
                              validate-on-input
                            />
                            <ErrorMessage
                              name="position"
                              class="error-message mt-2"
                            />
                          </div>
                          <div class="d-flex justify-content-between mt-2">
                            <div>
                              <label
                                for="startdate"
                                class="form-label mb-1 d-flex"
                                >Start Date</label
                              >
                              <Field
                                name="startdate"
                                type="date"
                                class="form-control date-control"
                                aria-labelledby="startdate"
                                :placeholder="item.start"
                                v-model="item.start"
                                rules="required"
                                validate-on-input
                              />
                              <ErrorMessage
                                name="start date"
                                class="error-message"
                              />
                            </div>
                            <div>
                              <label
                                for="enddate"
                                class="form-label mb-1 d-flex"
                                >End Date</label
                              >
                              <Field
                                name="end date"
                                type="date"
                                class="form-control date-control"
                                aria-labelledby="enddate"
                                :placeholder="item.end"
                                v-model="item.end"
                                rules="required"
                                validate-on-input
                              />
                              <ErrorMessage
                                name="end date"
                                class="error-message"
                              />
                            </div>
                          </div>
                          <div class="mt-2 d-flex flex-column">
                            <label for="description" class="form-label mb-1"
                              >Description</label
                            >
                            <Field
                              name="description"
                              type="text"
                              v-slot="{ field }"
                              class="form-control"
                              aria-labelledby="description"
                              :placeholder="item.description"
                              v-model="item.description"
                              rules="required"
                              validate-on-input
                            >
                              <textarea
                                v-bind="field"
                                name="description"
                                cols="39"
                                rows="6"
                              ></textarea>
                            </Field>
                            <ErrorMessage
                              name="description"
                              class="error-message mt-2"
                            />
                          </div>
                        </div>
                        <i
                          @click.prevent="deleteItem('experience', i)"
                          class="bi bi-trash-fill"
                        ></i>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#education"
                aria-expanded="false"
                aria-controls="education"
              >
                EDUCATION
              </button>
            </h2>
            <div id="education" class="accordion-collapse collapse">
              <div class="accordion-body ps-2">
                <Form v-slot="{ meta: formMeta }">
                  <label for="company" class="form-label mb-1"
                    >Institution Name</label
                  >
                  <Field
                    name="institution"
                    type="text"
                    class="form-control"
                    aria-labelledby="institution"
                    placeholder="PT Example"
                    v-model="education.institution"
                    rules="required"
                    validate-on-input
                  />
                  <ErrorMessage name="institution" class="error-message mt-2" />
                  <div class="mt-2">
                    <label for="position" class="form-label mb-1">Field</label>
                    <Field
                      name="field"
                      type="text"
                      class="form-control"
                      aria-labelledby="field"
                      placeholder="Accountant"
                      v-model="education.field"
                      rules="required"
                      validate-on-input
                    />
                    <ErrorMessage name="field" class="error-message mt-2" />
                  </div>
                  <div class="d-flex justify-content-between mt-2">
                    <div>
                      <label for="startdate" class="form-label mb-1 d-flex"
                        >Start Date</label
                      >
                      <Field
                        name="startdate"
                        type="date"
                        class="form-control date-control"
                        aria-labelledby="startdate"
                        v-model="education.startDate"
                        rules="required"
                        validate-on-input
                      />
                      <ErrorMessage name="start date" class="error-message" />
                    </div>
                    <div>
                      <label for="enddate" class="form-label mb-1 d-flex"
                        >End Date</label
                      >
                      <Field
                        name="end date"
                        type="date"
                        class="form-control date-control"
                        aria-labelledby="enddate"
                        v-model="education.endDate"
                        rules="required"
                        validate-on-input
                      />
                      <ErrorMessage name="end date" class="error-message" />
                    </div>
                  </div>
                  <div class="mt-2 d-flex flex-column">
                    <label for="description" class="form-label mb-1"
                      >Description</label
                    >
                    <Field
                      name="description"
                      type="text"
                      v-slot="{ field }"
                      class="form-control"
                      aria-labelledby="description"
                      placeholder="Lorem"
                      v-model="education.description"
                      rules="required"
                      validate-on-input
                    >
                      <textarea
                        v-bind="field"
                        name="description"
                        cols="39"
                        rows="6"
                      ></textarea>
                    </Field>
                    <ErrorMessage
                      name="description"
                      class="error-message mt-2"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn my-3 w-100"
                    style="font-size: 13px !important"
                    @click.prevent="addItem('education')"
                    :disabled="!formMeta.valid"
                  >
                    Add
                  </button>
                </Form>
                <Form>
                  <div
                    v-for="(item, i) in newDataLocal.education"
                    :key="i"
                    class="mb-2"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="'#' + i"
                          aria-expanded="false"
                          :aria-controls="i"
                        >
                          {{ item.institution }}
                        </button>
                      </h2>
                      <div
                        :id="i"
                        class="accordion-collapse collapse"
                        :data-bs-parent="'#' + i"
                      >
                        <div class="accordion-body">
                          <label
                            :for="'institutionName' + i"
                            class="form-label mb-1"
                            >Institution Name</label
                          >
                          <Field
                            :name="'institutionName' + i"
                            type="text"
                            class="form-control"
                            :aria-labelledby="'institutionName' + i"
                            :placeholder="item.institutionName"
                            v-model="item.institutionName"
                            rules="required"
                            validate-on-input
                          />
                          <ErrorMessage
                            :name="'institutionName' + i"
                            class="error-message mt-2"
                          />
                          <div class="mt-2">
                            <label for="field" class="form-label mb-1"
                              >Field</label
                            >
                            <Field
                              name="field"
                              type="text"
                              class="form-control"
                              aria-labelledby="field"
                              :placeholder="item.field"
                              v-model="item.field"
                              rules="required"
                              validate-on-input
                            />
                            <ErrorMessage
                              name="field"
                              class="error-message mt-2"
                            />
                          </div>
                          <div class="d-flex justify-content-between mt-2">
                            <div>
                              <label
                                for="startdate"
                                class="form-label mb-1 d-flex"
                                >Start Date</label
                              >
                              <Field
                                name="startdate"
                                type="date"
                                class="form-control date-control"
                                aria-labelledby="startdate"
                                :placeholder="item.start"
                                v-model="item.start"
                                rules="required"
                                validate-on-input
                              />
                              <ErrorMessage
                                name="start date"
                                class="error-message"
                              />
                            </div>
                            <div>
                              <label
                                for="enddate"
                                class="form-label mb-1 d-flex"
                                >End Date</label
                              >
                              <Field
                                name="end date"
                                type="date"
                                class="form-control date-control"
                                aria-labelledby="enddate"
                                :placeholder="item.end"
                                v-model="item.end"
                                rules="required"
                                validate-on-input
                              />
                              <ErrorMessage
                                name="end date"
                                class="error-message"
                              />
                            </div>
                          </div>
                          <div class="mt-2 d-flex flex-column">
                            <label for="description" class="form-label mb-1"
                              >Description</label
                            >
                            <Field
                              name="description"
                              type="text"
                              v-slot="{ field }"
                              class="form-control"
                              aria-labelledby="description"
                              :placeholder="item.description"
                              v-model="item.description"
                              rules="required"
                              validate-on-input
                            >
                              <textarea
                                v-bind="field"
                                name="description"
                                cols="39"
                                rows="6"
                              ></textarea>
                            </Field>
                            <ErrorMessage
                              name="description"
                              class="error-message mt-2"
                            />
                          </div>
                        </div>
                        <i
                          @click.prevent="deleteItem('education', i)"
                          class="bi bi-trash-fill"
                        ></i>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#skill"
                aria-expanded="false"
                aria-controls="skill"
              >
                SKILL
              </button>
            </h2>
            <div id="skill" class="accordion-collapse collapse">
              <div class="accordion-body ps-2">
                <Form v-slot="{ meta: formMeta }">
                  <Field
                    name="skill"
                    type="text"
                    class="form-control mt-2"
                    placeholder="Data Entry"
                    v-model="newSkill"
                    rules="required"
                    validate-on-input
                  />
                  <ErrorMessage name="skill" class="error-message mt-2" />
                  <button
                    type="submit"
                    class="btn my-3 w-100"
                    style="font-size: 13px !important"
                    @click.prevent="addSkill"
                    :disabled="!formMeta.valid"
                  >
                    Add
                  </button>
                </Form>
                <div class="mt-1" style="display: inline-flex; flex-wrap: wrap">
                  <div
                    v-for="(item, i) in newDataLocal.skills"
                    :key="i"
                    class="skill"
                  >
                    <p class="mr-2">{{ item }}</p>
                    <i
                      @click.prevent="deleteItem('skills', i)"
                      class="bi bi-x-circle"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div>
        <div class="d-flex justify-content-start align-items-center mb-4">
          <div class="reset-data" @click.prevent="resetData">Reset Data</div>
        </div>
        <button class="btn" style="width: 100%">Download Resume</button>
      </div>
    </nav>
    <main><display-resume :newData="newDataLocal"></display-resume></main>
  </div>
</template>

<style lang="scss" scoped>
nav {
  overflow: auto;
  background: #f1f1f1;
  height: 100%;
  width: 24rem;
  padding: 2.2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: 1023px) {
    padding: 1rem;
    width: 100vw;
  }
}

main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1023px) {
    width: calc(100% - 24rem);
    position: absolute;
    margin-left: 24rem;
    top: 0;
  }
}

.accordion {
  margin: 0 5px 30px 5px;
  --bs-accordion-border-width: none;
  background-color: none;
  --bs-accordion-bg: none;
  --bs-accordion-btn-bg: none;
  --bs-accordion-active-bg: none;
}

.accordion-body {
  padding: 0;
}

.accordion-item {
  padding: 0;
  background-color: none;
  margin-bottom: 5px;
}

.accordion-button {
  padding: 10px 0;
  background-color: none;
  border-bottom: (3px solid #535353);
  margin-bottom: 5px;
  color: #535353;
}

.accordion-button:not(.collapsed) {
  font-weight: 600;
  color: #3466aa;
  padding: 10px 0;
  background-color: none;
  border-bottom: (3px solid #3466aa);
}

.reset-data {
  cursor: pointer;
}

.error-message {
  font-size: 12px;
  color: red;
}

.date-control {
  width: 8rem;
}

.skill {
  display: flex;
  align-items: center;
  background: white;
  margin: 3px;
  padding: 5px;
  border-radius: 7px;
  width: fit-content;

  i {
    margin-left: 3px;
    font-size: 10px;
    cursor: pointer;
  }
}
</style>
