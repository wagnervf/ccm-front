<template>
  <simpleTableVue
    :parametros="parametros"
    :loading="loading"
    :download-items="downloadItems"
    :color="color"
    :icone="icone"
    :title="title"
    :subtitle="subtitle"
    @reloaddados="getDataStore()"
  />
</template>

<script>
import mixinUtils from "../../mixins/mixin-utils";
import Iatf_2Services from "../../services/Iatf_2Services";
import simpleTableVue from "../../components/simpleTable.vue";

export default {
  mixins: [mixinUtils],
  components: { simpleTableVue },
  data: () => ({
    panel: [],
    loader: null,
    loading: false,
    title: "IATF + 2 RT",

    icon: "mdi-view-list",
    subtitle: "Todos os Parâmetros utilizados nas Simulações da 2 IATF + RT",
    parametros: [],
    downloadItems: [],
    icone: "mdi-cached",
    color: "teal",
  }),

  mounted() {
    setTimeout(() => {
      this.getDataStore();
    }, 500);
  },

  computed: {},

  methods: {
    async getDataStore() {
      this.parametros = [];
      this.loader = "loading";
      let result = await this.getDados_2IATF();

      if (Object.values(result).length > 0) {
        this.parametros = result;
        this.alterIcon("mdi-check", "teal");
        this.mountDataDownload();
      } else {
        this.errorMessage();
      }
    },

    async getDados_2IATF() {
      try {
        const response = await Iatf_2Services.getIatf_2Api();

        // Mixins
        return this.tratarDadosResponse(response, "SET_DATA_IATF_2");
      } catch (error) {
        console.log(error);
        return mixinUtils.methods.messageSwalToast("error", error.data.message);
      }
    },

    mountDataDownload() {
      this.downloadItems.push(this.parametros);
    },

    alterIcon(icon, cor) {
      this.icone = icon;
      this.color = cor;
      setTimeout(() => {
        this.icone = "mdi-cached";
      }, 3000);
    },

    errorMessage() {
      this.alterIcon("mdi-close", "red darken-2");

      return this.messageSwalToast(
        "error",
        "Erro ao carregar os parâmetros do Banco de Dados."
      );
    },
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 1000);

      this.loader = null;
    },
  },
};
</script>
