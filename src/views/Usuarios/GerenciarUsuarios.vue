/* eslint-disable vue/no-v-text-v-html-on-component */
<template>
  <v-container>
    <titleToolbarListTealVue
      :title="title"
      :subtitle="subtitle"
    />
    <br>
    <v-card
      class="mx-auto"
      tile
    >
      <v-row
        class="px-4 text-left"
        tag="v-card-text"
      >
        <v-col
          sm="12"
          md="5"
          class="text-left"
        >
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar Usuário"
                single-line
                hide-details
              />
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="usuarios"
              :search="search"
              :loading="!listaCarregada"
              loading-text="Carregando... Usuários"
              v-model="selecionado"
              :single-select="true"
              item-key="name"
              show-select
              class="elevation-1"
            />
          </v-card>
        </v-col><!-- Lista de usuários -->

        <v-divider vertical />

        <v-col
          v-if="foiSelecionado"
          sm="12"
          md="7"
          class="d-flex text-center"
        >
          <v-scroll-y-transition mode="out-in">
            <v-card
              class="py-6 mx-auto"
              flat
            >
              <v-card-text>
                <h3 class="text-h5 mb-2">
                  {{ selecionado[0].name }}
                </h3>
                <div class="blue--text mb-2">
                  {{ selecionado[0].email }}
                </div>
              </v-card-text>

              <v-divider class="my-2" />

              <v-col class="text-center py-4 my-4 d-flex">
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  class="pa-2 white ma-2"
                >
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        Administrador do Sistema
                      </v-list-item-title>
                      <v-list-item-subtitle
                        class="d-flex justify-center mx-auto"
                      >
                        <v-switch
                          v-model="selecionado[0].admin"
                          :label="selecionado[0].admin ? 'SIM' : 'NÃO'"
                          class="mx-2"
                          id="switchh"
                        />
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        Usuário do Manager
                      </v-list-item-title>
                      <v-list-item-subtitle
                        class="d-flex justify-center mx-auto"
                      >
                        <v-switch
                          v-model="selecionado[0].manager"
                          :label="selecionado[0].manager ? 'SIM' : 'NÃO'"
                          class="mx-2 text-center"
                          id="switchh"
                        />
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-col>
                    <v-btn
                      color="success"
                      :disabled="!valid"
                      @click="validate"
                      class="mx-2"
                      dark
                      title="Salvar"
                    >
                      Salvar
                      <v-icon
                        right
                        dark
                      >
                        mdi-content-save
                      </v-icon>
                    </v-btn>
                  </v-col>

                  <v-divider />

                  <v-list-item
                    two-line
                    class="mt-6"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="subtitle-1">
                        Atualizado
                      </v-list-item-title>
                      <v-list-item-subtitle class="subtitle-2">
                        {{ selecionado[0].changed }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-form>
              </v-col>
            </v-card>
          </v-scroll-y-transition>
        </v-col><!-- Usuário selecionado -->
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import UsuariosServices from "@/services/UsuariosServices";
import mixinUtils from "../../mixins/mixin-utils";
import titleToolbarListTealVue from "../../components/titleToolbarListTeal.vue";

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  mixins: [mixinUtils],
  components: { titleToolbarListTealVue },
  props: {},
  data: () => ({
    active: [],
    open: [],
    users: [],
    usuarios: [],
    selecionado: [],
    usuarioEditado: {},
    perfis: ["Técnico", "Administrador"],
    loading: false,
    loader: null,
    formRegister: {
      id: "",
      admin: false,
      manager: false,
    },
    switch: true,
    valid: false,
    openSalvar: false,
    ultimoEstadoSalvar: false,

    subtitle: "LIstagem dos usuários",
    title: "Gerenciar Usuários",

    caseSensitive: false,
    search: "",
    headers: [
      {
        text: "Usuário",
        align: "start",
        filterable: true,
        value: "name",
      },
    ],
  }),

  mounted() {
    //Salvar status do Admin
    this.ultimoEstadoSalvar = this.formRegister.admin;
  },

  computed: {
    foiSelecionado() {
      //console.log(this.selecionado[0]);
      return Object.keys(this.selecionado).length > 0;
    },
    listaCarregada() {
      return Object.keys(this.usuarios).length > 0;
    },
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
  },

  watch: {
    "formRegister.admin"() {
      this.openSalvar = true;
    },

    selecionado: {
      handler: function (val) {
        if (typeof val[0].admin != undefined) {
          this.selecionado[0].manager = val[0].admin;
        }
      },
      deep: true,
    },
  },

  // Carrega usuários ao criar a página
  // TODO: Analisar se ficará assim
  created() {
    this.getUsuarios();
  },

  methods: {
    updateForm() {},
    validate() {
      if (this.$refs.form.validate()) {
        this.updateUsuario();
      }
    },

    async updateUsuario() {
      try {
        this.formRegister = {
          id: this.selecionado[0]._id,
          admin: this.selecionado[0].admin,
          manager: this.selecionado[0].manager,
        };

        const response = await UsuariosServices.updateUsuario(
          this.formRegister
        );

        if (response.status != 200) {
          // Erro na atualização do usuário
          return mixinUtils.methods.messageSwalToast(
            "error",
            response.data.message
          );
        }
        mixinUtils.methods.messageSwalToast(
          "success",
          "Usuário atualizado sucesso!"
        );

        await pause(1000);
        this.$router.go();
      } catch (error) {
        return mixinUtils.methods.messageSwalToast(
          "error",
          "Tente novamentemais tarde! " + error.data.message
        );
      }
    },

    setLoader() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 1000);
      this.loader = null;
    },

    userSelecionado(value) {
      this.selecionado = { ...value };
    },
    getImgUrl(pic) {
      return pic;
    },

    async getUsuarios() {
      try {
        const response = await UsuariosServices.getListaUsuarios();
        if (typeof response == "undefined" || response.status != 200) {
          return mixinUtils.methods.messageSwalToast(
            "error",
            "Não foi possível carregar os usuários, tente novamente mais tarde!"
          );
        }

        this.setLoader();
        await pause(1000);
        this.usuarios = response.data;
      } catch (error) {
        return mixinUtils.methods.messageSwalToast(
          "error",
          "Não foi possível carregar os usuários, tente novamente mais tarde!"
        );
      }
    },

    atualizaLista() {
      this.selecionado = [];
    },
  },
};
</script>

<style>
.v-treeview-node__label {
  color: #1867c0 !important;
}
.v-input__slot {
  /* display: block !important; */
}
</style>
