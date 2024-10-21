<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 v-if="user">Edit User Number : ${{ route.params.id }}</h1>
        <v-col cols="12" class="text-center" v-else>
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-col>
      <v-form
        v-if="user"
        @submit.prevent="saveAndSendUpdatedUser"
        class="w-100"
      >
        <!-- Name and Username Row -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.name"
              label="Name"
              :error-messages="errors.name"
              @input="validateField('name')"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.username"
              label="Username"
              :error-messages="errors.username"
              @input="validateField('username')"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Email Row -->
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="user.email"
              label="Email"
              :error-messages="errors.email"
              @input="validateField('email')"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Phone and Age Row -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.phone"
              label="Phone"
              :error-messages="errors.phone"
              @input="validateField('phone')"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.age"
              label="Age"
              :error-messages="errors.age"
              @input="validateField('age')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn :disabled="!isFormChanged" type="submit" color="blue-lighten-1"
            >Save</v-btn
          >

          <v-btn
            type="submit"
            color="red-lighten-1"
            @click="cancelUpdateOperation"
            >Cancel</v-btn
          >
        </v-row>
      </v-form>
    </v-row>
  </v-container>
</template>

<script setup>
import router from "@/router/router";
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import * as yup from "yup";
import { useToast } from "vue-toastification";
const originalUser = reactive({});
const errors = reactive({});
const toast = useToast();
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().nullable(),
  age: yup
    .number()
    .nullable()
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
});
const route = useRoute();

const store = useStore();
const user = computed(() => store.getters["editUserModule/user"]);
console.log("Here is User", user.value);
onMounted(async () => {
  const userId = route.params.id;
  await store.dispatch("editUserModule/fetchUserById", userId);
  Object.assign(originalUser, user.value);
});
const validateField = async (field) => {
  try {
    await validationSchema.validateAt(field, user.value);
    errors[field] = "";
  } catch (err) {
    errors[field] = err.message;
  }
};

const isFormChanged = computed(() => {
  return Object.keys(user.value).some(
    (key) => user.value[key] !== originalUser[key]
  );
});

const saveAndSendUpdatedUser = async () => {
  try {
    await validationSchema.validate(user.value, { abortEarly: false });
    await store.dispatch("editUserModule/updateUser", user.value);
    toast.success("User updated successfully!");
  } catch (err) {
    err.inner.forEach((e) => {
      errors[e.path] = e.message;
    });
  }
};
const cancelUpdateOperation = () => {
  router.push("/admin/users");
};
</script>

<style></style>
