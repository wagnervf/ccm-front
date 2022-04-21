import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path: "/",
    redirect: "/",
    component: () => import("@/layouts/Layout"),

    children: [
      // Components

      {
        name: "Home",
        path: "/",
        component: () => import("@/views/Home.vue"),
        meta: {
          breadCrumb: [
            {
              text: "Início",
              disabled: true,
              href: "/",
              icon: "mdi-home",
            },
          ],
        },
      },
      {
        name: "Monta Natural",
        path: "montanatural/index",
        component: () => import("@/views/MontaNatural/Index.vue"),
        meta: {
          breadCrumb: [
            {
              text: "Início",
              disabled: true,
              href: "/",
            },
            {
              text: "Monta Natural",
              to: { name: "" },
              disabled: false,
            },
          ],
        },
      },

      {
        name: "Monta Natural Dados Basicos",
        path: "montanatural/dadosbasicos",
        component: () => import("@/views/MontaNatural/DadosBasicos.vue"),
        meta: {
          breadCrumb: [
            {
              text: "Início",
              disabled: true,
              href: "/",
            },
            {
              text: "Monta Natural",
              to: { name: "" },
              disabled: false,
              href: "index",
            },
            {
              text: "Dados Básicos",
              to: { name: "" },
              disabled: false,
            },
          ],
        },
      },

      {
        name: "Monta Natural Dados Tecnicos Rebanho",
        path: "montanatural/dadostecnicosrebanho",
        component: () =>
          import("@/views/MontaNatural/DadosTecnicosRebanho.vue"),
        meta: {
          breadCrumb: [
            {
              text: "Início",
              disabled: true,
              href: "/",
            },
            {
              text: "Monta Natural",
              to: { name: "" },
              disabled: false,
              href: "index",
            },
            {
              text: "Dados Tecnicos Rebanho",
              to: { name: "" },
              disabled: false,
            },
          ],
        },
      },

      {
        name: "Monta Natural Aquisicao de Touros",
        path: "montanatural/aquisicaotouros",
        component: () => import("@/views/MontaNatural/AquisicaoTouros.vue"),
        meta: {
          breadCrumb: [
            {
              text: "Início",
              disabled: true,
              href: "/",
            },
            {
              text: "Monta Natural",
              to: { name: "" },
              disabled: false,
              href: "index",
            },
            {
              text: "Dados Aquisicao de Touros",
              to: { name: "" },
              disabled: false,
            },
          ],
        },
      },

      {
        name: "Monta Natural Manutecao de Touros",
        path: "montanatural/manutencaotouros",
        component: () => import("@/views/MontaNatural/ManutencaoTouros.vue"),
        meta: {
          breadCrumb: [
            {
              text: "Início",
              disabled: true,
              href: "/",
            },
            {
              text: "Monta Natural",
              to: { name: "" },
              disabled: false,
              href: "index",
            },
            {
              text: "Dados Manutecao de Touros",
              to: { name: "" },
              disabled: false,
            },
          ],
        },
      },

      {
        name: "Lista de Usuarios",
        path: "usuarios/listausuarios",
        component: () => import("@/views/Usuarios/ListaUsuarios.vue"),
        meta: {
          breadCrumb: [
            {
              text: "Início",
              disabled: true,
              href: "/",
            },
            {
              text: "Lista de Usuarios",
              to: { name: "" },
              disabled: false,
              href: "index",
            },
            
          ],
        },
      },

  
      {
        name: "Usuarios Meu Perfil",
        path: "usuarios/perfil",
        component: () => import("@/views/Usuarios/Perfil.vue"),
        meta: {
          breadCrumb: [
            {
              text: "Início",
              disabled: true,
              href: "/",
            },
            {
              text: "Lista de Usuarios",
              to: { name: "" },
              disabled: false,
              href: "listausuarios",
            },
            {
              text: "Meu Perfil",
              to: { name: "" },
              disabled: false,
            },
          ],
        },
      },

      {
        name: "Novo Usuario",
        path: "Usuarios/Add",
        component: () => import("@/views/Usuarios/Add.vue"),
      },

      {
        name: "TableSimple",
        path: "Parametros/parametros",
        component: () => import("@/views/Parametros/Parametros.vue"),
      },
      {
        name: "Sobre",
        path: "Sobre/sobre",
        component: () => import("@/views/Sobre/Sobre.vue"),
      },

      {
        name: "Configuracoes",
        path: "Configuracoes/configuracoes",
        component: () => import("@/views/Configuracoes/Configuracoes.vue"),
      },
    ],
  },
];
export default routes;
