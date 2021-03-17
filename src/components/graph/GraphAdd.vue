<template>
  <div class="graph-add">
    <a-form :form="form" v-bind="formLayout">
      <a-form-item label="名字">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: '请输入名字！',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="描述">
        <a-input
          v-decorator="[
            'description',
            {
              rules: [
                {
                  required: true,
                  message: '请输入描述！',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="数据集上传">  
        <a-upload
          name="file"
          :multiple="false"
          :beforeUpload="(file, fileList) => {
            this.fileSize = fileList.length
            return false;
          }"
          :remove="(file, fileList) => {
            this.fileSize = 0
          }"
          accept=""
          v-decorator="[
            'file',
            {
              rules: [
                {
                  required: true,
                  message: '请选择数据集文件！',
                },
              ],
            },
          ]"
        >
          <a-button v-if="fileSize <= 0">
            <a-icon type="upload" /> Click to Upload 
          </a-button>
        </a-upload>   
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
// api
import { addGraph } from "../../api/graph/graph";

export default {
  name: "GraphAdd",
  props: [],
  created() {},
  data() {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
    };

    return {
      form: this.$form.createForm(this),
      fileSize: 0,
    };
  },
  methods: {
    submit() {
      let self = this;

      this.form.validateFields((err, values) => {
        if (err) {
          console.log("Received values of form: ", values);

          return;
        }

        // show modal loading
        self.$emit("showLoading");

        addGraph({
          data: values,
        })
          .then((res) => {
            if (res.statusCode === 200) {
              self.hide();
              self.success();
              return;
            }
          })
          .catch(() => {
            self.error();
          });
      });
    },
    reset() {
      this.form.resetFields(); // 清理表单数据（可不做）
    },
    hide(param = null) {
      this.$emit("hideModal", param);
    },
    serializeFormData(values) {
      let formData = new FormData();
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          let value = null;

          if (key === "file") {
            value = values[key].fileList[0];
          } else {
            value = values[key];
          }

          formData.append(key, value);
        }
      }

      return formData;
    },
    error() {
      this.$emit("hideLoading");
      this.$notification.open({
        message: "新增任务失败！",
        icon: <a-icon type="close-circle" style="color: #f00" />,
      });
    },
    success() {
      this.$emit("hideLoading");
      this.$notification.open({
        message: "新增任务成功！",
        icon: <a-icon type="check-circle" style="color: #87d068" />,
      });
    },
  },
};
</script>
<style scoped></style>
