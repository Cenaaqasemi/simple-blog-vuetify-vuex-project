<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Add New User</h1>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" @submit.prevent="submitAddUserForm">
          <v-text-field
            v-model="user.name"
            :rules="[validationRules.required]"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.username"
            :rules="[validationRules.required]"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            :rules="[validationRules.required, validationRules.email]"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.phone"
            :rules="[validationRules.required, validationRules.phone]"
            label="Phone"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.age"
            :rules="[validationRules.required, validationRules.age]"
            label="Age"
            required
          ></v-text-field>
          <v-btn :disabled="!valid" type="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <!-- Success Snackbar -->
      <v-snackbar v-model="isProcessSuccess" :timeout="3000" color="success">
        User added successfully!
      </v-snackbar>

      <!-- Error Snackbar -->
      <v-snackbar v-model="isProcessError" :timeout="3000" color="error">
        {{ processErrorMessage }}
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const valid = ref(false);
const isProcessSuccess = ref(false);
const isProcessError = ref(false);
const processErrorMessage = ref("");

const user = ref({
  name: "",
  username: "",
  email: "",
  phone: "",
  age: "",
});

const validationRules = {
  required: (value) => !!value || "Required",
  email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
  phone: (value) => /^\d{10}$/.test(value) || "Phone must be valid.",
  age: (value) => /^\d+$/.test(value) || "Age must be a number.",
};

const submitAddUserForm = async () => {
  console.log("Form Valid:", valid.value);
  console.log("User Data:", user.value);
  switch (true) {
    case valid.value:
      try {
        await store.dispatch("addNewUser", user.value);
        isProcessSuccess.value = true;
        break;
      } catch (error) {
        processErrorMessage.value = error.message;
        isProcessError.value = true;
        break;
      } 
    default:
      processErrorMessage.value = "Form is Not Valid";
      isProcessError.value = true;
  }
};
</script>

<style></style>
