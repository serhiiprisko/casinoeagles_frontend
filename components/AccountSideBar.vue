<template>
  <b-sidebar
    v-if="loggedIn && loggedUser"
    v-model="showSideBar"
    shadow
    right
    backdrop-variant="transparent"
    backdrop
    no-header
  >
    <div class="sidebar-div">
      <b-list-group>
        <b-list-group-item class="bg-primary text-info">
          <b-row>
            <b-col cols="12" class="d-flex justify-content-between align-items-center">
              <h4 class="text-info text-uppercase">{{ $t('real_balance') }}</h4>
              <h4 class="text-info text-uppercase">{{ getBalanceInfo.real_balance | currencyFormat }}</h4>
            </b-col>
            <b-col cols="12" class="d-flex justify-content-between align-items-center">
              <h4 class="text-info text-uppercase">{{ $t('bonus_balance') }}</h4>
              <h4 class="text-info text-uppercase">{{ getBalanceInfo.bonus_balance | currencyFormat }}</h4>
            </b-col>
          </b-row>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoDetail(0)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0 font-weight-light text-uppercase">
              {{ $t('bet_list') }}
            </h4>
          </div>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoDetail(1)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0 font-weight-light text-uppercase">
              {{ $t('personal_details') }}
            </h4>
          </div>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoDetail(2)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0 font-weight-light text-uppercase">
              {{ $t('deposit') }}
            </h4>
          </div>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoDetail(3)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0 font-weight-light text-uppercase">
              {{ $t('withdraw') }}
            </h4>
          </div>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoDetail(4)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0 font-weight-light text-uppercase">
              {{ $t('transaction_list') }}
            </h4>
          </div>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoDetail(5)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0 font-weight-light text-uppercase">
              {{ $t('change_password') }}
            </h4>
          </div>
        </b-list-group-item>
        <b-list-group-item class="bg-light text-info" @click="gotoDetail(6)">
          <div class="d-flex justify-content-start align-items-center ">
            <h4 class="text-info mb-0 font-weight-light text-uppercase">
              {{ $t('log_out') }}
            </h4>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-sidebar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import common from '~/mixins/common'

export default {
  mixins: [common],
  data: () => ({
    showSideBar: false
  }),
  watch: {
  },
  created () {
    this.$nuxt.$on('account-sidebar-event', () => {
      this.showSideBar = !this.showSideBar
    })
  },
  computed: {
    ...mapGetters(['loggedUser', 'loggedIn', 'getBalanceInfo'])
  },
  mounted () {
  },
  methods: {
    ...mapActions('player', ['getPlayer', 'updateProfile']),
    gotoDetail (index) {
      this.showSideBar = false
      this.$nuxt.$emit('user-account-event', index)
    }
  }
}
</script>
