<template>
  <div class="graph-graphDetail">
    <a-card title="基本信息" style="width: 100%">
      <a-row type="flex" style="margin-bottom: -10px">
        <a-col :span="graphDetail.dataGraphDistribution ? 12 : 24">
          <div style="margin-bottom: 10px">
            <span class="label">描述：</span>
            <span class="text">{{ graphDetail.description }}</span>
          </div>

          <div style="margin-bottom: 10px">
            <span class="label">上传时间：</span>
            <span class="text">{{ graphDetail.uploadTime }}</span>
          </div>

          <div style="margin-bottom: 10px">
            <span class="label">分析状态：</span>
            <span class="text">
              <a-tag :color="graphDetail.status | statusColor">
                {{ graphDetail.status }}
              </a-tag>
            </span>
          </div>

          <div style="margin-bottom: 10px" v-if="graphDetail.analysisCompleteTime">
            <span class="label">分析完成时间：</span>
            <span class="text">
              {{ graphDetail.analysisCompleteTime }}
            </span>
          </div>

          <div style="margin-bottom: 10px" v-if="graphDetail.dataGraphNumber">
            <span class="label">节点数量：</span>
            <span class="text">
              {{ graphDetail.dataGraphNumber }}
            </span>
          </div>

          <div style="margin-bottom: 10px" v-if="graphDetail.dataFeatureDimension">
            <span class="label">特征维度：</span>
            <span class="text">
              {{ graphDetail.dataFeatureDimension }}
            </span>
          </div>
          <div style="margin-bottom: 10px" v-if="graphDetail.reshapedGraph">
            <span class="label">重构图：</span>
            <a :href="graphDetail.reshapedGraph" download="download">
              {{ graphDetail.reshapedGraph | getFileName }}
            </a>
          </div>
        </a-col>

        <a-col :span="12" v-if="graphDetail.dataGraphDistribution">
          <div style="margin-bottom: 10px">
            <span class="label text-center">节点数据分布：</span>
            <span class="text">
              <Theta :distribution="graphDetail.dataGraphDistribution" />
            </span>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-collapse v-model="activeKey" style="margin-top: 20px">
      <a-collapse-panel key="1" header="GCN 结果">
        <a-row type="flex">
          <a-col :span="12" v-if="graphDetail.gcnResult">
            <div class="label">准确率：</div>
            <div class="chart">
              <Polar :result="graphDetail.gcnResult" :height="400" />
            </div>
          </a-col>

          <a-col :span="12" v-if="graphDetail.gcnImageUrl">
            <div class="label">节点表示分布图：</div>
            <div class="image">
              <img
                style="height: 400px"
                :src="graphDetail.gcnImageUrl"
                alt=""
              />
            </div>
          </a-col>

          <a-col :span="12" v-if="graphDetail.gcnFileUrl">
            <span class="label font-bold">预测结果文件：</span>
            <a :href="graphDetail.gcnFileUrl">
              {{ graphDetail.gcnFileUrl | getFileName }}
            </a>
          </a-col>
        </a-row>
      </a-collapse-panel>

      <a-collapse-panel key="2" header="GraphReshapeN 结果">
        <a-row type="flex">
          <a-col :span="12" v-if="graphDetail.graphReshapeResult">
            <div class="label">准确率：</div>
            <div class="chart">
              <Polar :result="graphDetail.graphReshapeResult" :height="400" />
            </div>
          </a-col>

          <a-col :span="12" v-if="graphDetail.graphReshapeImageUrl">
            <div class="label">节点表示分布图：</div>
            <div class="image">
              <img
                style="height: 400px"
                :src="graphDetail.graphReshapeImageUrl"
                alt=""
              />
            </div>
          </a-col>

          <a-col :span="12" v-if="graphDetail.graphReshapeFileUrl">
            <span class="label font-bold">预测结果文件：</span>
            <a :href="graphDetail.graphReshapeFileUrl">
              {{ graphDetail.graphReshapeFileUrl | getFileName }}
            </a>
          </a-col>
        </a-row>
      </a-collapse-panel>

      <a-collapse-panel key="3" header="GSNN 结果">
        <a-row type="flex">
          <a-col :span="12" v-if="graphDetail.gsnnResult">
            <div class="label">准确率：</div>
            <div class="chart">
              <Polar :result="graphDetail.gsnnResult" :height="400" />
            </div>
          </a-col>

          <a-col :span="12" v-if="graphDetail.gsnnImageUrl">
            <div class="label">节点表示分布图：</div>
            <div class="image">
              <img
                style="height: 400px"
                :src="graphDetail.gsnnImageUrl"
                alt=""
              />
            </div>
          </a-col>

          <a-col :span="12" v-if="graphDetail.gsnnFileUrl">
            <span class="label font-bold">预测结果文件：</span>
            <a :href="graphDetail.gsnnFileUrl">
              {{ graphDetail.gsnnFileUrl | getFileName }}
            </a>
          </a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
// compoments
import Theta from "../chart/Theta.vue";
import Polar from "../chart/Polar.vue";

const statusColorCode = {
  未分析: "gray",
  分析中: "#108ee9",
  分析完成: "#87d068",
  分析失败: "red",
};

export default {
  name: "GraphDetail",
  props: ["graphDetail"],
  components: {
    Polar,
    Theta,
  },
  data() {
    return {
      activeKey: null,
    };
  },
  created() {},
  methods: {},
  filters: {
    getFileName(url) {
      if (!url) return "";
      var urlArr = url.split("/");

      return urlArr[urlArr.length - 1];
    },
    statusColor(status) {
      return statusColorCode[status];
    },
  },
};
</script>
<style scoped></style>
