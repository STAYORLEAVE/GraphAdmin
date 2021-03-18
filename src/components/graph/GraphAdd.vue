<template>
  <div class="graph-add">
    <a-form :form="form" v-bind="formLayout">
      <a-form-item label="名字">
        <a-input
          :allowClear="true"
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
          :allowClear="true"
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
          :beforeUpload="(file, fileList) => false"
          :file-list="fileList"
          @change="handleChange"
          v-decorator="[
            'file',
            {
              rules: [
                {
                  validator: fileValidator,
                },
              ],
            },
          ]"
        >
          <a-button v-if="hideFileChooseBtn">
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
  created() {
    this.fileList = [];
  },
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
      hideFileChooseBtn: true,
      fileList: [],
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

        // let datas = self.serializeFormData({
        //   ...values,
        //   file: self.fileList[0],
        // });

        // show modal loading
        self.$emit("showLoading");

        addGraph({
          data: {
          ...values,
          file: self.fileList[0],
        },
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
      this.fileList = [];
      this.form.resetFields(); // 清理表单数据（可不做）
    },
    hide(param = null) {
      this.$emit("hideModal", param);
    },
    serializeFormData(values) {
      let formData = new FormData();
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          formData.append(key, values[key]);
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
    fileValidator(rule, value, callback) {
      if (this.fileList.length === 0) {
        this.hideFileChooseBtn = true;
        callback(new Error("请选择数据集文件"));
        return;
      }

      if (!/.npz$/.test(this.fileList[0].name)) {
        this.hideFileChooseBtn = true;
        callback(new Error("请选择.npz文件"));
        return;
      }

      this.hideFileChooseBtn = false;
      callback();
    },
    handleChange(info) {
      let fileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      this.fileList = fileList;
    },
  },
};
</script>
<style scoped></style>
