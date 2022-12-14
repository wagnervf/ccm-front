export default [
  {
    name: "Dashboard",
    path: "/",
    component: () => import("@/views/Dashboard/Dashboard.vue"),
    meta: {
      breadCrumb: [
        {
          text: "Dashboard",
          disabled: true,
          href: "/dashboard",
          icon: "mdi-chart-box",
        },
      ],
      permission: ["ADMIN", "TEC"],
    },
  },
  {
    name: "Simulações",
    path: "/simulacoes",
    component: () => import("@/views/Simulacoes/Simulacoes.vue"),
    meta: {
      breadCrumb: [
        {
          text: "Início",
          disabled: true,
          href: "/",
        },
        {
          text: "Simulações",
          disabled: true,
          href: "/simulacoes",
          icon: "mdi-database",
        },
      ],
      permission: ["ADMIN", "TEC"],
    },
  },
  {
    name: "Dados Basicos",
    path: "simulacoes/dadosbasicos",
    component: () => import("@/views/Simulacoes/DadosBasicos.vue"),
    meta: {
      breadCrumb: [
        {
          text: "Início",
          disabled: true,
          href: "/",
        },
        {
          text: "Simulações",
          to: { name: "" },
          disabled: false,
          href: "/simulacoes",
        },
        {
          text: "Dados Básicos das Simulações",
          to: { name: "" },
          disabled: false,
        },
      ],
      permission: ["ADMIN", "TEC"],
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
          text: "Simulações",
          disabled: false,
          href: "/simulacoes",
          icon: "mdi-database",
        },
        {
          text: "Monta Natural",
          to: { name: "" },
          disabled: false,
        },
      ],
      permission: ["ADMIN", "TEC"],
    },
  },

  {
    name: "IATF + RT",
    path: "iatf/index",
    component: () => import("@/views/Iatf/Index.vue"),
    meta: {
      breadCrumb: [
        {
          text: "Início",
          disabled: true,
          href: "/",
        },
        {
          text: "Simulações",
          disabled: false,
          href: "/simulacoes",
          icon: "mdi-database",
        },
        {
          text: "IATF + RT",
          to: { name: "" },
          disabled: false,
        },
      ],
      permission: ["ADMIN", "TEC"],
    },
  },

  {
    name: "2 IATF + RT",
    path: "iatf2/index",
    component: () => import("@/views/Iatf_2/Index.vue"),
    meta: {
      breadCrumb: [
        {
          text: "Início",
          disabled: true,
          href: "/",
        },
        {
          text: "Simulações",
          disabled: false,
          href: "/simulacoes",
          icon: "mdi-database",
        },
        {
          text: "2 IATF + RT",
          to: { name: "" },
          disabled: false,
        },
      ],
      permission: ["ADMIN", "TEC"],
    },
  },

  {
    name: "3 IATF + RT",
    path: "iatf3/index",
    component: () => import("@/views/Iatf_3/Index.vue"),
    meta: {
      breadCrumb: [
        {
          text: "Início",
          disabled: true,
          href: "/",
        },
        {
          text: "Simulações",
          disabled: false,
          href: "/simulacoes",
          icon: "mdi-database",
        },
        {
          text: "3 IATF + RT",
          to: { name: "" },
          disabled: false,
        },
      ],
      permission: ["ADMIN", "TEC"],
    },
  },

  {
    name: "Gerenciar Usuarios",
    path: "usuarios/gerenciar",
    component: () => import("@/views/Usuarios/GerenciarUsuarios.vue"),
    meta: {
      breadCrumb: [
        {
          text: "Início",
          disabled: true,
          href: "/",
        },
        {
          text: "Gerenciar Usuarios",
          to: { name: "" },
          disabled: false,
          href: "index",
        },
      ],
      permission: ["ADMIN"],
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
      permission: ["ADMIN", "TEC"],
    },
  },

  {
    name: "Sobre",
    path: "Sobre/sobre",
    component: () => import("@/views/Sobre/Sobre.vue"),
    meta: { permission: ["ADMIN", "TEC"] },
  },

  {
    name: "Ajuda",
    path: "Ajuda/ajuda",
    component: () => import("@/views/Ajuda/Ajuda.vue"),
    meta: {
      breadCrumb: [
        {
          text: "Ajuda",
          disabled: true,
          href: "/ajuda",
          icon: "mdi-help",
        },
      ],
      permission: ["ADMIN", "TEC"],
    },
  },

  {
    name: "Configuracoes",
    path: "Configuracoes/configuracoes",
    component: () => import("@/views/Configuracoes/Configuracoes.vue"),
    meta: { permission: ["ADMIN", "TEC"] },
  },
];
