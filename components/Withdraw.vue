<template>
  <b-container fluid class="mx-0 tab-container">
    <b-row align-v="center">
      <b-col cols="12" class="py-2 border-bottom border-dark">
        <h3 v-if="!showResult" class="text-info">
          {{ $t('withdraw') }}
        </h3>
        <h3 v-else class="text-info">
          {{ $t('withdrawal_request_sent') }}
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-if="!showResult"
        cols="12"
        md="8"
        lg="8"
        xl="8"
        class="py-4 d-flex align-items-center"
      >
        <b-form
          class="px-3 w-100"
        >
          <b-row>
            <b-col cols="12">
              <b-form-group>
                <v-select
                  v-model="paymentProcessor"
                  :reduce="lan => lan.value"
                  label="text"
                  class="sign-select"
                  :options="processorList"
                  :clearable="false"
                  :searchable="false"
                >
                  <template slot="no-options">
                    {{ $t('no_match_options') }}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-input-group>
                  <template v-slot:append>
                    <b-input-group-text>
                      <span class="text-primary">EUR</span>
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    v-model="withdrawAmount"
                    :state="checkWithdrawAmount"
                    :placeholder="$t('amount')"
                  />
                </b-input-group>
                <b-form-invalid-feedback :state="checkWithdrawAmount">
                  {{ $t('between_value', [minWithdrawAmount, getBalanceInfo.real_balance]) }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <template v-if="paymentProcessor == bankTransferIdx">
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.bankForm.accountNumber.$model"
                    :state="cardValidState('accountNumber')"
                    :placeholder="$t('account_name')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('enter_valid_value') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.bankForm.beneficiaryName.$model"
                    :state="cardValidState('beneficiaryName')"
                    :placeholder="$t('beneficiary_name')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.bankForm.swiftCode.$model"
                    :state="cardValidState('swiftCode')"
                    :placeholder="$t('swift_code')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.bankForm.bankName.$model"
                    :state="cardValidState('bankName')"
                    :placeholder="$t('bank_name')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.bankForm.registrationAddress.$model"
                    :state="cardValidState('registrationAddress')"
                    :placeholder="$t('recipient_registration_address')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <v-select
                    v-model="bankForm.country"
                    label="text"
                    class="sign-select"
                    :options="countryList"
                    :clearable="false"
                  >
                    <template slot="no-options">
                      {{ $t('no_match_options') }}
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.bankForm.city.$model"
                    :state="cardValidState('city')"
                    :placeholder="$t('city')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.bankForm.zipCode.$model"
                    :state="cardValidState('zipCode')"
                    :placeholder="$t('zip_code')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </template>
          </b-row>
          <b-row class="my-3">
            <b-col cols="12" class="d-flex justify-content-center">
              <b-button
                v-if="processorList.length > 0"
                pill
                size="sm"
                variant="secondary text-dark"
                class="orange-btn mx-2"
                @click="clickPayment"
              >
                {{ $t('withdraw') }}
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
      <b-col
        v-else
        cols="12"
        md="8"
        lg="8"
        xl="8"
        class="py-4 d-flex align-items-center"
      >
        <b-row>
          <b-col cols="12">
            <h3 class="text-info text-uppercase font-weight-light">
              {{ $t('congratulations') }}!
            </h3>
          </b-col>
          <b-col cols="12">
            <h4 class="text-info">
              {{ $t('withdrawal_scheduled', [ $options.filters.currencyFormat(result.amount) ]) }}
            </h4>
          </b-col>
          <b-col cols="12">
            <h4 class="text-info">
              {{ $t('withdrawal_request_process') }}
            </h4>
          </b-col>
          <b-col cols="12">
            <b-button
              pill
              size="sm"
              variant="secondary text-dark"
              class="orange-btn mx-2"
              @click="backAction"
            >
              {{ $t('back') }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import countryData from 'countries-list'
import { validationMixin } from 'vuelidate'
import { numeric, required } from 'vuelidate/lib/validators'
import common from '~/mixins/common'

export default {
  mixins: [validationMixin, common],
  data: () => ({
    isSuccess: false,
    withdrawAmount: 50,
    minWithdrawAmount: 10,
    processorList: [],
    paymentProcessor: '',
    countryList: [],
    showResult: false,
    result: '',
    bankTransferIdx: 2,
    bankForm: {
      accountNumber: null,
      beneficiaryName: null,
      swiftCode: null,
      bankName: null,
      city: null,
      zipCode: null,
      registrationAddress: null,
      country: null
    }
  }),
  validations: {
    bankForm: {
      accountNumber: {
        required,
        numeric
      },
      beneficiaryName: {
        required
      },
      swiftCode: {
        required
      },
      bankName: {
        required
      },
      city: {
        required
      },
      zipCode: {
        required
      },
      registrationAddress: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['loggedIn', 'loggedUser', 'getCountryCode', 'getBalanceInfo']),
    checkWithdrawAmount () {
      return this.withdrawAmount >= this.minWithdrawAmount && this.withdrawAmount <= this.getBalanceInfo.real_balance
    }
  },
  watch: {
    paymentProcessor () {
      this.processorList.forEach((processor, index) => {
        if (processor.value === this.paymentProcessor) {
          this.minWithdrawAmount = 'min_withdraw' in processor.setting ? processor.setting.min_withdraw : 10
          this.minWithdrawAmount = parseInt(this.minWithdrawAmount)
        }
      })
    }
  },
  mounted () {
    this.bankForm.country = countryData.countries[this.getCountryCode].name
    Object.keys(countryData.countries).forEach((key) => {
      this.countryList.push({
        text: countryData.countries[key].name,
        value: key
      })
    })
    this.getPaymentProcessorAction()
  },
  methods: {
    ...mapActions(['setGamePlayStatus', 'setManagementTab', 'setMainLoading', 'setActivePage', 'setBalanceInfo', 'setBonusCode']),
    ...mapActions('paymentProcessor', ['getWithdrawalPaymentProcessors', 'sendWithdrawalRequest']),
    cardValidState (name) {
      const { $dirty, $error } = this.$v.bankForm[name]
      return $dirty ? !$error : null
    },
    async getPaymentProcessorAction () {
      const data = await this.getWithdrawalPaymentProcessors({
        $axios: this.$axios,
        params: {
          status: 'activated',
          removeCash: true,
          sortPriority: true,
          country: this.getCountryCode
        }
      })
      if (data.status === 1) {
        this.processorList = []
        data.processors.forEach((processor, index) => {
          let setting = {}
          if (processor.withdraw_setting != null) {
            if (this.$config.IS_DEV === 'development') {
              setting = JSON.parse(processor.withdraw_setting)
            } else {
              setting = JSON.parse(JSON.stringify(processor.withdraw_setting))
            }
          }
          this.processorList.push({
            text: processor.name,
            value: processor.id,
            setting
          })
        })
        this.paymentProcessor = this.processorList[0].value
        this.minWithdrawAmount = 'min_withdraw' in this.processorList[0].setting ? this.processorList[0].setting.min_withdraw : 10
        this.minWithdrawAmount = parseInt(this.minWithdrawAmount)
      }
    },
    async clickPayment () {
      if (this.processorList.length === 0) {
        return
      }
      if (this.paymentProcessor === this.bankTransferIdx) {
        this.$v.bankForm.$touch()
      }
      if (this.checkWithdrawAmount && !this.$v.bankForm.$anyError) {
        this.setMainLoading(true)
        this.bankForm.country = this.bankForm.country.value
        const data = await this.sendWithdrawalRequest({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            paymentId: this.paymentProcessor,
            amount: this.withdrawAmount,
            bankForm: this.bankForm
          }
        })
        if (data.status === 1) {
          this.result = data.result
          this.showResult = true
        } else {
          this.$bvToast.toast(this.$t('not_meet_wager_requirement'), {
            variant: 'danger',
            appendToast: true,
            toaster: 'b-toaster-top-right',
            noCloseButton: true,
            autoHideDelay: 3500,
            solid: true
          })
        }
        this.setMainLoading(false)
      }
    },
    backAction () {
      this.bankForm = {}
      this.bankForm.country = this.getCountryCode
      this.$v.$reset()
      this.showResult = false
    }
  }
}
</script>
