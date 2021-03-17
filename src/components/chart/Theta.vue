<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis />
      <v-legend dataKey="item" />
      <v-pie
        position="percent"
        color="item"
        :vStyle="pieStyle"
        :label="labelConfig"
      />
      <v-coord type="theta" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require("@antv/data-set");

export default {
  name: "Theta",
  props: ["distribution"],
  mounted() {
    this.dv = new DataSet.View().source(this.sourceData);
    this.dv.transform(this.transform);
    this.data = this.dv.rows;
  },
  data() {
    return {
      data: null,
      scale: [
        {
          dataKey: "percent",
          min: 0,
          formatter: ".0%",
        },
      ],
      transform: {
        type: "percent",
        field: "count",
        dimension: "item",
        as: "percent",
      },
      height: 350,
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1,
      },
      labelConfig: ['percent', {
        offset: -40,
        textStyle: {
          rotate: 0,
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }
      }],
    };
  },
  computed: {
    sourceData: function() {
      return this.distribution.split(",").map((item, index) => {
        return {
          item: `类别 ${index}`,
          count: parseInt(item),
        };
      });
    },
  },
};
</script>
