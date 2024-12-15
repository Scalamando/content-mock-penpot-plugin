import { createMemoryHistory, createRouter } from "vue-router"
import StartView from "@/views/StartView.vue"
import OnboardingView from "@/views/OnboardingView.vue"

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      name: "start",
      component: StartView,
    },
    {
      path: "/new",
      name: "new-collection",
      component: () => import("@/views/CreateView.vue"),
    },
    {
      path: "/edit/:id",
      name: "edit-collection",
      component: () => import("@/views/EditView.vue"),
      props: true,
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/SettingsView.vue"),
    },
    {
      path: "/onboarding",
      name: "onboarding",
      component: OnboardingView,
    },
    {
      path: "/help",
      name: "help",
      component: () => import("@/views/HelpView.vue"),
    },
  ],
})

export default router
