import Vue from "vue"
import Router from "vue-router"
import { scrollBehavior } from "~/utils"

Vue.use(Router)

const Index = () => import("~/pages/index").then(m => m.default || m)
const Welcome = () => import("~/pages/welcome").then(m => m.default || m)

const Login = () => import("~/pages/auth/login").then(m => m.default || m)
const Register = () => import("~/pages/auth/register").then(m => m.default || m)
const PasswordReset = () =>
  import("~/pages/auth/password/reset").then(m => m.default || m)
const PasswordRequest = () =>
  import("~/pages/auth/password/email").then(m => m.default || m)

const Settings = () =>
  import("~/pages/memberprofile/index").then(m => m.default || m)
const SettingsProfile = () =>
  import("~/pages/memberprofile/profile").then(m => m.default || m)
const SettingsPassword = () =>
  import("~/pages/memberprofile/password").then(m => m.default || m)
const MemeberDashboard = () =>
  import("~/pages/members/dashboard").then(m => m.default || m)
const MemberDeposit = () =>
  import("~/pages/members/deposit").then(m => m.default || m)
const MemberWithdraw = () =>
  import("~/pages/members/withdraw").then(m => m.default || m)
const MemberDepositList = () =>
  import("~/pages/members/depositlist").then(m => m.default || m)
const routes = [
  { path: "/", name: "index", component: Index },
  { path: "/welcome", name: "welcome", component: Welcome },

  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  {
    path: "/password/reset",
    name: "password.request",
    component: PasswordRequest
  },
  {
    path: "/password/reset/:token",
    name: "password.reset",
    component: PasswordReset
  },
  {
    path: "/settings",
    component: Settings,
    children: [
      { path: "", redirect: { name: "settings.profile" } },
      { path: "profile", name: "settings.profile", component: SettingsProfile },
      {
        path: "password",
        name: "settings.password",
        component: SettingsPassword
      }
    ]
  },
  { path: "/members", redirect: { name: "members.dashboard" } },
  {
    path: "/members/dashboard",
    name: "members.dashboard",
    component: MemeberDashboard
  },
  {
    path: "/members/deposit",
    name: "members.deposit",
    component: MemberDeposit
  },
  {
    path: "/members/withdraw",
    name: "members.withdraw",
    component: MemberWithdraw
  },
  {
    path: "/members/depositlist",
    name: "members.deposit.list",
    component: MemberDepositList
  }
]

export function createRouter() {
  return new Router({
    routes,
    scrollBehavior,
    mode: "history"
  })
}
