<template>
  <v-container fluid>
    <v-breadcrumbs
      :items="breadCrumbs"
      class="pa-0"
    >
      <template #item="{ item }">
        <v-breadcrumbs-item
          :to="item.to"
          class="text-subtitle-2 crumb-item teal--text pa-0"
          :disabled="item.disabled"
          exact
        >
          <v-icon class="text-h5 pr-2 teal--text">
            {{ item.icon }}
          </v-icon>
          <span class="text-sm-caption pa-0"> {{ item.text }} </span>
        </v-breadcrumbs-item>
      </template>
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </v-container>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },

  computed: {
    breadCrumbs() {
      if (typeof this.$route.meta.breadCrumb === "function") {
        return this.$route.meta.breadCrumb.call(this, this.$route);
      }
      //console.log(this.$route.meta.breadCrumb);
      //return window.history.back();
      return this.$route.meta.breadCrumb;
    },
  },
};
</script>

<style scope></style>
