<template>
  <simpleTableVue
    :parametros="parametros"
    :loading="loading"
    :download-items="downloadItems"
    :color="color"
    :icone="icone"
    :subtitle="subtitle"
    @reloaddados="getDataStore()"
  />
</template>

<script>
import mixinUtils from "../../mixins/mixin-utils";
import MontaNaturaServices from "@/services/MontaNaturaServices";
import simpleTableVue from "../../components/simpleTable.vue";
export default {
  mixins: [mixinUtils],
  components: { simpleTableVue },
  data: () => ({
    panel: [],
    loader: null,
    loading: false,
    //title: "Lista dos Parâmentros",
    // icon: "mdi-view-list",
    subtitle: "Todos os Parâmentros utilizados nas Simulações da Monta Natural",
    parametros: [],
    downloadItems: [],
    icone: "mdi-cached",
    color: "teal",
    search: "",
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
      let result = await this.getDadosMontaNatural();

      if (Object.values(result).length > 0) {
        this.parametros = result;
        this.alterIcon("mdi-check", "teal");
        this.mountDataDownload();
      } else {
        this.errorMessage();
      }
    },

    async getDadosMontaNatural() {
      try {
        const response = await MontaNaturaServices.getMontaNaturalApi();

        return this.tratarDadosResponse(response, "SET_DATA_MONTANATURAL");
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
