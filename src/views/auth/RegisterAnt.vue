<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
            <a-alert
                v-if="message !== ''"
                :message="message"
                type="warning"
                class="mt-3 mx-2 me-2"
                closable
                @close="onClose"
            />
            </div>
        </div>
    </div>
    <a-row class="mt-3">
        <a-col :span="6"></a-col>
        <a-col :span="12">
            <a-card :title="actionName" class="text-center">
                <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                label="Email"
                name="email"
                :rules="[{ required: true, message: 'Please input your email!' }]"
                >
                <a-input v-model:value="formState.email" />
                </a-form-item>

                <a-form-item
                label="Password"
                name="password"
                :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                <a-input-password v-model:value="formState.password" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">Submit</a-button>
                    <a-button type="text" html-type="button" @click="toggleAction">{{toggleText}}</a-button>
                </a-form-item>
                </a-form>
            </a-card>
        </a-col>
        <a-col :span="6"></a-col>
    </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router"
interface FormState {
  email: string;
  password: string;
}
export default defineComponent({
  setup() {
      const store = useStore();
      const router = useRouter();
      const actionName = ref('Register');
      const toggleText =  ref("Switch to Login");
      const message =ref('');
    const formState = reactive<FormState>({
      email: '',
      password: '',
    });
    const onFinish = (values: any) => {
        if (
        values.email === "" ||
        !values.email.includes("@") ||
        !values.email.includes(".") ||
        values.password.length < 6
      ) {
        alert("form input invalid");
        return;
      }
      if (actionName.value === "Register") {
        store
          .dispatch("authRoute/saveUser", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            console.log(res);
            formState.email = ''
            formState.password = ''
            router.push({ name: "app-list" });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        store
          .dispatch("authRoute/login", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            console.log(res);
            formState.email = ''
            formState.password = ''
            router.push({ name: "app-list" });
          })
          .catch((error) => {
            console.log(error);
            message.value = error.error.message.toLowerCase().replaceAll("_", " ");
          });
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    const onClose = (e: MouseEvent) => {
        console.log(e, 'I was closed.');
        };
    function toggleAction() {
      if (actionName.value === "Register") {
        actionName.value = "Login";
        toggleText.value = "Switch to Register";
      } else {
        actionName.value = "Register";
        toggleText.value = "Swtich to Login";
      }
    }
    return {
      formState,
      onFinish,
      onFinishFailed,
      actionName,
      toggleText,
      toggleAction,
      onClose,
      message
    };
  },
});
</script>

