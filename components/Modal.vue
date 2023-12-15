<template>
  <div>
    <b-modal
      v-model="registerModal"
      class="custom-modal"
      size="lg"
      centered
      button-size="sm"
      hide-footer
      no-close-on-backdrop
      header-bg-variant="primary"
      header-text-variant="white"
      body-bg-variant="primary"
      body-text-variant="white"
      footer-bg-variant="primary"
      footer-text-variant="white"
    >
      <template v-slot:modal-header="{ close }">
        <h6 style="text-transform: uppercase">
          {{ $t('signup_now') }}
        </h6>
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="text-white"
          style="cursor: pointer;"
          @click="close()"
        />
      </template>
      <b-overlay
        :show="modalLoading"
        spinner-variant="secondary"
        opacity="0"
        no-wrap
      />
      <b-form class="px-3" @keyup.enter="registerAction">
        <b-row cols="1" cols-md="2" cols-lg="2" cols-xl="2">
          <b-col>
            <b-form-row>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.registerForm.username.$model"
                    :state="RegisterValidateState('username')"
                    :placeholder="$t('username')"
                    debounce="500"
                    @change="updateUsername"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-invalid-feedback :state="!isDuplicatedUser">
                  {{ $t('username_duplicated') }}
                </b-form-invalid-feedback>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.registerForm.password.$model"
                    type="password"
                    :state="RegisterValidateState('password')"
                    :placeholder="$t('password')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('password_validation') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.registerForm.confirmPassword.$model"
                    type="password"
                    :state="RegisterValidateState('confirmPassword')"
                    :placeholder="$t('confirm_password')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('confirm_password_validation') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.registerForm.email.$model"
                    type="email"
                    :state="RegisterValidateState('email')"
                    :placeholder="$tc('email_address', 1)"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('email_validation') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-row>
                    <b-col cols="5" class="pr-0">
                      <v-select
                        v-model="registerForm.countryPhone"
                        label="text"
                        class="sign-select"
                        :options="countryPhoneList"
                        :get-option-label="phone => '(' + phone.value + ')'"
                        :clearable="false"
                      >
                        <template v-slot:option="{text, value}">
                          {{ text + ' (' + value + ')' }}
                        </template>
                        <template slot="no-options">
                          {{ $t('no_match_options') }}
                        </template>
                      </v-select>
                    </b-col>
                    <b-col cols="7" class="pl-1">
                      <b-form-input
                        v-model="$v.registerForm.phone_number1.$model"
                        :state="RegisterValidateState('phone_number1')"
                        :placeholder="$t('phone_number')"
                        debounce="500"
                        @input="checkPhoneNumberLengthAction"
                      />
                      <b-form-invalid-feedback>
                        {{ $t('phone_number_validation') }}
                      </b-form-invalid-feedback>
                    </b-col>
                  </b-row>
                </b-form-group>
                <b-form-invalid-feedback :state="validPhoneNumberLength">
                  {{ $t('phone_number_length_check') }}
                </b-form-invalid-feedback>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <v-date-picker
                    v-model="registerForm.birthday"
                    :masks="calendarMask"
                    :model-config="calendarConfig"
                    :max-date="calendarMaxDate"
                    :locale="$i18n.locale"
                    is-dark
                  >
                    <template v-slot="{ inputValue, togglePopover }">
                      <b-input-group class="calendar-input">
                        <template v-slot:prepend>
                          <b-input-group-text>
                            <font-awesome-icon :icon="['fas', 'calendar-alt']" class="text-info" />
                          </b-input-group-text>
                        </template>
                        <b-form-input
                          readonly
                          class="bg-primary rounded"
                          :value="inputValue"
                          :placeholder="$t('birthday')"
                          :state="hasBirthday"
                          @click="togglePopover"
                          @focus="isCalendarFocus=true"
                        />
                        <b-form-invalid-feedback>
                          {{ $t('field_required') }}
                        </b-form-invalid-feedback>
                      </b-input-group>
                    </template>
                  </v-date-picker>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-radio-group v-model="registerForm.gender">
                    <b-form-radio value="male" class="sign-radio">
                      {{ $t('male') }}
                    </b-form-radio>
                    <b-form-radio value="female" class="sign-radio">
                      {{ $t('female') }}
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-form-row>
          </b-col>
          <b-col>
            <b-form-row>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.registerForm.first_name.$model"
                    :state="RegisterValidateState('first_name')"
                    :placeholder="$t('first_name')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.registerForm.last_name.$model"
                    :state="RegisterValidateState('last_name')"
                    :placeholder="$t('last_name')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.registerForm.address.$model"
                    :state="RegisterValidateState('address')"
                    :placeholder="$t('address')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.registerForm.postal_code.$model"
                    :state="RegisterValidateState('postal_code')"
                    :placeholder="$t('postal_code')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    v-model="$v.registerForm.city.$model"
                    :state="RegisterValidateState('city')"
                    :placeholder="$t('city')"
                  />
                  <b-form-invalid-feedback>
                    {{ $t('field_required') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <v-select
                    v-model="registerForm.country"
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
                  <v-select
                    v-model="registerForm.interface_local"
                    :reduce="lan => lan.value"
                    label="text"
                    class="sign-select"
                    :options="languageList"
                    :clearable="false"
                    :searchable="false"
                  >
                    <template slot="no-options">
                      {{ $t('no_match_options') }}
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
            </b-form-row>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col cols="9">
            <b-button
              pill
              size="sm"
              variant="outline-light text-white border-white"
              @click="hasPromoCode=!hasPromoCode"
            >
              {{ $t('have_promo_code') }}
            </b-button>
            <b-collapse v-model="hasPromoCode" class="mt-2">
              <b-form-group>
                <b-form-input
                  v-model="registerForm.promo_code"
                  :placeholder="$tc('promo_code', 2)"
                  debounce="500"
                  :state="isValidPromoCode"
                  @change="validatePromoCodeAction"
                />
                <b-form-invalid-feedback :state="isValidPromoCode">
                  {{ $t('invalid_promo_code') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-collapse>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group>
              <b-form-checkbox
                v-model="registerForm.notify_newletter"
                :value="true"
                :unchecked-value="false"
              >
                {{ $t('receive_news') }}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group>
              <b-form-checkbox
                v-model="$v.registerForm.checkTerms.$model"
                :state="RegisterValidateState('checkTerms')"
                :value="true"
                :unchecked-value="false"
              >
                {{ $t('agree_terms') }}
              </b-form-checkbox>
              <b-form-invalid-feedback :state="RegisterValidateState('checkTerms')">
                {{ $t('accept_terms') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col cols="12" class="d-flex justify-content-center">
            <b-button
              pill
              variant="secondary text-dark"
              class="orange-btn"
              style="text-transform: none;"
              @click="registerAction"
            >
              {{ $t('create_new_account') }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-modal
      v-model="loginModal"
      centered
      button-size="sm"
      no-close-on-backdrop
      header-bg-variant="primary"
      header-text-variant="white"
      body-bg-variant="primary"
      body-text-variant="white"
      footer-bg-variant="light"
      footer-text-variant="white"
    >
      <template v-slot:modal-header="{ close }">
        <h6 style="text-transform: uppercase">
          {{ $t('account_login') }}
        </h6>
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="text-white"
          style="cursor: pointer;"
          @click="close()"
        />
      </template>
      <template v-slot:modal-footer="{}">
        <b-row class="w-100">
          <b-col cols="12" class="d-flex justify-content-center align-items-center">
            <span style="font-weight: 200;" class="text-info">{{ $t('new_customer') }}</span>
            <b-button
              variant="link"
              class="text-secondary"
              style="text-decoration: underline"
              @click="gotoRegisterPage"
            >
              {{ $t('create_new_account') }}
            </b-button>
          </b-col>
        </b-row>
      </template>
      <b-overlay
        :show="modalLoading"
        spinner-variant="secondary"
        opacity="0"
        no-wrap
      />
      <b-form class="px-3" @keyup.enter="loginAction(true)">
        <b-row>
          <b-col cols="12">
            <b-form-group>
              <b-alert :show="isLoginFailed" variant="danger">
                {{ $t('failed_login') }}
              </b-alert>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group>
              <b-form-input
                v-model="$v.loginForm.username.$model"
                :state="loginValidateState('username')"
                :placeholder="$t('username')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group>
              <b-form-input
                v-model="$v.loginForm.password.$model"
                type="password"
                :state="loginValidateState('password')"
                :placeholder="$t('password')"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col cols="12">
            <b-button
              pill
              block
              variant="secondary text-dark"
              class="orange-btn"
              style="text-transform: none;"
              @click="loginAction(true)"
            >
              {{ $t('log_in') }}
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="d-flex justify-content-center">
            <b-button variant="link" @click="clickForgotPassword">
              {{ $t('forgot_password') }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-modal
      v-model="forgotPasswordModal"
      centered
      button-size="sm"
      no-close-on-backdrop
      hide-footer
      header-bg-variant="primary"
      header-text-variant="white"
      body-bg-variant="primary"
      body-text-variant="white"
      footer-bg-variant="primary"
      footer-text-variant="white"
    >
      <template v-slot:modal-header="{ close }">
        <h6 style="text-transform: uppercase">
          {{ $t('forgot_password') }}
        </h6>
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="text-white"
          style="cursor: pointer;"
          @click="close()"
        />
      </template>
      <b-overlay
        :show="modalLoading"
        spinner-variant="secondary"
        opacity="0"
        no-wrap
      />
      <b-form class="px-3" @keyup.enter="resetPasswordAction">
        <b-row>
          <b-col cols="12">
            <b-form-group>
              <b-alert :show="forgotPasswordResult == 2" variant="danger">
                <h4 class="text-info text-nowrap">
                  {{ $t('failed_reset_password') }}
                </h4>
              </b-alert>
              <b-alert :show="forgotPasswordResult == 3" variant="danger">
                <h4 class="text-info text-nowrap">
                  {{ $t('action_failed') }}
                </h4>
              </b-alert>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group>
              <b-form-input
                v-model="$v.forgotPasswordForm.username.$model"
                :state="forgotPasswordValidateState('username')"
                :placeholder="$t('username')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group>
              <b-form-input
                v-model="$v.forgotPasswordForm.email.$model"
                :state="forgotPasswordValidateState('email')"
                :placeholder="$tc('email_address', 2)"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col cols="12">
            <b-button
              pill
              block
              variant="secondary text-dark"
              class="orange-btn"
              @click="resetPasswordAction"
            >
              {{ $t('submit') }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-modal
      v-model="contactModal"
      size="md"
      centered
      button-size="sm"
      no-close-on-backdrop
      hide-footer
      header-bg-variant="primary"
      header-text-variant="white"
      body-bg-variant="primary"
      body-text-variant="white"
      footer-bg-variant="primary"
      footer-text-variant="white"
    >
      <template v-slot:modal-header="{ close }">
        <h6 style="text-transform: uppercase">
          {{ $t('contact_us') }}
        </h6>
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="text-white"
          style="cursor: pointer;"
          @click="close()"
        />
      </template>
      <b-overlay
        :show="modalLoading"
        spinner-variant="secondary"
        opacity="0"
        no-wrap
      />
      <b-form class="px-3">
        <b-row>
          <template v-if="isSentMessage">
            <b-col cols="12">
              <p>{{ $t('sent_message_details') }}</p>
            </b-col>
          </template>
          <template v-else>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="$v.contactForm.player_name.$model"
                  :state="contactValidateState('player_name')"
                  :placeholder="$t('player_name')"
                />
                <b-form-invalid-feedback>
                  {{ $t('field_required') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-input
                  v-model="$v.contactForm.email.$model"
                  type="email"
                  :state="contactValidateState('email')"
                  :placeholder="$tc('email_address', 1)"
                />
                <b-form-invalid-feedback>
                  {{ $t('email_validation') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-row>
                  <b-col cols="6" class="pr-0">
                    <v-select
                      v-model="contactForm.countryPhone"
                      label="text"
                      class="sign-select"
                      :options="countryPhoneList"
                      :get-option-label="phone => '(' + phone.value + ')'"
                      :clearable="false"
                    >
                      <template v-slot:option="{text, value}">
                        {{ text + ' (' + value + ')' }}
                      </template>
                      <template slot="no-options">
                        {{ $t('no_match_options') }}
                      </template>
                    </v-select>
                  </b-col>
                  <b-col cols="6" class="pl-1">
                    <b-form-input
                      v-model="$v.contactForm.phone_number1.$model"
                      :state="contactValidateState('phone_number1')"
                      :placeholder="$t('phone_number')"
                    />
                    <b-form-invalid-feedback>
                      {{ $t('phone_number_validation') }}
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-textarea
                  v-model="$v.contactForm.note.$model"
                  :state="contactValidateState('note')"
                  :placeholder="$t('message')"
                  rows="4"
                />
                <b-form-invalid-feedback>
                  {{ $t('field_required') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </template>
        </b-row>
        <b-row class="my-2">
          <b-col cols="12" class="d-flex justify-content-center">
            <b-button
              v-if="!isSentMessage"
              pill
              variant="secondary text-dark"
              class="orange-btn"
              style="text-transform: none;"
              @click="contactAction"
            >
              {{ $t('send_message') }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-modal
      v-model="depositModal"
      size="md"
      centered
      button-size="sm"
      hide-footer
      no-close-on-backdrop
      header-bg-variant="primary"
      header-text-variant="white"
      body-bg-variant="primary"
      body-text-variant="white"
      footer-bg-variant="primary"
      footer-text-variant="white"
    >
      <template v-slot:modal-header="{}">
        <h6 style="text-transform: uppercase;font-weight: bold">
          {{ $t('welcome') }}
        </h6>
      </template>
      <b-form class="px-3">
        <b-row align-h="center">
          <b-col cols="12" class="d-flex justify-content-center align-items-center mb-2">
            <h3>{{ $t('congratulations') }}</h3>
          </b-col>
          <b-col cols="12" class="d-flex justify-content-center align-items-center text-info mb-4">
            <h4>{{ $t('register_message') }}</h4>
          </b-col>
          <b-col cols="12" class="d-flex justify-content-center align-items-center">
            <h6>{{ $t('register_redirect_message', [redirectSecond]) }}</h6>
          </b-col>
        </b-row>
        <b-row class="mt-2 mb-3">
          <b-col cols="12" class="d-flex justify-content-center">
            <b-button
              pill
              block
              variant="secondary text-dark"
              class="orange-btn"
              style="text-transform: uppercase;"
              @click="depositAction"
            >
              {{ $t('deposit_now') }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import countryData from 'countries-list'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs, email, numeric } from 'vuelidate/lib/validators'
import common from '~/mixins/common'
export default {
  mixins: [validationMixin, common],
  data: () => ({
    calendarMaxDate: new Date(),
    registerForm: {
      username: null,
      password: null,
      confirmPassword: null,
      email: null,
      countryPhone: null,
      phone_number1: null,
      city: null,
      country: null,
      promo_code: null,
      gender: 'male',
      birthday: null,
      first_name: null,
      last_name: null,
      address: null,
      postal_code: null,
      interface_local: 'en',
      checkTerms: null,
      notify_newletter: false
    },
    contactForm: {
      player_name: null,
      email: null,
      countryPhone: null,
      phone_number1: null,
      note: null
    },
    loginForm: {
      username: null,
      password: null
    },
    forgotPasswordForm: {
      username: null,
      email: null
    },
    calendarMask: {
      input: 'YYYY-MM-DD'
    },
    calendarConfig: {
      type: 'string',
      mask: 'YYYY-MM-DD'
    },
    isCalendarFocus: false,
    countryPhoneList: [],
    countryList: [],
    languageList: [],
    hasPromoCode: false,
    checkNews: false,
    checkTerms: false,
    registerModal: false,
    loginModal: false,
    contactModal: false,
    isSentMessage: false,
    isDuplicatedUser: false,
    isValidPromoCode: true,
    validPhoneNumberLength: true,
    forgotPasswordModal: false,
    depositModal: false,
    redirectSecond: 5,
    timer: null,
    isLoginFailed: false,
    modalLoading: false,
    forgotPasswordResult: 0
  }),
  validations: {
    registerForm: {
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(3)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      },
      email: {
        required,
        email
      },
      phone_number1: {
        required,
        numeric
      },
      first_name: {
        required
      },
      last_name: {
        required
      },
      address: {
        required
      },
      postal_code: {
        required
      },
      city: {
        required
      },
      checkTerms: {
        checked: value => value === true
      }
    },
    contactForm: {
      player_name: {
        required
      },
      email: {
        required,
        email
      },
      phone_number1: {
        required,
        numeric
      },
      note: {
        required
      }
    },
    loginForm: {
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(3)
      }
    },
    forgotPasswordForm: {
      username: {
        required
      },
      email: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['loggedIn', 'loggedUser', 'getCountryCode', 'getIP']),
    hasBirthday () {
      return !this.isCalendarFocus || (this.isCalendarFocus && this.registerForm.birthday !== null)
    }
  },
  created () {
    this.$nuxt.$on('register-action', () => {
      this.getLocationInfo()
      this.$v.registerForm.$reset()
      this.isDuplicatedUser = false
      this.isValidPromoCode = true
      this.validPhoneNumberLength = true
      this.registerModal = true
    })
    this.$nuxt.$on('login-action', () => {
      this.loginForm.username = ''
      this.loginForm.password = ''
      this.$v.loginForm.$reset()
      this.loginModal = true
    })
    this.$nuxt.$on('run-login-action', async (data = null) => {
      this.$v.loginForm.$reset()
      this.loginModal = true
      if (data != null) {
        this.loginForm.username = data.username
        this.loginForm.password = data.password
      } else {
        this.loginForm.username = ''
        this.loginForm.password = ''
      }
      await this.loginAction(false)
    })
    this.$nuxt.$on('contact-action', () => {
      this.$v.contactForm.$reset()
      if (this.loggedIn && this.loggedUser) {
        this.contactForm.player_name = `${this.loggedUser.first_name} ${this.loggedUser.last_name} (${this.loggedUser.username})`
        this.contactForm.email = this.loggedUser.email
        this.contactForm.countryPhone = {
          text: countryData.countries[this.loggedUser.country].name,
          value: '+' + countryData.countries[this.loggedUser.country].phone.split(',')[0]
        }
        this.contactForm.phone_number1 = this.loggedUser.phone_number.replace(this.contactForm.countryPhone.value, '')
        this.contactForm.playerId = this.loggedUser.id
      }
      this.contactModal = true
      this.isSentMessage = false
    })
  },
  async mounted () {
    this.calendarMaxDate.setFullYear(this.calendarMaxDate.getFullYear() - 18)
    Object.keys(countryData.countries).forEach((key) => {
      this.countryPhoneList.push({
        text: countryData.countries[key].name,
        value: '+' + countryData.countries[key].phone.split(',')[0]
      })
      this.countryList.push({
        text: countryData.countries[key].name,
        value: key
      })
    })
    this.setLanguageData()
    this.registerForm.countryPhone = this.countryPhoneList[0]
    this.contactForm.countryPhone = this.countryPhoneList[0]
    this.registerForm.country = this.countryList[0]
    await this.getLocationInfo()
  },
  methods: {
    ...mapActions(['setManagementTab', 'setBalanceInfo', 'setGamePlayStatus', 'setBonusCode']),
    ...mapActions('player', ['validatePlayerName', 'registerPlayer', 'resetPassword']),
    ...mapActions('playerMessage', ['sendMessage']),
    ...mapActions('bonus', ['validatePromoCode']),
    RegisterValidateState (name) {
      const { $dirty, $error } = this.$v.registerForm[name]
      return $dirty ? !$error : null
    },
    contactValidateState (name) {
      const { $dirty, $error } = this.$v.contactForm[name]
      return $dirty ? !$error : null
    },
    loginValidateState (name) {
      const { $dirty, $error } = this.$v.loginForm[name]
      return $dirty ? !$error : null
    },
    forgotPasswordValidateState (name) {
      const { $dirty, $error } = this.$v.forgotPasswordForm[name]
      return $dirty ? !$error : null
    },
    async updateUsername (value) {
      if (value === null || value.length === 0) {
        return
      }
      try {
        const data = await this.validatePlayerName({
          $axios: this.$axios,
          params: {
            username: value
          }
        })
        if (data.status === 0) {
          this.isDuplicatedUser = true
        } else {
          this.isDuplicatedUser = false
        }
      } catch (e) {
        console.log(e)
      }
    },
    checkPhoneNumberLengthAction (value) {
      if (value === null || value.length === 0) {
        this.validPhoneNumberLength = false
      } else if ((this.registerForm.countryPhone.value.length - 1) + value.length < 7) {
        this.validPhoneNumberLength = false
      } else {
        this.validPhoneNumberLength = true
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
        console.log(e)
      }
      return this.isValidPromoCode
    },
    setLanguageData () {
      this.languageList.push({
        text: this.$t('english'),
        value: 'en'
      })
      this.languageList.push({
        text: this.$t('french'),
        value: 'fr'
      })
      this.languageList.push({
        text: this.$t('finnish'),
        value: 'fi'
      })
      this.languageList.push({
        text: this.$t('german'),
        value: 'de'
      })
      this.languageList.push({
        text: this.$t('italian'),
        value: 'it'
      })
      this.languageList.push({
        text: this.$t('swedish'),
        value: 'se'
      })
      this.languageList.push({
        text: this.$t('norwegian'),
        value: 'no'
      })
      this.languageList.push({
        text: this.$t('indian'),
        value: 'in'
      })
    },
    getLocationInfo () {
      this.registerForm.countryPhone = {
        text: countryData.countries[this.getCountryCode].name,
        value: '+' + countryData.countries[this.getCountryCode].phone.split(',')[0]
      }
      this.contactForm.countryPhone = this.registerForm.countryPhone
      this.registerForm.country = {
        text: countryData.countries[this.getCountryCode].name,
        value: this.getCountryCode
      }
    },
    async registerAction () {
      this.$v.registerForm.$touch()
      if (!this.$v.registerForm.$anyError && this.hasBirthday && this.isValidPromoCode && this.validPhoneNumberLength) {
        this.registerForm.phone_number = this.registerForm.countryPhone.value + this.registerForm.phone_number1
        this.registerForm.country = this.registerForm.country.value
        if (this.$route.query.tracking_code) {
          this.registerForm.tracking_code = this.$route.query.tracking_code
        } else {
          this.registerForm.tracking_code = null
        }
        try {
          const data = await this.registerPlayer({
            $axios: this.$axios,
            params: this.registerForm
          })
          if (data.status === 1) {
            this.registerModal = false
            this.loginForm.username = this.registerForm.username
            this.loginForm.password = this.registerForm.password
            await this.loginAction(true)
            await this.showDepositModal()
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    async contactAction () {
      this.$v.contactForm.$touch()
      if (!this.$v.contactForm.$anyError) {
        this.contactForm.phone_number = this.contactForm.countryPhone.value + this.contactForm.phone_number1
        this.modalLoading = true
        try {
          this.contactForm.status = 'pending'
          const data = await this.sendMessage({
            $axios: this.$axios,
            params: this.contactForm
          })
          if (data.status === 1) {
            this.$bvToast.toast(this.$t('sent_message_notification'), {
              variant: 'success',
              appendToast: true,
              toaster: 'b-toaster-top-right',
              noCloseButton: true,
              autoHideDelay: 3500,
              solid: true
            })
            this.$v.contactForm.$reset()
            this.isSentMessage = true
          }
        } catch (e) {
          console.log(e)
        }
        this.modalLoading = false
      }
    },
    async loginAction (isRedirect = true) {
      this.$v.loginForm.$touch()
      if (!this.$v.loginForm.$anyError) {
        this.modalLoading = true
        try {
          this.loginForm.ip_address = this.getIP
          await this.$auth.loginWith('local', {
            data: this.loginForm
          })
          this.setBalanceInfo({
            total_balance: this.loggedUser.total_balance,
            real_balance: this.loggedUser.real_balance,
            bonus_balance: this.loggedUser.bonus_balance,
            locked_balance: this.loggedUser.locked_balance
          })
          this.$nuxt.$emit('logged-in-event')
          this.loginModal = false
          this.setGamePlayStatus(false)
          if (isRedirect === true) {
            await this.$router.push(this.localePath('/online-casino', this.$i18n.locale))
          }
        } catch (e) {
          this.isLoginFailed = true
        }
        this.modalLoading = false
      }
    },
    clickForgotPassword () {
      this.$v.forgotPasswordForm.$reset()
      this.loginModal = false
      this.forgotPasswordModal = true
    },
    async resetPasswordAction () {
      this.$v.forgotPasswordForm.$touch()
      if (!this.$v.forgotPasswordForm.$anyError) {
        this.modalLoading = true
        try {
          const data = await this.resetPassword({
            $axios: this.$axios,
            params: this.forgotPasswordForm
          })
          if (data.status === 1) {
            this.forgotPasswordResult = 1
            this.$bvToast.toast(this.$t('sent_reset_password_email'), {
              variant: 'success',
              appendToast: true,
              toaster: 'b-toaster-top-right',
              noCloseButton: true,
              autoHideDelay: 3500,
              solid: true
            })
          } else {
            this.forgotPasswordResult = 2
          }
        } catch (e) {
          this.forgotPasswordResult = 3
        }
        this.forgotPasswordModal = false
        this.modalLoading = false
      }
    },
    showDepositModal () {
      this.depositModal = true
      this.timer = setInterval(() => {
        if (this.redirectSecond === 0) {
          clearInterval(this.timer)
          this.depositAction()
        }
        this.redirectSecond = this.redirectSecond - 1
      }, 1000)
    },
    async depositAction () {
      this.depositModal = false
      clearInterval(this.timer)
      this.redirectSecond = 5
      this.setBonusCode('')
      this.setManagementTab(2)
      await this.$router.push(this.localePath('/user-management', this.$i18n.locale))
    },
    gotoRegisterPage () {
      this.loginModal = false
      this.$router.push(this.localePath('/sign-up', this.$i18n.locale))
    }
  }
}
</script>
