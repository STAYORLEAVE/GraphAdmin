<template>
  <div class="graph-list">
    <div class="table-operator">
      <a-button-group>
        <a-button type="primary" icon="plus" @click="handleAdd">添加</a-button>
        <a-button
          type="primary"
          icon="reload"
          @click="handleRefresh"
          :loading="tableConfirmLoading"
          >刷新</a-button
        >
      </a-button-group>
    </div>

    <a-spin :spinning="tableConfirmLoading">
      <a-table :data-source="graphLists">
        <a-table-column key="name" title="名称" data-index="name">
          <template slot-scope="name, data">
            <a v-on:click="openDetail(data.id)">{{ name }}</a>
          </template>
        </a-table-column>
        <a-table-column
          key="description"
          title="描述"
          data-index="description"
        />
        <a-table-column
          key="uploadTime"
          title="上传时间"
          data-index="uploadTime"
        />
        <a-table-column key="status" title="分析状态" data-index="status">
          <template slot-scope="status">
            <a-tag :color="status | statusColor">
              {{ status }}
            </a-tag>
          </template>
        </a-table-column>
        <a-table-column
          key="analysisCompleteTime"
          title="分析完成时间"
          data-index="analysisCompleteTime"
        />
        <a-table-column key="action" title="操作">
          <template slot-scope="data">
            <span style="display:none">{{ data.id }}</span>
            <span>              
              <a-button v-on:click="handleDelete(data.id)" icon="delete" type="danger" size="small" ghost>
                删除
              </a-button>
            </span>
          </template>
        </a-table-column>
      </a-table>
    </a-spin>

    <a-modal
      ref="addModal"
      title="添加新任务"
      :width="640"
      :visible="addModalVisible"
      :confirmLoading="addModalConfirmLoading"
      @ok="addModalOk"
      @cancel="addModalCancel"
    >
      <a-spin :spinning="addModalConfirmLoading">
        <GraphAdd
          ref="graphAdd"
          v-on:hideModal="hideAddModal"
          v-on:showLoading="showAddLoading"
          v-on:hideLoading="hideAddLoading"
        />
      </a-spin>
    </a-modal>

    <a-modal
      ref="detailModal"
      :title="graphDetail.name"
      width="80%"
      :centered="true"
      :visible="detailModalVisible"
      :confirmLoading="detailModalConfirmLoading"
      @ok="detailModalOk"
      @cancel="detailModalCancel"
    >
      <a-spin :spinning="detailModalConfirmLoading">
        <GraphDetail
          v-if="showDetailContent"
          ref="graphDetail"
          :graphDetail="graphDetail"
        />
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
// api
import {
  getGraphList,
  deleteGraph,
  getGraphDetail,
} from "../../api/graph/graph";

// images
import gsnn from "../../assets/gsnn.png";
import Origin from "../../assets/Origin.png";
import Reshaped from "../../assets/Reshaped.png";

// compoments
import GraphAdd from "../../components/graph/GraphAdd.vue";
import GraphDetail from "../../components/graph/GraphDetail.vue";

// mock data

const Mocks = {
  GraphList: [
    {
      id: "0000000", //string
      name: "Cora", //string
      description:
        "包含七个不同领域论文，通过论文引用构成图，用于论文自动化归类", //string
      uploadTime: "2021-03-16 19:58:11",
      sourceFileUrl: "data/0000000/data.npz", //string
      status: "分析完成", //string
      analysisCompleteTime: "2021-03-16 20:49:36", //string|(YYYY-MM-DD hh:mm:ss) || null
      dataGraphDistribution: "298,418,818,426,217,180,351", //string  节点数据分布
      dataGraphNumber: "2485", //string  节点数量
      dataFeatureDimension: "1433", //string  特征纬度
      reshapedGraph: "data/0000000/reshapedGraph.npy", // string  重构图

      gcnResult: "0.6831", //string  准确率
      gcnImageUrl: Origin, //string  节点表示分布图
      gcnFileUrl: "gcn_pred.npy", //string  预测结果文件

      graphReshapeResult: "0.8011", //string
      graphReshapeImageUrl: Reshaped, //string
      graphReshapeFileUrl: "data/0000000/graphreshape_pred.npy", //string

      gsnnResult: "0.8176", //string
      gsnnImageUrl: gsnn, //string
      gsnnFileUrl: "data/0000000/gsnn_pred.npy", // url string
    },
    {
      id: "2",
      key: "2",
      name: "Tianmao",
      description: "电商场景user-item行为构图，用于推荐系统",
      uploadTime: "2021-03-13 21:01:25",
      status: "分析失败",
      analysisCompleteTime: "2021-03-13 21:20:25",
    },
    {
      id: "3",
      key: "3",
      name: "Facebook",
      description: "Facebook社交网络数据，用于社交网络欺诈检测任务",
      uploadTime: "2021-03-14 21:05:25",
      status: "分析中",
      analysisCompleteTime: null,
    },
    {
      id: "4",
      key: "4",
      name: "Banker",
      description: "信贷评估数据，通过交易行为构图，用于检测用户检测",
      uploadTime: "2021-03-14 21:10:25",
      status: "未分析",
      analysisCompleteTime: null,
    },
    {
      id: "5",
      key: "5",
      name: "Android_apk",
      description: "应用程序行为调用API构图，用于恶意软件检测",
      uploadTime: "2021-03-14 21:20:25",
      status: "未分析",
      analysisCompleteTime: null,
    },
  ],
};

const statusColorCode = {
  未分析: "gray",
  分析中: "#108ee9",
  分析完成: "#87d068",
  分析失败: "#ff4d4f",
};

export default {
  name: "GraphList",
  components: {
    GraphAdd,
    GraphDetail,
  },
  data() {
    return {
      /**
       * graph
       */
      tableConfirmLoading: false,
      graphLists: [],
      graphDetail: {},
      color: {
        未分析: "gray",
        分析中: "#108ee9",
        分析完成: "#87d068",
        分析失败: "red",
      },
      /**
       * add modal
       */
      addModalVisible: false,
      addModalConfirmLoading: false,
      /**
       * detail modal
       */
      detailModalVisible: false,
      detailModalConfirmLoading: false,
      showDetailContent: false,
    };
  },
  created() {
    this.getGraphList();
  },
  methods: {
    openDetail(id) {
      let self = this;
      self.detailModalVisible = true;
      self.detailModalConfirmLoading = true;

      getGraphDetail({
        data: { id: id },
      })
        .then((res) => {
          self.graphDetail = res.data;
          self.getGraphDetailSuccess();
        })
        .catch(() => {
          self.graphDetail = Mocks.GraphList.filter(
            (item) => item.id === id
          )[0];
          self.getGraphDetailError();
        });
    },
    handleAdd() {
      this.model = null;
      this.addModalVisible = true;
    },
    handleDelete(id) {
      let self = this;
      self.tableConfirmLoading = true;

      deleteGraph({
        data: { id },
      })
        .then((res) => {
          this.graphLists = res.data;
          self.deleteGraphSuccess();
        })
        .catch(() => {
          self.deleteGraphError();
        });
    },
    handleRefresh() {
      this.getGraphList();
    },
    getGraphList() {
      let self = this;

      this.tableConfirmLoading = true;

      getGraphList({
        data: {},
      })
        .then((res) => {
          self.graphLists = res.data;
          self.getGraphListSuccess();
        })
        .catch(() => {
          self.graphLists = Mocks.GraphList;
          self.getGraphListError();
        });
    },
    detailModalOk() {
      this.detailModalVisible = false;
      this.showDetailContent = false;
    },
    detailModalCancel() {
      this.detailModalVisible = false;
      this.showDetailContent = false;
    },
    addModalOk() {
      this.$refs.graphAdd.submit();
    },
    addModalCancel() {
      this.addModalVisible = false;
      this.$refs.graphAdd.reset();
    },
    hideAddModal() {
      this.addModalVisible = false;
    },
    showAddLoading() {
      this.addModalConfirmLoading = true;
    },
    hideAddLoading() {
      this.addModalConfirmLoading = false;
    },
    getGraphListError() {
      this.tableConfirmLoading = false;
      this.$notification.open({
        message: "获取任务列表失败！",
        icon: <a-icon type="close-circle" style="color: #f00" />,
      });
    },
    getGraphListSuccess() {
      this.tableConfirmLoading = false;
      this.$notification.open({
        message: "获取任务列表成功！",
        icon: <a-icon type="check-circle" style="color: #87d068" />,
      });
    },
    getGraphDetailError() {
      this.detailModalConfirmLoading = false;
      this.showDetailContent = true;
      this.$notification.open({
        message: "获取任务详情失败！",
        icon: <a-icon type="close-circle" style="color: #f00" />,
      });
    },
    getGraphDetailSuccess() {
      this.detailModalConfirmLoading = false;
      this.showDetailContent = true;
      this.$notification.open({
        message: "获取任务详情成功！",
        icon: <a-icon type="check-circle" style="color: #87d068" />,
      });
    },
    deleteGraphSuccess() {
      this.tableConfirmLoading = false;
      this.$notification.open({
        message: "删除任务成功！",
        icon: <a-icon type="check-circle" style="color: #87d068" />,
      });
    },
    deleteGraphError() {
      this.tableConfirmLoading = false;
      this.$notification.open({
        message: "删除任务失败！",
        icon: <a-icon type="close-circle" style="color: #f00" />,
      });
    },
  },
  filters: {
    statusColor(status) {
      return statusColorCode[status];
    },
  },
};
</script>

<style scoped>
.table-operator {
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
}
.ant-table-header-column {
  text-transform: capitalize;
}
</style>

<style>
.ant-modal-wrap .ant-modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1890ff;
}
.ant-modal-wrap .ant-modal-body {
  max-height: 80vh;
  min-height: 300px;
  overflow: auto;
}
.label {
  color: #333;
  font-weight: bold;
}
.text {
  color: #666;
}
.text-center {
  text-align: center;
}
.block {
  display: block;
}
</style>
