<template>
  <b-container fluid class="mx-0 tab-container">
    <b-row align-v="center">
      <b-col cols="12" class="py-2 border-bottom border-dark">
        <h3 class="text-info">
          {{ $t("deposit") }}
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        cols="12"
        md="8"
        lg="8"
        xl="8"
        class="py-4 d-flex align-items-center"
      >
        <b-overlay
          :show="loading"
          spinner-variant="secondary"
          opacity="0"
          no-wrap
        />
        <b-form ref="submitForm" class="px-3 w-100" method="post">
          <template v-if="paymentProcessor === eupaymentIdx">
            <input
              type="hidden"
              name="account_id"
              :value="resForm.account_id"
            >
            <input
              type="hidden"
              name="account_password"
              :value="resForm.account_password"
            >
            <input
              type="hidden"
              name="account_sha"
              :value="resForm.account_sha"
            >
            <input
              type="hidden"
              name="action_type"
              :value="resForm.action_type"
            >
            <input
              type="hidden"
              name="account_gateway"
              :value="resForm.account_gateway"
            >
            <input
              type="hidden"
              name="merchant_payment_id"
              :value="resForm.merchant_payment_id"
            >
            <input
              type="hidden"
              name="cust_email"
              :value="resForm.cust_email"
            >
            <input
              type="hidden"
              name="cust_billing_last_name"
              :value="resForm.cust_billing_last_name"
            >
            <input
              type="hidden"
              name="cust_billing_first_name"
              :value="resForm.cust_billing_first_name"
            >
            <input
              type="hidden"
              name="cust_billing_address"
              :value="resForm.cust_billing_address"
            >
            <input
              type="hidden"
              name="cust_billing_city"
              :value="resForm.cust_billing_city"
            >
            <input
              type="hidden"
              name="cust_billing_zipcode"
              :value="resForm.cust_billing_zipcode"
            >
            <input
              type="hidden"
              name="cust_billing_state"
              :value="resForm.cust_billing_state"
            >
            <input
              type="hidden"
              name="cust_billing_country"
              :value="resForm.cust_billing_country"
            >
            <input
              type="hidden"
              name="cust_billing_phone"
              :value="resForm.cust_billing_phone"
            >
            <input
              type="hidden"
              name="transac_products_name"
              :value="resForm.transac_products_name"
            >
            <input
              type="hidden"
              name="transac_amount"
              :value="resForm.transac_amount"
            >
            <input
              type="hidden"
              name="transac_currency_code"
              :value="resForm.transac_currency_code"
            >
            <input
              type="hidden"
              name="customer_ip"
              :value="resForm.customer_ip"
            >
            <input
              type="hidden"
              name="merchant_data1"
              :value="resForm.merchant_data1"
            >
            <input
              type="hidden"
              name="merchant_url_return"
              :value="resForm.merchant_url_return"
            >
            <input
              type="hidden"
              name="merchant_url_callback"
              :value="resForm.merchant_url_callback"
            >
            <input
              type="hidden"
              name="transac_cc_type"
              :value="resForm.transac_cc_type"
            >
            <input
              type="hidden"
              name="transac_cc_number"
              :value="resForm.transac_cc_number"
            >
            <input
              type="hidden"
              name="transac_cc_month"
              :value="resForm.transac_cc_month"
            >
            <input
              type="hidden"
              name="transac_cc_year"
              :value="resForm.transac_cc_year"
            >
            <input
              type="hidden"
              name="transac_cc_cvc"
              :value="resForm.transac_cc_cvc"
            >
          </template>
          <template v-if="paymentProcessor === misterpayIdx">
            <input type="hidden" name="data" :value="resForm.masked">
            <input type="hidden" name="Email" :value="resForm.email">
            <input type="hidden" name="Amount" :value="resForm.amount">
            <input type="hidden" name="Currency" :value="resForm.currency">
            <input
              type="hidden"
              name="TemplateId"
              :value="resForm.TemplateId"
            >
            <input
              type="hidden"
              name="CountryISO"
              :value="resForm.CountryISO"
            >
            <input
              type="hidden"
              name="MerchantInternalOrderId"
              :value="resForm.MerchantInternalOrderId"
            >
            <input type="hidden" name="StatusURL" :value="resForm.StatusURL">
            <input type="hidden" name="ReturnURL" :value="resForm.ReturnURL">
            <input
              type="hidden"
              name="AssetPaymentsKey"
              :value="resForm.AssetPaymentsKey"
            >
          </template>
          <template v-if="paymentProcessor === fastCloudpayIdx">
            <input type="hidden" name="merNo" :value="resForm.merNo">
            <input type="hidden" name="gatewayNo" :value="resForm.gatewayNo">
            <input type="hidden" name="orderNo" :value="resForm.orderNo">
            <input type="hidden" name="notifyUrl" :value="resForm.notifyUrl">
            <input type="hidden" name="returnUrl" :value="resForm.returnUrl">
            <input
              type="hidden"
              name="orderCurrency"
              :value="resForm.orderCurrency"
            >
            <input
              type="hidden"
              name="orderAmount"
              :value="resForm.orderAmount"
            >
            <input type="hidden" name="cardNo" :value="resForm.cardNo">
            <input
              type="hidden"
              name="cardExpireMonth"
              :value="resForm.cardExpireMonth"
            >
            <input
              type="hidden"
              name="cardExpireYear"
              :value="resForm.cardExpireYear"
            >
            <input
              type="hidden"
              name="cardSecurityCode"
              :value="resForm.cardSecurityCode"
            >
            <input type="hidden" name="firstName" :value="resForm.firstName">
            <input type="hidden" name="lastName" :value="resForm.lastName">
            <input type="hidden" name="email" :value="resForm.email">
            <input type="hidden" name="phone" :value="resForm.phone">
            <input type="hidden" name="country" :value="resForm.country">
            <input type="hidden" name="state" :value="resForm.state">
            <input type="hidden" name="city" :value="resForm.city">
            <input type="hidden" name="address" :value="resForm.address">
            <input type="hidden" name="zip" :value="resForm.zip">
            <input type="hidden" name="goodsInfo" :value="resForm.goodsInfo">
            <input type="hidden" name="signInfo" :value="resForm.signInfo">
            <input
              type="hidden"
              name="paymentMethod"
              :value="resForm.paymentMethod"
            >
          </template>
          <template v-if="paymentProcessor === oppeypayIdx">
            <input type="hidden" name="api_token" :value="resForm.api_token">
            <input
              type="hidden"
              name="website_id"
              :value="resForm.website_id"
            >
            <input type="hidden" name="cardsend" :value="resForm.cardsend">
            <input type="hidden" name="client_ip" :value="resForm.client_ip">
            <input type="hidden" name="action" :value="resForm.action">
            <input type="hidden" name="source" :value="resForm.source">
            <input
              type="hidden"
              name="source_url"
              :value="resForm.source_url"
            >
            <input type="hidden" name="price" :value="resForm.price">
            <input type="hidden" name="curr" :value="resForm.curr">
            <input
              type="hidden"
              name="product_name"
              :value="resForm.product_name"
            >
            <input type="hidden" name="ccholder" :value="resForm.ccholder">
            <input
              type="hidden"
              name="ccholder_lname"
              :value="resForm.ccholder_lname"
            >
            <input type="hidden" name="email" :value="resForm.email">
            <input
              type="hidden"
              name="bill_street_1"
              :value="resForm.bill_street_1"
            >
            <input type="hidden" name="bill_city" :value="resForm.bill_city">
            <input
              type="hidden"
              name="bill_state"
              :value="resForm.bill_state"
            >
            <input
              type="hidden"
              name="bill_country"
              :value="resForm.bill_country"
            >
            <input type="hidden" name="bill_zip" :value="resForm.bill_zip">

            <input
              type="hidden"
              name="bill_phone"
              :value="resForm.bill_phone"
            >
            <input type="hidden" name="id_order" :value="resForm.id_order">
            <input
              type="hidden"
              name="notify_url"
              :value="resForm.notify_url"
            >
            <input
              type="hidden"
              name="success_url"
              :value="resForm.success_url"
            >
            <input type="hidden" name="error_url" :value="resForm.error_url">
          </template>
          <template v-if="paymentProcessor === epayIdx">
            <input type="hidden" name="payload" :value="resForm.payload">
            <input
              type="hidden"
              name="merchant_id"
              :value="resForm.merchant_id"
            >
          </template>
          <b-row>
            <b-col cols="12" class="py-2">
              <b-alert :show="cardError" variant="danger">
                {{ $t("wrong_card") }}
              </b-alert>
            </b-col>
            <b-col v-if="paymentProcessor != 21" cols="12">
              <b-form-group>
                <b-input-group>
                  <template v-slot:append>
                    <b-input-group-text>
                      <span class="text-primary">EUR</span>
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    v-model="depositAmount"
                    :state="checkDepositAmount"
                    :placeholder="$t('amount')"
                  />
                </b-input-group>
                <b-form-invalid-feedback :state="checkDepositAmount">
                  {{ $t("min_value", [minDepositAmount]) }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="promotion"
                  :state="isValidPromoCode"
                  debounce="500"
                  :placeholder="$tc('promo_code', 2)"
                  @change="validatePromoCodeAction"
                />
                <b-form-invalid-feedback :state="isValidPromoCode">
                  {{ $t("invalid_promo_code") }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <template v-if="selectedLogo === 9">
              <b-col cols="12">
                <b-form-group>
                  <v-select
                    v-model="coin"
                    label="$t('Select Your Coin')"
                    class="sign-select"
                    :options="coinList"
                    :placeholder="$t('Select Your Coin')"
                  />
                </b-form-group>
              </b-col>
            </template>
            <template
              v-if="
                paymentProcessor == bennupayIdx ||
                  paymentProcessor == eupaymentIdx
              "
            >
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.billingAddress.$model"
                    :state="cardValidState('billingAddress')"
                    :placeholder="$t('address')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("field_required") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.cardHolderName.$model"
                    :state="cardValidState('cardHolderName')"
                    :placeholder="$t('card_holder_name')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("field_required") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.cardNumber.$model"
                    :state="cardValidState('cardNumber')"
                    :placeholder="$t('card_number')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("enter_valid_card_number") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" lg="6" xl="6">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.cardExpireMonth.$model"
                    :state="cardValidState('cardExpireMonth')"
                    :placeholder="$t('month')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("enter_valid_value") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" lg="6" xl="6">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.cardExpireYear.$model"
                    :state="cardValidState('cardExpireYear')"
                    :placeholder="$t('year')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("enter_valid_value") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.cardCVV.$model"
                    :state="cardValidState('cardCVV')"
                    :placeholder="$t('cvv')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("cvv_valid") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </template>
            <template
              v-if="
                paymentProcessor == fastCloudpayIdx ||
                paymentProcessor == greatpayIdx ||
                paymentProcessor == securepayIdx ||
                paymentProcessor == knoxpayIdx ||
                paymentProcessor == boomBillIdx ||
                paymentProcessor == stripeIdx ||
                paymentProcessor == sirpagaIdx ||
                paymentProcessor == kryptovaIdx
              "
            >
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.billingAddress.$model"
                    :state="cardValidState('billingAddress')"
                    :placeholder="$t('address')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("field_required") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.cardHolderName.$model"
                    :state="cardValidState('cardHolderName')"
                    :placeholder="$t('card_holder_name')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("field_required") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.cardNumber.$model"
                    :state="cardValidState('cardNumber')"
                    :placeholder="$t('card_number')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("enter_valid_card_number") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" lg="6" xl="6">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.cardExpireMonth.$model"
                    :state="cardValidState('cardExpireMonth')"
                    :placeholder="$t('month')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("enter_valid_value") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" lg="6" xl="6">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.cardExpireYear.$model"
                    :state="cardValidState('cardExpireYear')"
                    :placeholder="$t('year')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("enter_valid_value") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.cardForm.cardCVV.$model"
                    :state="cardValidState('cardCVV')"
                    :placeholder="$t('cvv')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t("cvv_valid") }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </template>
          </b-row>
          <b-row class="my-3">
            <b-col cols="12">
              <b-card bg-variant="light">
                <template #header>
                  <h6 class="text-info text-uppercase mb-0">
                    {{ $t("credit_card") }}
                  </h6>
                </template>
                <b-card-text>
                  <b-row>
                    <b-col cols="12" class="py-2">
                      <template v-for="processor in processorList">
                        <template v-if="processor.value != 3">
                          <b-img
                            :key="processor.value"
                            :src="processor.image"
                            height="70"
                            class="p-1"
                            :class="
                              selectedLogo == processor.value
                                ? 'border border-white'
                                : ''
                            "
                            style="cursor: pointer"
                            @click="selectLogo(processor.value)"
                          />
                        </template>
                        <template v-else>
                          <b-img
                            :key="processor.value"
                            src="/payment_processor/instant-trsansfer.png"
                            height="70"
                            class="p-1"
                            :class="
                              selectedLogo == 2 ? 'border border-white' : ''
                            "
                            style="cursor: pointer"
                            @click="selectLogo(2)"
                          />
                        </template>
                      </template>
                    </b-col>
                    <b-col cols="12">
                      <b-row>
                        <b-col cols="12" md="6" lg="6" xl="6" class="py-1">
                          <v-select
                            v-if="selectedLogo === 1"
                            v-model="paymentProcessor"
                            :reduce="(lan) => lan.value"
                            label="text"
                            class="sign-select"
                            :options="fakeProcessorList"
                            :clearable="false"
                            :searchable="false"
                          >
                            <template slot="no-options">
                              {{ $t("no_match_options") }}
                            </template>
                          </v-select>
                          <v-select
                            v-else
                            v-model="paymentProcessor"
                            :reduce="(lan) => lan.value"
                            label="text"
                            class="sign-select"
                            :options="fakeProcessorList"
                            :clearable="false"
                            :searchable="false"
                          >
                            <template slot="no-options">
                              {{ $t("no_match_options") }}
                            </template>
                          </v-select>
                        </b-col>
                        <b-col
                          v-if="processorList.length > 0"
                          cols="12"
                          md="6"
                          lg="6"
                          xl="6"
                          class="
                            d-flex
                            align-items-center
                            justify-content-start
                            py-1
                          "
                        >
                          <b-button
                            v-if="
                              paymentProcessor == eupaymentIdx ||
                              paymentProcessor == fastCloudpayIdx ||
                              paymentProcessor == greatpayIdx ||
                              paymentProcessor == securepayIdx ||
                              paymentProcessor == knoxpayIdx ||
                              paymentProcessor == boomBillIdx ||
                              paymentProcessor == stripeIdx ||
                              paymentProcessor == sirpagaIdx ||
                              paymentProcessor == kryptovaIdx
                            "
                            pill
                            size="sm"
                            variant="secondary text-dark"
                            class="orange-btn mx-2"
                            @click="onSubmitPayment"
                          >
                            {{ $t("deposit") }}
                          </b-button>
                          <b-button
                            v-else
                            pill
                            size="sm"
                            variant="secondary text-dark"
                            class="orange-btn mx-2"
                            @click="clickPayment"
                          >
                            {{ $t("deposit") }}
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  alphaNum,
  maxLength,
  minLength,
  numeric,
  required
} from 'vuelidate/lib/validators'
import common from '~/mixins/common'

export default {
  mixins: [validationMixin, common],
  data: () => ({
    loading: false,
    isWrongOldPassword: false,
    isSuccess: false,
    depositAmount: 50,
    minDepositAmount: 10,
    promotion: '',
    processorList: [],
    fakeProcessorList: [],
    paymentProcessor: '',
    coin: '',
    coinList: [
      'BTC',
      'BTC.LN',
      'BCH',
      'LTC',
      'VLX',
      '1GOLD',
      'AEG',
      'artTAC',
      'ASK',
      'BAD',
      'banTAC',
      'BCN',
      'BEAM',
      'BFT',
      'BNB',
      'BNB.ERC20',
      'BSV',
      'BTG',
      'BTT',
      'BUSD',
      'CBUCKS',
      'CLOAK',
      'COM',
      'CREDIT',
      'CRW',
      'CURE',
      'DAI',
      'DASH'
    ],
    isValidPromoCode: true,
    showWireTransfer: false,
    cardError: false,
    cardForm: {
      billingAddress: null,
      cardHolderName: null,
      cardNumber: null,
      cardExpireMonth: null,
      cardExpireYear: null,
      cardCVV: null
    },
    bankTransferIdx: 2,
    payopIdx: 3,
    webpaymentIdx: 4,
    eupaymentIdx: 5,
    bitcobrokersIdx: 6,
    bennupayIdx: 7,
    bitpayIdx: 8,
    coinpayIdx: 9,
    cryptopayIdx: 10,
    cryptopay1Idx: 11,
    cryptopay2Idx: 12,
    cryptopay3Idx: 13,
    cryptopay4Idx: 14,
    cryptopay5Idx: 15,
    cryptopay6Idx: 16,
    cryptopay7Idx: 17,
    oobitpayIdx: 18,
    misterpayIdx: 19,
    cryptopay8Idx: 20,
    keypayIdx: 21,
    payIdx: 22,
    neopayIdx: 23,
    realpayIdx: 24,
    paytechnopayIdx: 25,
    payopGlobalCardsIdx: 26,
    payopPerfectMoneyIdx: 27,
    payopUnitedKingdomBankIdx: 28,
    payopTrustlyIdx: 29,
    bpWalletpayIdx: 50,
    impayapayIdx: 31,
    fastCloudpayIdx: 32,
    astropayIdx: 33,
    oppeypayIdx: 34,
    epayIdx: 35,
    prismpayIdx: 36,
    greatpayIdx: 37,
    pickSellPayIdx: 38,
    payTriotPayIdx: 39,
    chargeMoneyIdx: 40,
    securepayIdx: 41,
    knoxpayIdx: 42,
    payStackIdx: 43,
    boomBillIdx: 44,
    blackRabbitIdx: 45,
    stripeIdx: 46,
    sirpagaIdx: 47,
    vegaahIdx: 48,
    pwclickIdx: 49,
    kryptovaIdx: 51,
    resForm: {},
    selectedLogo: 25,
    buttonDepositClicked: false
  }),
  validations: {
    cardForm: {
      billingAddress: {
        required,
        minLength: minLength(5)
      },
      cardHolderName: {
        required
      },
      cardNumber: {
        required,
        numeric
      },
      cardExpireMonth: {
        required,
        alphaNum,
        maxLength: maxLength(2)
      },
      cardExpireYear: {
        required,
        alphaNum,
        minLength: minLength(4),
        maxLength: maxLength(4)
      },
      cardCVV: {
        required,
        numeric,
        minLength: minLength(3),
        maxLength: maxLength(4)
      }
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      'loggedUser',
      'getBonusCode',
      'getCountryCode',
      'getIP'
    ]),
    checkDepositAmount () {
      return this.depositAmount >= this.minDepositAmount
    }
  },
  watch: {
    paymentProcessor () {
      if (
        this.paymentProcessor === this.bennupayIdx &&
        this.loggedIn &&
        this.loggedUser
      ) {
        this.cardForm.cardHolderName =
          this.loggedUser.first_name + ' ' + this.loggedUser.last_name
      }
      this.processorList.forEach((processor, index) => {
        if (processor.value === this.paymentProcessor) {
          this.minDepositAmount =
            'min_deposit' in processor.setting
              ? processor.setting.min_deposit
              : 10
          this.minDepositAmount = parseInt(this.minDepositAmount)
        }
      })
    }
  },
  async mounted () {
    if (this.$route.query.payop) {
      const data = await this.getFinancialTransaction({
        $axios: this.$axios,
        params: {
          tx_id: this.$route.query.txid ? this.$route.query.txid : '',
          invoice_id: this.$route.query.invoiceId
            ? this.$route.query.invoiceId
            : ''
        }
      })
      if (data.status === 1) {
        if (this.$route.query.payop === 'success') {
          this.$bvToast.toast(
            this.$t('deposit_success', [
              this.$options.filters.currencyFormat(data.transaction.amount)
            ]),
            {
              variant: 'success',
              appendToast: true,
              toaster: 'b-toaster-top-right',
              noCloseButton: true,
              autoHideDelay: 3500,
              solid: true
            }
          )
        } else if (this.$route.query.payop === 'fail') {
          this.$bvToast.toast(
            this.$t('deposit_fail', [
              this.$options.filters.currencyFormat(data.transaction.amount)
            ]),
            {
              variant: 'danger',
              appendToast: true,
              toaster: 'b-toaster-top-right',
              noCloseButton: true,
              autoHideDelay: 3500,
              solid: true
            }
          )
          this.cardError = true
        }
      }
    }
    if (this.$route.query.eupayment) {
      const data = await this.getEUPaymentFinancialTransaction({
        $axios: this.$axios,
        params: {
          playerId: this.loggedUser.id
        }
      })
      if (data.status === 1 && data.transaction.status === 'complete') {
        this.cardError = false
      } else {
        this.cardError = true
      }
    }
    if (this.loggedIn && this.loggedUser) {
      this.sockets.subscribe(
        `deposit_result_${this.loggedUser.id}`,
        (payload) => {
          if (payload.status === 0) {
            this.cardError = true
          } else {
            this.cardError = false
          }
        }
      )
    }
    this.promotion = this.getBonusCode
    await this.getPaymentProcessorAction()
  },
  methods: {
    ...mapActions([
      'setGamePlayStatus',
      'setManagementTab',
      'setMainLoading',
      'setActivePage',
      'setBalanceInfo',
      'setBonusCode'
    ]),
    ...mapActions('bonus', ['validatePromoCode']),
    ...mapActions('payment', [
      'getBitcoBrokerUrl',
      'getBitpayUrl',
      'getCoinpayUrl',
      'getCryptopayUrl',
      'getKeypayUrl',
      'getPayUrl',
      'getBennupay',
      'getPayopUrl',
      'getNeopayUrl',
      'getRealpayUrl',
      'getPaytechnopayUrl',
      'getFastcloudpayUrl',
      'getImpayapayUrl',
      'getBpwalletpayUrl',
      'getAstropayUrl',
      'getOppeypayUrl',
      'getEuPaymentFormData',
      'getOobitpayUrl',
      'getEpayUrl',
      'getPrismpayUrl',
      'getMisterpayUrl',
      'getGreatpayUrl',
      'getPickSellPayUrl',
      'getPayTriotPayUrl',
      'getChargeMoneyUrl',
      'getClientIP',
      'getSecurepayUrl',
      'getKnoxpayUrl',
      'getPaystackUrl',
      'getBoomBillUrl',
      'getBlackRabbitUrl',
      'getStripeUrl',
      'getSirpagaUrl',
      'getVegaahUrl',
      'getPwclickUrl',
      'getKryptovaUrl'
    ]),
    ...mapActions('paymentProcessor', ['getPaymentProcessors']),
    ...mapActions('financialTransaction', [
      'getFinancialTransaction',
      'getEUPaymentFinancialTransaction'
    ]),
    cardValidState (name) {
      const { $dirty, $error } = this.$v.cardForm[name]
      return $dirty ? !$error : null
    },
    async getPaymentProcessorAction () {
      const data = await this.getPaymentProcessors({
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
        let versionCode = 1
        data.processors.forEach((processor, index) => {
          let image =
            '/payment_processor/visa-mastercard-v' + versionCode + '.png'
          if (processor.id === this.bitpayIdx) {
            image = '/payment_processor/bitcoin.png'
          }
          if (processor.id === this.coinpayIdx) {
            image = '/payment_processor/bitcoin.png'
          }
          if (processor.id === this.oobitpayIdx) {
            image = '/payment_processor/oobitpay.png'
          }
          if (processor.id === this.misterpayIdx) {
            image = '/payment_processor/misterpay.png'
          }
          if (processor.id === this.cryptopayIdx) {
            image = '/payment_processor/neosurf.png'
          }
          if (processor.id === this.cryptopay1Idx) {
            image = '/payment_processor/giropay.png'
          }
          if (processor.id === this.cryptopay2Idx) {
            image = '/payment_processor/multibanco.png'
          }
          if (processor.id === this.cryptopay3Idx) {
            image = '/payment_processor/bancontact.png'
          }
          if (processor.id === this.cryptopay4Idx) {
            image = '/payment_processor/epay.png'
          }
          if (processor.id === this.cryptopay5Idx) {
            image = '/payment_processor/eps.png'
          }
          if (processor.id === this.cryptopay6Idx) {
            image = '/payment_processor/euteller.png'
          }
          if (processor.id === this.cryptopay7Idx) {
            image = '/payment_processor/sofort.png'
          }
          if (processor.id === this.cryptopay8Idx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.keypayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.payIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.neopayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.pickSellPayIdx) {
            image =
              '/payment_processor/picksellpay.png'
          }
          if (processor.id === this.chargeMoneyIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
          }
          if (processor.id === this.kryptovaIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
          }
          if (processor.id === this.blackRabbitIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
          }
          if (processor.id === this.vegaahIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
          }
          if (processor.id === this.pwclickIdx) {
            image =
              '/payment_processor/bank-transfer.png'
          }
          if (processor.id === this.stripeIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
          }
          if (processor.id === this.sirpagaIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
          }
          if (processor.id === this.payStackIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
          }
          if (processor.id === this.boomBillIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
          }
          if (processor.id === this.payTriotPayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
          }
          if (processor.id === this.realpayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.paytechnopayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.impayapayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.payopGlobalCardsIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.epayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.prismpayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.greatpayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.securepayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.knoxpayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.payopTrustlyIdx) {
            image = '/payment_processor/trustly.png'
          }
          if (processor.id === this.payopUnitedKingdomBankIdx) {
            image = '/payment_processor/united-kingdom-bank.png'
          }
          if (processor.id === this.payopPerfectMoneyIdx) {
            image = '/payment_processor/perfect-money.png'
          }
          if (processor.id === this.fastCloudpayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.bpWalletpayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.payopIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.bankTransferIdx) {
            image = '/payment_processor/bank-transfer.png'
          }
          if (processor.id === this.webpaymentIdx) {
            image = '/payment_processor/advcash.png'
          }
          if (processor.id === this.bennupayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id === this.eupaymentIdx) {
            image = '/payment_processor/visa-mastercard-v' + '6' + '.png'
          }
          if (processor.id === this.astropayIdx) {
            image = '/payment_processor/astropay.png'
            versionCode++
          }
          if (processor.id === this.oppeypayIdx) {
            image =
              '/payment_processor/visa-mastercard-v' + versionCode + '.png'
            versionCode++
          }
          if (processor.id !== 2) {
            let setting = {}
            if (processor.setting != null) {
              if (this.$config.IS_DEV === 'development') {
                setting = JSON.parse(processor.setting)
              } else {
                setting = JSON.parse(JSON.stringify(processor.setting))
              }
            }
            this.processorList.push({
              text: processor.name,
              value: processor.id,
              setting,
              image
            })
          }
        })
        this.minDepositAmount =
          'min_deposit' in this.processorList[0].setting
            ? this.processorList[0].setting.min_deposit
            : 10
        this.minDepositAmount = parseInt(this.minDepositAmount)
        await this.selectLogo(this.processorList[0].value)
      }
    },
    async validatePromoCodeAction (value) {
      if (value === null || value.length === 0) {
        this.isValidPromoCode = true
        return this.isValidPromoCode
      }
      try {
        const data = await this.validatePromoCode({
          $axios: this.$axios,
          params: {
            promo_code: value
          }
        })
        if (data.status === 0) {
          this.isValidPromoCode = false
        } else {
          this.isValidPromoCode = true
        }
      } catch (e) {
        this.isValidPromoCode = false
      }
      return this.isValidPromoCode
    },
    async onSubmitPayment () {
      if (this.processorList.length === 0) {
        return
      }
      if (this.buttonDepositClicked && (this.paymentProcessor === this.greatpayIdx || this.paymentProcessor === this.securepayIdx || this.paymentProcessor === this.knoxpayIdx || this.paymentProcessor === this.boomBillIdx || this.paymentProcessor === this.stripeIdx || this.paymentProcessor === this.sirpagaIdx || this.paymentProcessor === this.kryptovaIdx)) {
        return;
      }
      if (
        this.paymentProcessor === this.eupaymentIdx ||
        this.paymentProcessor === this.fastCloudpayIdx ||
        this.paymentProcessor === this.greatpayIdx ||
        this.paymentProcessor === this.securepayIdx ||
        this.paymentProcessor === this.knoxpayIdx ||
        this.paymentProcessor === this.boomBillIdx ||
        this.paymentProcessor === this.stripeIdx ||
        this.paymentProcessor === this.sirpagaIdx ||
        this.paymentProcessor === this.kryptovaIdx
      ) {
        this.$v.cardForm.$touch()
      }
      if (
        this.paymentProcessor === this.eupaymentIdx &&
        this.isValidPromoCode &&
        this.depositAmount >= this.minDepositAmount &&
        !this.$v.cardForm.$anyError
      ) {
        this.loading = true
        this.buttonDepositClicked = true;
        const data = await this.getEuPaymentFormData({
          $axios: this.$axios,
          params: {
            amount: this.depositAmount,
            promotion: this.promotion,
            ip: this.getIP,
            playerId: this.loggedUser.id,
            cardForm: this.cardForm
          }
        })
        if (data.status === 1) {
          this.cardError = false
          this.buttonDepositClicked = false
          this.loading = false
          if ('isDirectResult' in data && data.isDirectResult === false) {
            window.location = data.redirectUrl
          }
        } else {
          this.buttonDepositClicked = false
          this.cardError = true
          this.loading = false
        }
        this.setMainLoading(false)
      }
      if (
        this.paymentProcessor === this.fastCloudpayIdx &&
        this.isValidPromoCode &&
        this.depositAmount >= this.minDepositAmount &&
        !this.$v.cardForm.$anyError
      ) {
        const data = await this.getFastcloudpayUrl({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            promotion: this.promotion,
            amount: this.depositAmount,
            cardForm: this.cardForm
          }
        })
        if (data.status === 1) {
          this.resForm = {}
          this.resForm = data.cardForm
          this.$refs.submitForm.action = data.redirect_url
          await this.sleep(500)
          this.$refs.submitForm.submit()
        } else {
          this.cardError = true
        }
        this.setMainLoading(false)
      }
      if (
        this.paymentProcessor === this.greatpayIdx &&
        this.isValidPromoCode &&
        this.depositAmount >= this.minDepositAmount &&
        !this.$v.cardForm.$anyError
      ) {
        this.buttonDepositClicked = true;
        const data = await this.getGreatpayUrl({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            promotion: this.promotion,
            amount: this.depositAmount,
            cardForm: this.cardForm
          }
        })
        if (data.status === 1) {
          this.cardError = false
          this.buttonDepositClicked = false
          window.location = data.redirect_url
        } else {
          this.buttonDepositClicked = false
          this.cardError = true
        }
        this.setMainLoading(false)
      }
      if (
        this.paymentProcessor === this.securepayIdx &&
        this.isValidPromoCode &&
        this.depositAmount >= this.minDepositAmount &&
        !this.$v.cardForm.$anyError
      ) {
        this.loading = true
        this.buttonDepositClicked = true;
        const clientIP = await this.getClientIP({
          $axios: this.$axios,
          params: {}
        });
        const data = await this.getSecurepayUrl({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            promotion: this.promotion,
            amount: this.depositAmount,
            cardForm: this.cardForm,
            clientIP
          }
        })
        if (data.status === 1) {
          if (data.cardForm) {
            const myWindow = window.open('', '_self');
            myWindow.document.write(data.cardForm);
          } else {
            this.cardError = false
            this.buttonDepositClicked = false
            window.location = data.redirect_url
          }
          this.loading = false
        } else {
          this.buttonDepositClicked = false
          this.cardError = true
          this.loading = false
        }
        this.setMainLoading(false)
      }
      if (
        this.paymentProcessor === this.knoxpayIdx &&
        this.isValidPromoCode &&
        this.depositAmount >= this.minDepositAmount &&
        !this.$v.cardForm.$anyError
      ) {
        this.loading = true
        this.buttonDepositClicked = true;
        const clientIP = await this.getClientIP({
          $axios: this.$axios,
          params: {}
        });
        const data = await this.getKnoxpayUrl({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            promotion: this.promotion,
            amount: this.depositAmount,
            cardForm: this.cardForm,
            clientIP
          }
        })
        if (data.status === 1) {
          this.cardError = false
          this.buttonDepositClicked = false
          window.location = data.redirect_url
          this.loading = false
        } else {
          this.buttonDepositClicked = false
          this.cardError = true
          this.loading = false
        }
        this.setMainLoading(false)
      }
      if (
        this.paymentProcessor === this.boomBillIdx &&
        this.isValidPromoCode &&
        this.depositAmount >= this.minDepositAmount &&
        !this.$v.cardForm.$anyError
      ) {
        this.loading = true
        this.buttonDepositClicked = true;
        const clientIP = await this.getClientIP({
          $axios: this.$axios,
          params: {}
        });
        const data = await this.getBoomBillUrl({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            promotion: this.promotion,
            amount: this.depositAmount,
            cardForm: this.cardForm,
            clientIP
          }
        })
        if (data.status === 1) {
          this.cardError = false
          this.buttonDepositClicked = false
          window.location = data.redirect_url
          this.loading = false
        } else {
          this.buttonDepositClicked = false
          this.cardError = true
          this.loading = false
        }
        this.setMainLoading(false)
      }
      if (
        this.paymentProcessor === this.stripeIdx &&
        this.isValidPromoCode &&
        this.depositAmount >= this.minDepositAmount &&
        !this.$v.cardForm.$anyError
      ) {
        this.loading = true
        this.buttonDepositClicked = true;
        const clientIP = await this.getClientIP({
          $axios: this.$axios,
          params: {}
        });
        const data = await this.getStripeUrl({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            promotion: this.promotion,
            amount: this.depositAmount,
            cardForm: this.cardForm,
            clientIP
          }
        })
        if (data.status === 1) {
          this.cardError = false
          this.buttonDepositClicked = false
          window.location = data.redirect_url
          this.loading = false
        } else {
          this.buttonDepositClicked = false
          this.cardError = true
          this.loading = false
        }
        this.setMainLoading(false)
      }
      if (
        this.paymentProcessor === this.sirpagaIdx &&
        this.isValidPromoCode &&
        this.depositAmount >= this.minDepositAmount &&
        !this.$v.cardForm.$anyError
      ) {
        this.loading = true
        this.buttonDepositClicked = true;
        const clientIP = await this.getClientIP({
          $axios: this.$axios,
          params: {}
        });
        const data = await this.getSirpagaUrl({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            promotion: this.promotion,
            amount: this.depositAmount,
            cardForm: this.cardForm,
            clientIP
          }
        })
        if (data.status === 1) {
          this.cardError = false
          this.buttonDepositClicked = false
          window.location = data.redirect_url
          this.loading = false
        } else {
          this.buttonDepositClicked = false
          this.cardError = true
          this.loading = false
        }
        this.setMainLoading(false)
      }
      if (
        this.paymentProcessor === this.kryptovaIdx &&
        this.isValidPromoCode &&
        this.depositAmount >= this.minDepositAmount &&
        !this.$v.cardForm.$anyError
      ) {
        this.loading = true
        this.buttonDepositClicked = true;
        const clientIP = await this.getClientIP({
          $axios: this.$axios,
          params: {}
        });
        const data = await this.getKryptovaUrl({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            promotion: this.promotion,
            amount: this.depositAmount,
            cardForm: this.cardForm,
            clientIP
          }
        })
        if (data.status === 1) {
          this.cardError = false
          this.buttonDepositClicked = false
          window.location = data.redirect_url
          this.loading = false
        } else {
          this.buttonDepositClicked = false
          this.cardError = true
          this.loading = false
        }
        this.setMainLoading(false)
      }
    },
    async clickPayment () {
      if (this.processorList.length === 0) {
        return
      }
      if (this.paymentProcessor === this.bennupayIdx) {
        this.$v.cardForm.$touch()
      }
      if (
        this.isValidPromoCode &&
        this.depositAmount >= this.minDepositAmount &&
        !this.$v.cardForm.$anyError
      ) {
        this.setMainLoading(true)
        if (this.paymentProcessor === this.cryptopayIdx) {
          const paymentMethod = 'NeoSurf'
          const data = await this.getCryptopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.cryptopay1Idx) {
          const paymentMethod = 'Giropay'
          const data = await this.getCryptopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.cryptopay2Idx) {
          const paymentMethod = 'Multibanco'
          const data = await this.getCryptopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.cryptopay3Idx) {
          const paymentMethod = 'Mistercash'
          const data = await this.getCryptopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.cryptopay4Idx) {
          const paymentMethod = 'ePay'
          const data = await this.getCryptopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.cryptopay5Idx) {
          const paymentMethod = 'EPS'
          const data = await this.getCryptopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.cryptopay6Idx) {
          const paymentMethod = 'euteller'
          const data = await this.getCryptopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.cryptopay7Idx) {
          const paymentMethod = 'Sofort'
          const data = await this.getCryptopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.cryptopay8Idx) {
          const paymentMethod = 'crypto'
          const data = await this.getCryptopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.keypayIdx) {
          const data = await this.getKeypayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.payIdx) {
          const data = await this.getPayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.neopayIdx) {
          const data = await this.getNeopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.chargeMoneyIdx) {
          const clientIP = await this.getClientIP({
            $axios: this.$axios,
            params: {}
          });
          const data = await this.getChargeMoneyUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount,
              clientIP
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.blackRabbitIdx) {
          const clientIP = await this.getClientIP({
            $axios: this.$axios,
            params: {}
          });
          const data = await this.getBlackRabbitUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount,
              clientIP
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.vegaahIdx) {
          const clientIP = await this.getClientIP({
            $axios: this.$axios,
            params: {}
          });
          const data = await this.getVegaahUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount,
              clientIP
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.pwclickIdx) {
          const clientIP = await this.getClientIP({
            $axios: this.$axios,
            params: {}
          });
          const data = await this.getPwclickUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount,
              clientIP
            }
          })
          if (data.status === 1) {
            window.open(data.redirect_url, "Pay With PwClick", "height=440,width=500");
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.payStackIdx) {
          const clientIP = await this.getClientIP({
            $axios: this.$axios,
            params: {}
          });
          const data = await this.getPaystackUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount,
              clientIP
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.pickSellPayIdx) {
          const data = await this.getPickSellPayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.payTriotPayIdx) {
          const data = await this.getPayTriotPayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.realpayIdx) {
          const data = await this.getRealpayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.paytechnopayIdx) {
          const data = await this.getPaytechnopayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.impayapayIdx) {
          const data = await this.getImpayapayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.prismpayIdx) {
          const data = await this.getPrismpayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.epayIdx) {
          const data = await this.getEpayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            this.resForm = {}
            this.resForm = data.cardForm
            this.$refs.submitForm.action = data.redirect_url
            await this.sleep(500)
            this.$refs.submitForm.submit()
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.bpWalletpayIdx) {
          const data = await this.getBpwalletpayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.astropayIdx) {
          const data = await this.getAstropayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.oppeypayIdx) {
          const data = await this.getOppeypayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              promotion: this.promotion,
              amount: this.depositAmount
            }
          })
          if (data.status === 1) {
            this.resForm = {}
            this.resForm = data.cardForm
            this.$refs.submitForm.action = data.redirect_url
            await this.sleep(500)
            this.$refs.submitForm.submit()
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.coinpayIdx) {
          const data = await this.getCoinpayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              coin: this.coin
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.bitpayIdx) {
          const data = await this.getBitpayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.oobitpayIdx) {
          const data = await this.getOobitpayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.misterpayIdx) {
          const data = await this.getMisterpayUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion
            }
          })
          if (data.status === 1) {
            this.resForm = {}
            this.resForm = data.cardForm
            this.$refs.submitForm.action = data.redirect_url
            await this.sleep(500)
            this.$refs.submitForm.submit()
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.payopIdx) {
          const data = await this.getPayopUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod: 0
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.bankTransferIdx) {
          const data = await this.getPayopUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod: 0
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.webpaymentIdx) {
          const data = await this.getPayopUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod: 0
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.payopGlobalCardsIdx) {
          const data = await this.getPayopUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod: 381
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.payopPerfectMoneyIdx) {
          const data = await this.getPayopUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod: 763
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.payopUnitedKingdomBankIdx) {
          const data = await this.getPayopUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod: 0
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.payopTrustlyIdx) {
          const data = await this.getPayopUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              paymentMethod: 0
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        } else if (this.paymentProcessor === this.bitcobrokersIdx) {
          this.popWindow = window.open('', '_blank')
          const data = await this.getBitcoBrokerUrl({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion
            }
          })
          if (data.status === 1) {
            this.popWindow.location = data.redirect_url
            this.popWindow.focus()
          }
        } else if (this.paymentProcessor === this.bennupayIdx) {
          const data = await this.getBennupay({
            $axios: this.$axios,
            params: {
              playerId: this.loggedUser.id,
              amount: this.depositAmount,
              promotion: this.promotion,
              cardForm: this.cardForm
            }
          })
          if (data.status === 1) {
            this.cardError = false
            window.location = data.redirect_url
          } else {
            this.cardError = true
          }
          this.setMainLoading(false)
        }
      }
    },
    clickBankTransferAction () {
      this.showWireTransfer = !this.showWireTransfer
    },
    selectLogo (idx) {
      this.selectedLogo = idx
      if (this.selectedLogo === 51) {
        this.fakeProcessorList = [
          {
            text: 'Kryptova',
            value: this.kryptovaIdx
          }
        ]
        this.paymentProcessor = this.kryptovaIdx
      } else if (this.selectedLogo === 50) {
        this.fakeProcessorList = [
          {
            text: 'BPWallet',
            value: this.bpWalletpayIdx
          }
        ]
        this.paymentProcessor = this.bpWalletpayIdx
      } else if (this.selectedLogo === 49) {
        this.fakeProcessorList = [
          {
            text: 'PwClick',
            value: this.pwclickIdx
          }
        ]
        this.paymentProcessor = this.pwclickIdx
      } else if (this.selectedLogo === 48) {
        this.fakeProcessorList = [
          {
            text: 'Vegaah',
            value: this.vegaahIdx
          }
        ]
        this.paymentProcessor = this.vegaahIdx
      } else if (this.selectedLogo === 47) {
        this.fakeProcessorList = [
          {
            text: 'Sirpaga',
            value: this.sirpagaIdx
          }
        ]
        this.paymentProcessor = this.sirpagaIdx
      } else if (this.selectedLogo === 46) {
        this.fakeProcessorList = [
          {
            text: 'CCPay',
            value: this.stripeIdx
          }
        ]
        this.paymentProcessor = this.stripeIdx
      } else if (this.selectedLogo === 45) {
        this.fakeProcessorList = [
          {
            text: 'BlackRabbit',
            value: this.blackRabbitIdx
          }
        ]
        this.paymentProcessor = this.blackRabbitIdx
      } else if (this.selectedLogo === 44) {
        this.fakeProcessorList = [
          {
            text: 'Boombill',
            value: this.boomBillIdx
          }
        ]
        this.paymentProcessor = this.boomBillIdx
      } else if (this.selectedLogo === 43) {
        this.fakeProcessorList = [
          {
            text: 'PayStack',
            value: this.payStackIdx
          }
        ]
        this.paymentProcessor = this.payStackIdx
      } else if (this.selectedLogo === 42) {
        this.fakeProcessorList = [
          {
            text: 'Knoxpay',
            value: this.knoxpayIdx
          }
        ]
        this.paymentProcessor = this.knoxpayIdx
      } else if (this.selectedLogo === 41) {
        this.fakeProcessorList = [
          {
            text: 'Securepay',
            value: this.securepayIdx
          }
        ]
        this.paymentProcessor = this.securepayIdx
      } else if (this.selectedLogo === 40) {
        this.fakeProcessorList = [
          {
            text: 'ChargeMoney',
            value: this.chargeMoneyIdx
          }
        ]
        this.paymentProcessor = this.chargeMoneyIdx
      } else if (this.selectedLogo === 39) {
        this.fakeProcessorList = [
          {
            text: 'PayTriot',
            value: this.payTriotPayIdx
          }
        ]
        this.paymentProcessor = this.payTriotPayIdx
      } else if (this.selectedLogo === 38) {
        this.fakeProcessorList = [
          {
            text: 'PickSell',
            value: this.pickSellPayIdx
          }
        ]
        this.paymentProcessor = this.pickSellPayIdx
      } else if (this.selectedLogo === 37) {
        this.fakeProcessorList = [
          {
            text: 'Greatpay',
            value: this.greatpayIdx
          }
        ]
        this.paymentProcessor = this.greatpayIdx
      } else if (this.selectedLogo === 36) {
        this.fakeProcessorList = [
          {
            text: 'Prismpay',
            value: this.prismpayIdx
          }
        ]
        this.paymentProcessor = this.prismpayIdx
      } else if (this.selectedLogo === 35) {
        this.fakeProcessorList = [
          {
            text: 'ePay247',
            value: this.epayIdx
          }
        ]
        this.paymentProcessor = this.epayIdx
      } else if (this.selectedLogo === 34) {
        this.fakeProcessorList = [
          {
            text: 'Oppeypay',
            value: this.oppeypayIdx
          }
        ]
        this.paymentProcessor = this.oppeypayIdx
      } else if (this.selectedLogo === 33) {
        this.fakeProcessorList = [
          {
            text: 'Astropay',
            value: this.astropayIdx
          }
        ]
        this.paymentProcessor = this.astropayIdx
      } else if (this.selectedLogo === 32) {
        this.fakeProcessorList = [
          {
            text: 'FastCloud',
            value: this.fastCloudpayIdx
          }
        ]
        this.paymentProcessor = this.fastCloudpayIdx
      } else if (this.selectedLogo === 31) {
        this.fakeProcessorList = [
          {
            text: 'Impaya',
            value: this.impayapayIdx
          }
        ]
        this.paymentProcessor = this.impayapayIdx
      } else if (this.selectedLogo === 29) {
        this.fakeProcessorList = [
          {
            text: 'Trustly',
            value: this.payopTrustlyIdx
          }
        ]
        this.paymentProcessor = this.payopTrustlyIdx
      } else if (this.selectedLogo === 28) {
        this.fakeProcessorList = [
          {
            text: 'UnitedKingdomBank',
            value: this.payopUnitedKingdomBankIdx
          }
        ]
        this.paymentProcessor = this.payopUnitedKingdomBankIdx
      } else if (this.selectedLogo === 27) {
        this.fakeProcessorList = [
          {
            text: 'PerfectMoney',
            value: this.payopPerfectMoneyIdx
          }
        ]
        this.paymentProcessor = this.payopPerfectMoneyIdx
      } else if (this.selectedLogo === 26) {
        this.fakeProcessorList = [
          {
            text: 'GlobalCards',
            value: this.payopGlobalCardsIdx
          }
        ]
        this.paymentProcessor = this.payopGlobalCardsIdx
      } else if (this.selectedLogo === 25) {
        this.fakeProcessorList = [
          {
            text: 'Paytechnopay',
            value: this.paytechnopayIdx
          }
        ]
        this.paymentProcessor = this.paytechnopayIdx
      } else if (this.selectedLogo === 24) {
        this.fakeProcessorList = [
          {
            text: 'Realpay',
            value: this.realpayIdx
          }
        ]
        this.paymentProcessor = this.realpayIdx
      } else if (this.selectedLogo === 23) {
        this.fakeProcessorList = [
          {
            text: 'Neopay',
            value: this.neopayIdx
          }
        ]
        this.paymentProcessor = this.neopayIdx
      } else if (this.selectedLogo === 22) {
        this.fakeProcessorList = [
          {
            text: 'Pay',
            value: this.payIdx
          }
        ]
        this.paymentProcessor = this.payIdx
      } else if (this.selectedLogo === 21) {
        this.fakeProcessorList = [
          {
            text: 'Keypay',
            value: this.keypayIdx
          }
        ]
        this.paymentProcessor = this.keypayIdx
      } else if (this.selectedLogo === 20) {
        this.fakeProcessorList = [
          {
            text: 'Pay&Play',
            value: this.cryptopay8Idx
          }
        ]
        this.paymentProcessor = this.cryptopay8Idx
      } else if (this.selectedLogo === 19) {
        this.fakeProcessorList = [
          {
            text: 'Misterpay',
            value: this.misterpayIdx
          }
        ]
        this.paymentProcessor = this.misterpayIdx
      } else if (this.selectedLogo === 18) {
        this.fakeProcessorList = [
          {
            text: 'Oobit',
            value: this.oobitpayIdx
          }
        ]
        this.paymentProcessor = this.oobitpayIdx
      } else if (this.selectedLogo === 17) {
        this.fakeProcessorList = [
          {
            text: 'Sofort',
            value: this.cryptopay7Idx
          }
        ]
        this.paymentProcessor = this.cryptopay7Idx
      } else if (this.selectedLogo === 16) {
        this.fakeProcessorList = [
          {
            text: 'EUTeller',
            value: this.cryptopay6Idx
          }
        ]
        this.paymentProcessor = this.cryptopay6Idx
      } else if (this.selectedLogo === 15) {
        this.fakeProcessorList = [
          {
            text: 'EPS',
            value: this.cryptopay5Idx
          }
        ]
        this.paymentProcessor = this.cryptopay5Idx
      } else if (this.selectedLogo === 14) {
        this.fakeProcessorList = [
          {
            text: 'ePay',
            value: this.cryptopay4Idx
          }
        ]
        this.paymentProcessor = this.cryptopay4Idx
      } else if (this.selectedLogo === 13) {
        this.fakeProcessorList = [
          {
            text: 'Bancontact',
            value: this.cryptopay3Idx
          }
        ]
        this.paymentProcessor = this.cryptopay3Idx
      } else if (this.selectedLogo === 12) {
        this.fakeProcessorList = [
          {
            text: 'Multibanco',
            value: this.cryptopay2Idx
          }
        ]
        this.paymentProcessor = this.cryptopay2Idx
      } else if (this.selectedLogo === 11) {
        this.fakeProcessorList = [
          {
            text: 'Giropay',
            value: this.cryptopay1Idx
          }
        ]
        this.paymentProcessor = this.cryptopay1Idx
      } else if (this.selectedLogo === 10) {
        this.fakeProcessorList = [
          {
            text: 'NeoSurf',
            value: this.payopIdx
          }
        ]
        this.paymentProcessor = this.payopIdx
      } else if (this.selectedLogo === 9) {
        this.fakeProcessorList = [
          {
            text: 'Bitcoin',
            value: this.coinpayIdx
          }
        ]
        this.paymentProcessor = this.coinpayIdx
      } else if (this.selectedLogo === 8) {
        this.fakeProcessorList = [
          {
            text: 'Bitcoin',
            value: this.bitpayIdx
          }
        ]
        this.paymentProcessor = this.bitpayIdx
      } else if (this.selectedLogo === 7) {
        this.fakeProcessorList = [
          {
            text: 'Bennupay',
            value: this.bennupayIdx
          }
        ]
        this.paymentProcessor = this.bennupayIdx
      } else if (this.selectedLogo === 6) {
        this.fakeProcessorList = [
          {
            text: 'BitcoBrokers',
            value: this.bitcobrokersIdx
          }
        ]
        this.paymentProcessor = this.bitcobrokersIdx
      } else if (this.selectedLogo === 5) {
        this.fakeProcessorList = [
          {
            text: 'EUPayment',
            value: this.eupaymentIdx
          }
        ]
        this.paymentProcessor = this.eupaymentIdx
      } else if (this.selectedLogo === 4) {
        this.fakeProcessorList = [
          {
            text: 'Advcash',
            value: this.payopIdx
          }
        ]
        this.paymentProcessor = this.payopIdx
      } else if (this.selectedLogo === 3) {
        this.fakeProcessorList = [
          {
            text: 'Neosurf',
            value: this.payopIdx
          }
        ]
        this.paymentProcessor = this.payopIdx
      } else if (this.selectedLogo === 2) {
        this.fakeProcessorList = [
          {
            text: 'Instant Transfer',
            value: this.payopIdx
          }
        ]
        this.paymentProcessor = this.payopIdx
      }
    }
  }
}
</script>
