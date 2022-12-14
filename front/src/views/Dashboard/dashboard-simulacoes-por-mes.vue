<template>
  <v-container fluid>
    <v-row class="my-2">
      <v-col
        xl="8"
        lg="8"
        md="12"
        sm="12"
        xs="12"
        class="ma-0 px-1"
      >
        <v-card class="mx-0 mb-1">
          <v-expansion-panels
            focusable
            v-model="panel"
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Simulações por Mês</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card-text class="pa-6">
                  <v-row>
                    <v-col v-if="visivel">
                      <v-progress-linear
                        indeterminate
                        color="cyan"
                        :query="true"
                      />
                    </v-col>
                    <v-col v-else>
                      <ApexChart
                        type="bar"
                        height="350"
                        :options="barOptions"
                        :series="barOptions.series"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>

      <v-col
        xl="4"
        lg="4"
        md="12"
        sm="12"
        xs="12"
        class="ma-0 px-1"
      >
        <v-card class="mx-0 mb-1">
          <v-expansion-panels
            focusable
            v-model="panel2"
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Tipos de Simulações</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card-text class="pa-6">
                  <v-row>
                    <v-col v-if="visivel">
                      <v-progress-linear
                        indeterminate
                        color="cyan"
                        :query="true"
                      />
                    </v-col>
                    <v-col v-else>
                      <ApexChart
                        type="donut"
                        height="400"
                        :options="donutOptions"
                        :series="donutOptions.series"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApexChart from "vue-apexcharts";
import typesSimulations from "../../assets/json/typesSimulations.json";
import mixinUtils from "../../mixins/mixin-utils";
export default {
  name: "DashboardChartColumn",
  components: {
    ApexChart,
  },
  mixins: [mixinUtils],
  data() {
    return {
      typesSimulations: typesSimulations,
      visivel: false,
      types: {
        montaNatural: [],
        iatf: [],
        iatf_2: [],
        iatf_3: [],
      },
      panel: 0,
      panel2: 0,

      barOptions: {
        series: [
          {
            name: "Monta Natural",
            data: [],
          },
          {
            name: "IATF+RT",
            data: [],
          },
          {
            name: "IATF+2RT",
            data: [],
          },
          {
            name: "IATF+3RT",
            data: [],
          },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "65%",
            endingShape: "rounded",
          },
        },

        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez",
          ],
          lines: {
            show: true,
          },
        },
        yaxis: {
          title: {
            text: "Quantidade",
          },
        },

        fill: {
          opacity: 2,
        },
        tooltip: {
          style: {
            fontSize: "14px",
          },
          y: {
            formatter(val) {
              return val;
            },
          },
        },

        responsive: [
          {
            breakpoint: 1000,
            options: {
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              legend: {
                position: "bottom",
              },
            },
            dataLabels: {
              enabled: true,
              textAnchor: "start",
              style: {
                colors: ["#000"],
              },
              formatter: function (val) {
                return val.toFixed(1);
              },
              offsetX: 10,
              dropShadow: {
                enabled: false,
              },
            },
          },
        ],
      },

      donutOptions: {
        series: [],
        labels: [],          

        chart: {
          height: 400,
          type: "donut",
        },

        dataLabels: {
          enabled: true,
          style: {
            fontSize: "20px",
          },
          offsetY: -4,
        },

        legend: {
          position: "bottom",
        },

        stroke: {
          colors: ["#fff"],
        },
        fill: {
          opacity: 0.8,
        },
        yaxis: {
          show: false,
        },

        responsive: [
          {
            breakpoint: 1000,
            options: {
              chart: {
                width: 200,
              },

              legend: {
                position: "bottom",
              },
            },
            dataLabels: {
              enabled: true,
              textAnchor: "start",
              style: {
                colors: ["#000"],
              },
              formatter: function (val) {
                return val.toFixed(1);
              },
              offsetX: 10,
              dropShadow: {
                enabled: false,
              },
            },
          },
        ],
      },
    };
  },

  mounted() {
    setTimeout(() => {
      this.visivel = false;
    }, 1500);
  },
  computed: {
    simulacoesFiltradasPeriodo() {
      return this.$store.getters.getSimulacoesFilteredPeriodo;
    },
  },
  methods: {
    getData(value) {
      this.reset();
      Object.values(value).forEach((value) => {
        this.switchTypes(value);
      });

      this.reload();
      this.separaTipos();
      this.separaRadialBar(this.types);
    },

    switchTypes(value) {
      switch (value.type) {
        case this.typesSimulations.monta:
          this.types.montaNatural.push(value);
          break;

        case this.typesSimulations.iatf:
          this.types.iatf.push(value);
          break;

        case this.typesSimulations.iatf_2:
          this.types.iatf_2.push(value);
          break;

        case this.typesSimulations.iatf_3:
          this.types.iatf_3.push(value);
          break;
      }

      this.$store.commit("SET_TIPOS_SIMULACOES_SEPARADAS", this.types);
    },

    separaTipos() {
      this.barOptions.series[0].data = this.separaSimulacaoPorMes(
        this.types.montaNatural
      );
      this.barOptions.series[1].data = this.separaSimulacaoPorMes(
        this.types.iatf
      );
      this.barOptions.series[2].data = this.separaSimulacaoPorMes(
        this.types.iatf_2
      );
      this.barOptions.series[3].data = this.separaSimulacaoPorMes(
        this.types.iatf_3
      );
    },

    separaRadialBar(value) {
      let obj = {};
      Object.keys(value).map((val) => {
        if (val == "montaNatural")
          Object.assign(obj, { "Monta Natural": value.montaNatural.length });
        if (val == "iatf") Object.assign(obj, { IATF: value.iatf.length });
        if (val == "iatf_2")
          Object.assign(obj, { "2 IATF": value.iatf_2.length });
        if (val == "iatf_3")
          Object.assign(obj, { "3 IATF": value.iatf_3.length });
      });

      this.donutOptions.labels = Object.keys(obj);
      this.donutOptions.series = Object.values(obj);
    },

    reset() {
      this.types.montaNatural = [];
      this.types.iatf = [];
      this.types.iatf_2 = [];
      this.types.iatf_3 = [];
    },

    reload() {
      this.visivel = true;
      setTimeout(() => {
        this.visivel = false;
      }, 500);
    },
  },

  watch: {
    simulacoesFiltradasPeriodo(value) {
      this.getData(value);
    },
  },
};
</script>
