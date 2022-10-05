<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
    class="mt-3"
  >
    <a-form-item
      v-bind="formItemLayout"
      :label="'name'"
      name="name"
      :rules="{
        required: true,
        message: 'Name can not be null',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="dynamicValidateForm.name"
        placeholder="please input Name"
        style="width: 60%; margin-right: 8px"
      />
    </a-form-item>
    <template
      v-for="(quiz, index) in dynamicValidateForm.quizzes"
      :key="quiz.key"
    >
      <a-form-item
        v-bind="index === 0 ? formItemLayout : {}"
        :label="index === 0 ? 'Questions' : ''"
        :name="['quizzes', index, 'question']"
        :rules="{
          required: true,
          message: 'question can not be null',
          trigger: 'change',
        }"
      >
        <a-input
          v-model:value="quiz.question"
          placeholder="please input question"
          style="width: 60%; margin-right: 8px"
        />
      </a-form-item>
      <a-form-item
        v-for="(option, option_index) in quiz.options"
        :key="option.key"
        v-bind="option_index === 0 ? formItemLayout : {}"
        :label="option_index === 0 ? 'options' : ''"
        :name="['quizzes', index, 'options', option_index, 'value']"
        :rules="{
          required: true,
          message: 'option can not be null',
          trigger: 'change',
        }"
      >
        <a-input
          v-model:value="option.value"
          placeholder="please input option"
          class="me-3"
          style="width: 60%; margin-right: 8px"
        />
        <!--<a-radio
         v-model:value="option.isCorrect"
         :checked="option.isCorrect"
         placeholder="Correct Answer"
         style="width: 20%;"
        />-->
        <a-checkbox v-model:checked="option.isCorrect">Radio</a-checkbox>
        <MinusCircleOutlined
          v-if="quiz.options.length > 1"
          class="dynamic-delete-button"
          :disabled="dynamicValidateForm.quizzes[index].options.length === 1"
          @click="removeOption(index, option)"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="addOption(index)">
          <PlusOutlined />
          Add field
        </a-button>
      </a-form-item>
    </template>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" html-type="button" @click="addQuestion"
      class="me-2"
        >Add Question</a-button
      >
      <a-button type="primary" html-type="submit" @click="submitForm"
        >{{btnText}}</a-button
      >
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

interface Option {
  value: string;
  key: number;
  isCorrect: boolean;
}
interface Quiz {
  key: number;
  question: string;
  options: Option[];
}

export default defineComponent({
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
  setup() {
      const store = useStore();
      const router = useRouter();
    const formRef = ref<FormInstance>();
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const mode = ref('create');
    
    const dynamicValidateForm = reactive<{ name: string; quizzes: Quiz[] }>({
      name: "",
      quizzes: [
        {
          key: Date.now(),
          question: "",
          options: [
            {
              key: Date.now(),
              value: "",
              isCorrect: false
            },
          ],
        },
      ],
    });
    const btnText = ref('Submit');
    const userId = ref('')
    function onload() {
      let db_key_id = router.currentRoute.value.params.id;
      if(db_key_id){
        console.log(db_key_id);
        mode.value = 'edit';
        store.dispatch("quizRoute/getQuiz", db_key_id).then(res => {
          dynamicValidateForm.name = res.name;
          dynamicValidateForm.quizzes = res.quizzes;
          btnText.value = "Update"
          userId.value = res.userId;
        })
      }
      
    }
    onload();
    const addQuestion = () => {
      formRef.value.validate().then(() => {
        dynamicValidateForm.quizzes.push({
          key: Date.now(),
          question: "",
          options: [
            {
              key: Date.now(),
              value: "",
              isCorrect: false
            },
          ],
        });
      });
    };
    const submitForm = () => {
      formRef.value
        .validate()
        .then(() => {
          if(mode.value === 'create'){
            store.dispatch('quizRoute/saveQuizzes', {name: dynamicValidateForm.name, quizzes: dynamicValidateForm.quizzes}).then(res => {
                //formRef.value.resetFields();
                router.push({name: 'quiz-list'});
            }).catch(error => {
              console.log(error);
            })
          }
          else{
            store.dispatch('quizRoute/updateQuiz', {db_key_id: router.currentRoute.value.params.id, name: dynamicValidateForm.name, quizzes: dynamicValidateForm.quizzes, userId: userId.value}).then(res => {
                router.push({name:'quiz-list'})
            }).catch(error => {
              console.log(error);
            })
          }
            
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const removeOption = (quizIndex, item: Option) => {
      let index = dynamicValidateForm.quizzes[quizIndex].options.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.quizzes[quizIndex].options.splice(index, 1);
      }
    };
    const addOption = (quizIndex) => {
      console.log(quizIndex, dynamicValidateForm.quizzes[quizIndex].options);
      //return;
      dynamicValidateForm.quizzes[quizIndex].options.push({
        value: "",
        key: Date.now(),
        isCorrect: false
      });
    };
    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      submitForm,
      resetForm,
      removeOption,
      addOption,
      addQuestion,
      btnText
    };
  },
});
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
