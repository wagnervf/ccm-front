<template>
  <div>
    <v-card
      class="my-2"
      elevation="1"
    >
      <v-toolbar
        elevation="0"
        color="blue grey lighten-3"
        light
      >
        <v-toolbar-title>Estados / Municípios</v-toolbar-title>
      </v-toolbar>
      <v-select
        v-model="estado"
        label="Selecione o Estado"
        :items="estados"
        hide-details
        filled
        clearable
        class="px-6 pb-4 my-2"
      />
    </v-card>
    <v-card
      v-if="filteredList.length != 0"
      class="mx-0"
    >
      <v-card-title>Cidades</v-card-title>
      <v-sheet class="pa-2 teal lighten-2">
        <v-card-text>
          <v-text-field
            v-model="search"
            label="Filtrar"
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
            class="py-4"
            dark
          />
        </v-card-text>
      </v-sheet>

      <v-list
        dense
        class="cidades"
      >
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in filteredList"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <div v-text="item" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import brasil from "../assets/json/brasil.json";

// const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  name: "ComponenteEstado",
  data() {
    return {
      active: [],
      open: [1, 2],
      users: [],
      search: "",
      caseSensitive: false,
      cidades: [],
      estado: [],
      cidade: [],
      brasil,
      estados: [
        { value: "AC", text: "Acre" },
        { value: "AL", text: "Alagoas" },
        { value: "AP", text: "Amapá" },
        { value: "AM", text: "Amazonas" },
        { value: "BA", text: "Bahia" },
        { value: "CE", text: "Ceará" },
        { value: "DF", text: "Distrito Federal" },
        { value: "ES", text: "Espírito Santo" },
        { value: "GO", text: "Goiás" },
        { value: "MA", text: "Maranhão" },
        { value: "MT", text: "Mato Grosso" },
        { value: "MS", text: "Mato Grosso do Sul" },
        { value: "MG", text: "Minas Gerais" },
        { value: "PA", text: "Pará" },
        { value: "PB", text: "Paraíba" },
        { value: "PR", text: "Paraná" },
        { value: "PE", text: "Pernambuco" },
        { value: "PI", text: "Piauí" },
        { value: "RJ", text: "Rio de Janeiro" },
        { value: "RN", text: "Rio Grande do Norte" },
        { value: "RS", text: "Rio Grande do Sul" },
        { value: "RO", text: "Rondônia" },
        { value: "RR", text: "Roraima" },
        { value: "SC", text: "Santa Catarina" },
        { value: "SP", text: "São Paulo" },
        { value: "SE", text: "Sergipe" },
        { value: "TO", text: "Tocantins" },
      ],
    };
  },

  computed: {
    items() {
      return [
        {
          name: "Users",
          children: this.users,
        },
      ];
    },

    filteredList() {
      return this.cidades.filter((post) =>
        post.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },

  watch: {
    estado() {
      //  console.log(brasil[this.estado].cidades);
      this.cidades = brasil[this.estado].cidades;
      // console.log();
    },
  },

  methods: {},
};
</script>
<style scoped>
.cidades {
  height: 400px; /* or any height you want */
  overflow-y: auto;
  margin: 12px;
}
</style>
