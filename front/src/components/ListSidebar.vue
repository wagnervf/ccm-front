<template>
  <div>
    <v-list
      dense
      nav
    >
      <template v-for="item in items">
        <v-list-group
          v-if="item.children !== undefined"
          :key="item.title"
          v-model="item.active"
          :active-class="`teal--text`"
          no-action
          link
          dense
          dark
          class="py-1"
        >
          <template #activator>
            <v-list-item-icon left>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <div v-text="item.title" />
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.children"
            :key="subItem.title"
            :active-class="`teal--text`"
            class="pl-8"
            link
            router
            :to="subItem.to"
            dense
          >
            <v-list-item-icon left>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <div v-text="subItem.title" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-else
          :key="item.title"
          link
          router
          :to="item.to"
          :active-class="`teal--text`"
          dense
        >
          <v-list-item-icon left>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <div v-text="item.title" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider />
      <v-list-item
        dense
        link
        class="teal--text"
        tabindex="2"
        accesskey="s"
        title="Sair do Sistema"
        @click="logout"
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-icon class="teal--text">
              mdi-logout
            </v-icon>
            Sair
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import Menu from "../assets/json/menu.json";

export default {
  data: () => ({
    items: Menu,
  }),

  methods: {
    logout() {
      localStorage.removeItem("userLogged");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss">
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  .v-navigation-drawer__border {
    display: none;
  }
  .v-list-group__items.v-application--is-ltr {
    padding-left: 10px !important;
  }

  .v-list-item {
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;
    }

    .v-list-item__icon {
      margin: 6px 5px 0px 0px;
    }
  }
}
</style>
