<template>
  <v-app>
    <v-container>
      <tool-bar />
      <v-layout row justify-space-between>
        <v-content>
          <transition name="page" mode="out-in">
            <v-layout row>
              <v-flex xs12 sm3 mt-5>
                <v-card>
                  <member-sidebar />
                </v-card>
              </v-flex>
              <v-flex xs12 sm9 mt-5>
                <v-content>
                  <v-card>
                    <transition name="page" mode="out-in">
                      <router-view />
                    </transition>
                  </v-card>
                </v-content>
              </v-flex>
            </v-layout>
          </transition>
        </v-content>
      </v-layout>
      <feedback-message />
    </v-container>
    <page-footer />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex"
import ToolBar from "~/components/ToolBar"
import FeedbackMessage from "~/components/FeedbackMessage"
import PageFooter from "~/components/PageFooter"
import MemberSideBar from "~/components/MemberSideBar"
export default {
  components: {
    "tool-bar": ToolBar,
    "feedback-message": FeedbackMessage,
    "page-footer": PageFooter,
    "member-sidebar": MemberSideBar
  },
  head() {
    return {
      script: [{ src: "https://www.google.com/recaptcha/api.js" }]
    }
  },
  computed: mapGetters({
    authenticated: "auth/check"
  }),
  methods: {
    async logout() {
      // Log out the user.
      await this.$store.dispatch("auth/logout")
      // Redirect to login.
      this.$router.push({ name: "login" })
    }
  }
}
</script>

<style>
@media only screen and (min-width: 1904px) {
  .container {
    max-width: 990px;
  }
}

@media only screen and (min-width: 1264px) {
  .container {
    max-width: 990px;
  }
}
</style>
