<template>
  <div>
    <b-container
      v-if="!getGamePlayStatus"
      fluid
      class="mainHeader mx-0 border-bottom bg-primary"
      :class="($mq==='xl' || $mq==='lg') ? 'desktop' : 'mobile'"
    >
      <mq-layout mq="lg+">
        <b-row align-v="center">
          <b-col>
          </b-col>
          <b-col cols="8" class="d-flex px-0 justify-content-center align-items-center">
            <b-nav class="header-nav">
              <b-nav-item :active="getActivePage === 0" class="d-flex align-items-center justify-content-center" @click="gotoPage(0)">
                <h5 class="mb-0">{{ $t('casino') }}</h5>
              </b-nav-item>
              <b-nav-item class="logo-item d-flex align-items-center justify-content-center" :active="getActivePage === 2" @click="gotoPage(2)">
                <h5 class="mb-0">{{ $t('faq') }}</h5>
              </b-nav-item>
              <b-nav-item class="logo-item d-flex align-items-center justify-content-center">
                <a :href="'/'">
                  <b-img src="/logo1.png" height="70" class="py-1" />
                </a>
              </b-nav-item>
              <b-nav-item :active="getActivePage === 3" class="promotion-nav-item d-flex align-items-center justify-content-center" @click="gotoPage(3)">
                <h5 class="mb-0">{{ $t('contact_us') }}</h5>
              </b-nav-item>
            </b-nav>
          </b-col>
          <b-col class="px-0 d-flex justify-content-end align-items-center">
            <template v-if="loggedIn && loggedUser">
              <b-row class="w-100 mx-0 my-2">
                <b-col cols="12" class="px-0 mb-1 d-flex justify-content-end align-items-center">
                  <b-dropdown size="sm" variant="primary" right class="language-dropdown">
                    <template v-slot:button-content>
                      <font-awesome-icon :icon="['fas', 'user-alt']" class="text-white mr-2" />
                      <span class="text-info">{{ loggedUser.username }}</span>
                    </template>
                    <b-dropdown-item @click="gotoDetail(0)">
                      {{ $t('bet_list') }}
                    </b-dropdown-item>
                    <b-dropdown-item @click="gotoDetail(1)">
                      {{ $t('personal_details') }}
                    </b-dropdown-item>
                    <b-dropdown-item @click="gotoDetail(2)">
                      {{ $t('deposit') }}
                    </b-dropdown-item>
                    <b-dropdown-item @click="gotoDetail(3)">
                      {{ $t('withdraw') }}
                    </b-dropdown-item>
                    <b-dropdown-item @click="gotoDetail(4)">
                      {{ $t('transaction_list') }}
                    </b-dropdown-item>
                    <b-dropdown-item @click="gotoDetail(5)">
                      {{ $t('change_password') }}
                    </b-dropdown-item>
                    <b-dropdown-item @click="gotoDetail(6)">
                      {{ $t('log_out') }}
                    </b-dropdown-item>
                  </b-dropdown>
                  <b-button
                    size="sm"
                    variant="success"
                    class="red-btn mx-2"
                    @click="depositAction()"
                  >
                    {{ $t('deposit') }}
                  </b-button>
                  <Language />
                </b-col>
                <b-col cols="12" class="px-0 d-flex justify-content-end align-items-start">
                  <span class="h7 text-info text-nowrap" style="text-transform: uppercase;opacity: 0.7">{{ $t('balance') }}</span>
                  <span class="h7 text-white text-nowrap pl-1 pr-3">{{ getBalanceInfo.total_balance | currencyFormat }}</span>
                  <span class="h7 text-info text-nowrap" style="text-transform: uppercase;opacity: 0.7">{{ $t('real_balance') }}</span>
                  <span class="h7 text-white text-nowrap pl-1 pr-3">{{ getBalanceInfo.real_balance | currencyFormat }}</span>
                  <span class="h7 text-info text-nowrap" style="text-transform: uppercase;opacity: 0.7">{{ $t('bonus_balance') }}</span>
                  <span class="h7 text-white text-nowrap pl-1 pr-3">{{ getBalanceInfo.bonus_balance | currencyFormat }}</span>
                </b-col>
              </b-row>
            </template>
            <template v-else>
              <b-button
                size="sm"
                variant="info"
                class="register-btn mx-2 text-white"
                @click="registerAction()"
              >
                {{ $t('register') }}
              </b-button>
              <b-button
                size="sm"
                variant="info"
                class="red-btn text-white"
                @click="loginAction()"
              >
                {{ $t('login') }}
              </b-button>
              <Language />
            </template>
          </b-col>
        </b-row>
      </mq-layout>
      <mq-layout mq="md">
        <template v-if="loggedIn && loggedUser">
          <b-row>
            <b-col cols="12" class="d-flex align-items-center justify-content-between">
              <font-awesome-icon
                :icon="['fas', 'bars']"
                class="text-white mr-2"
                style="font-size: 1.5rem;"
                @click="clickSideBarAction"
              />
              <a :href="'/'">
                <b-img src="/logo1.png" height="70" class="py-1" />
              </a>
              <div class="w-100" />
              <b-row cols="2" class="pr-4" @click="clickAccountSideBarAction">
                <b-col class="pl-0">
                  <font-awesome-icon
                    :icon="['fas', 'user-circle']"
                    class="text-secondary mr-2"
                    style="font-size: 3rem;"
                  />
                </b-col>
                <b-col class="pl-0 d-flex align-items-center justify-content-start">
                  <b-row cols="2">
                    <b-col cols="12">
                      <h4 class="text-secondary mb-0">
                        {{ loggedUser.username }}
                      </h4>
                    </b-col>
                    <b-col cols="12">
                      <h4 class="text-secondary mb-0 text-nowrap">
                        {{ getBalanceInfo.total_balance | currencyFormat }}
                      </h4>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" class="d-flex align-items-center justify-content-between py-2">
              <b-button
                block
                variant="success text-dark"
                class="red-btn mx-2"
                @click="depositAction"
              >
                {{ $t('deposit') }}
              </b-button>
            </b-col>
          </b-row>
        </template>
        <template v-else>
          <b-row>
            <b-col cols="12" class="d-flex align-items-center justify-content-between">
              <font-awesome-icon
                :icon="['fas', 'bars']"
                class="text-white mr-2"
                style="font-size: 1.5rem;"
                @click="clickSideBarAction"
              />
              <a :href="'/'">
                <b-img src="/logo1.png" height="60" class="py-1" />
              </a>
              <div class="w-100" />
            </b-col>
            <b-col cols="12" class="d-flex align-items-center justify-content-between py-2">
              <b-button
                pill
                block
                class="register-btn text-white mr-1"
                @click="registerAction()"
              >
                {{ $t('register') }}
              </b-button>
              <b-button
                pill
                block
                variant="info"
                class="red-btn text-white border-white ml-1 mt-0"
                style="text-transform: uppercase;"
                @click="loginAction()"
              >
                {{ $t('login') }}
              </b-button>
            </b-col>
          </b-row>
        </template>
      </mq-layout>
    </b-container>
    <b-container
      v-else
      fluid
      class="mx-0 bg-primary gameHeader"
      :class="($mq==='xl' || $mq==='lg') ? 'desktop' : 'mobile'"
    >
      <template v-if="$mq==='lg' || $mq==='xl'">
        <b-row align-v="center">
          <b-col class="my-1 d-flex align-items-center">
            <a :href="'/'">
              <b-img src="/logo1.png" height="70" class="py-1" />
            </a>
            <font-awesome-icon
              v-if="!isFullscreen"
              :icon="['fas', 'expand']"
              class="text-white expand-btn mx-2"
              @click="toggleFullscreen()"
            />
            <font-awesome-icon
              v-else
              :icon="['fas', 'compress']"
              class="text-white expand-btn mx-2"
              @click="toggleFullscreen()"
            />
          </b-col>
          <b-col cols="6" class="d-flex justify-content-center align-items-center">
            <h5 class="text-white ml-4">
              {{ getGameName }}
            </h5>
          </b-col>
          <b-col class="d-flex align-items-center justify-content-end">
            <template v-if="loggedIn && loggedUser">
              <b-button
                size="sm"
                variant="success"
                class="red-btn mx-2"
                @click="depositAction"
              >
                {{ $t('deposit') }}
              </b-button>
            </template>
            <template v-else>
              <b-button
                size="sm"
                variant="info"
                class="red-btn text-white"
                @click="loginAction"
              >
                {{ $t('login') }}
              </b-button>
              <b-button
                size="sm"
                variant="info"
                class="register-btn mx-2 text-white"
                @click="registerAction"
              >
                {{ $t('register') }}
              </b-button>
            </template>
            <font-awesome-icon
              :icon="['fas', 'times']"
              class="text-white ml-4 mr-2"
              style="cursor: pointer;"
              @click="closeGameAction()"
            />
          </b-col>
        </b-row>
      </template>
      <template v-else>
        <template v-if="loggedIn && loggedUser">
          <b-row>
            <b-col cols="12" class="d-flex align-items-center justify-content-between">
              <font-awesome-icon
                :icon="['fas', 'bars']"
                class="text-white mr-2"
                style="font-size: 1.5rem;"
                @click="clickSideBarAction"
              />
              <a :href="'/'">
                <b-img src="/logo1.png" height="70" class="py-1" />
              </a>
              <div class="w-100" />
              <b-row cols="2" class="pr-4" @click="clickAccountSideBarAction">
                <b-col class="pl-0">
                  <font-awesome-icon
                    :icon="['fas', 'user-circle']"
                    class="text-secondary mr-2"
                    style="font-size: 3rem;"
                  />
                </b-col>
                <b-col class="pl-0 d-flex align-items-center justify-content-start">
                  <b-row cols="2">
                    <b-col cols="12">
                      <h4 class="text-secondary mb-0">
                        {{ loggedUser.username }}
                      </h4>
                    </b-col>
                    <b-col cols="12">
                      <h4 class="text-secondary mb-0 text-nowrap">
                        {{ getBalanceInfo.total_balance | currencyFormat }}
                      </h4>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" class="d-flex align-items-center justify-content-between py-2">
              <b-button
                pill
                block
                variant="success"
                class="red-btn mx-2"
                @click="depositAction"
              >
                {{ $t('deposit') }}
              </b-button>
            </b-col>
          </b-row>
        </template>
        <template v-else>
          <b-row>
            <b-col cols="12" class="d-flex align-items-center justify-content-between">
              <font-awesome-icon
                :icon="['fas', 'bars']"
                class="text-white mr-2"
                style="font-size: 1.5rem;"
                @click="clickSideBarAction"
              />
              <a :href="'/'">
                <b-img src="/logo1.png" height="60" class="py-1" />
              </a>
              <div class="w-100" />
            </b-col>
            <b-col cols="12" class="d-flex align-items-center justify-content-between py-2">
              <b-button
                pill
                block
                class="register-btn text-white mr-1"
                @click="registerAction()"
              >
                {{ $t('register') }}
              </b-button>
              <b-button
                pill
                block
                variant="info"
                class="red-btn text-white border-white ml-1 mt-0"
                style="text-transform: uppercase;"
                @click="loginAction()"
              >
                {{ $t('login') }}
              </b-button>
            </b-col>
          </b-row>
        </template>
      </template>
    </b-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    isFullscreen: false,
    showSideBar: false,
    activePage: 0
  }),
  computed: {
    ...mapGetters(['getGamePlayStatus', 'getActivePage', 'getGameName', 'loggedIn', 'loggedUser', 'getSideBar', 'getBalanceInfo'])
  },
  created () {
    this.$nuxt.$on('redirect-page-event', (index) => {
      this.gotoPage(index)
    })
    this.$nuxt.$on('user-account-event', (index) => {
      this.gotoDetail(index)
    })
    this.$nuxt.$on('logged-in-event', () => {
      this.sockets.subscribe(`update_balance_${this.loggedUser.id}`, (payload) => {
        this.setBalanceInfo(payload)
      })
    })
    this.$nuxt.$on('deposit-action', (index) => {
      this.depositAction()
    })
  },
  async mounted () {
    window.addEventListener(
      'fullscreenchange',
      () => {
        this.isFullscreen = !this.isFullscreen
      }
    )
    if (this.loggedIn && this.loggedUser) {
      this.sockets.subscribe(`update_balance_${this.loggedUser.id}`, (payload) => {
        this.setBalanceInfo(payload)
      })
      await this.getPlayerBalance()
    }
  },
  methods: {
    ...mapActions(['setGamePlayStatus', 'setManagementTab', 'setMainLoading', 'setActivePage', 'setBalanceInfo', 'setBonusCode']),
    ...mapActions('player', ['getPlayerBalanceInfo']),
    async getPlayerBalance () {
      const data = await this.getPlayerBalanceInfo({
        $axios: this.$axios,
        params: {
          id: this.loggedUser.id
        }
      })
      if (data.status === 1) {
        this.setBalanceInfo(data.player)
      }
    },
    async gotoDetail (index) {
      if (index === 6) {
        await this.$auth.logout()
          .finally(this.handleSignedOut)
        await this.$router.push(this.localePath('/online-casino', this.$i18n.locale))
      } else {
        this.setManagementTab(index)
        await this.$router.push(this.localePath('/user-management', this.$i18n.locale))
      }
    },
    gotoPage (index) {
      if (index !== 2 && index !== 3) { this.setActivePage(index) }
      if (index === 3) {
        this.$nuxt.$emit('contact-action')
        return
      }
      this.setMainLoading(true)
      this.setGamePlayStatus(false)
      setTimeout(() => { this.setMainLoading(false) }, 500)
      switch (index) {
        case 0:
          this.$router.push(this.localePath('/online-casino', this.$i18n.locale))
          break
        case 1:
          this.$router.push(this.localePath('/live-casino', this.$i18n.locale))
          break
        case 2:
          this.popupWindow(this.localePath('/faq/0', this.$i18n.locale), 'FAQ', 1024, 768)
          break
        case 3:
          this.$router.push(this.localePath('/contact-us', this.$i18n.locale))
          break
        case 4:
          this.$router.push(this.localePath('/promotion', this.$i18n.locale))
          break
      }
    },
    toggleFullscreen () {
      const elem = document.documentElement
      if (
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled
      ) {
        if (!this.isFullscreen) {
          if (elem.requestFullscreen) {
            elem.requestFullscreen()
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen()
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen()
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen()
          }
        } else if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
    },
    closeGameAction () {
      this.setGamePlayStatus(false)
    },
    registerAction () {
      let trackingInfo = ''
      if (this.$route.query.tracking_code) {
        trackingInfo = `?tracking_code=${this.$route.query.tracking_code}`
      }
      this.$router.push(this.localePath('/sign-up' + trackingInfo, this.$i18n.locale))
    },
    loginAction () {
      this.$nuxt.$emit('login-action')
    },
    popupWindow (url, title, w, h) {
      const left = (screen.width / 2) - (w / 2)
      const top = (screen.height / 2) - (h / 2)
      return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
    },
    async depositAction () {
      this.setBonusCode('')
      this.setManagementTab(2)
      this.setGamePlayStatus(false)
      await this.$router.push(this.localePath('/user-management', this.$i18n.locale))
    },
    clickSideBarAction () {
      this.$nuxt.$emit('sidebar-event')
    },
    clickAccountSideBarAction () {
      this.$nuxt.$emit('account-sidebar-event')
    }
  }
}
</script>
