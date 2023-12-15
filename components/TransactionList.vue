<template>
  <b-container fluid class="mx-0 tab-container">
    <b-row align-v="center">
      <b-col cols="12" class="py-2 border-bottom border-dark">
        <h3 class="text-info">
          {{ $t('transaction') }}
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-row class="py-2">
          <b-col :cols="$mq==='xl'||$mq==='lg' ? 3 : 12" class="py-1">
            <v-select
              v-model="filterStatus"
              :reduce="status => status.value"
              label="text"
              class="sign-select"
              :options="statusList"
              :clearable="false"
              :searchable="false"
              @input="updateItems"
            >
              <template slot="no-options">
                {{ $t('no_match_options') }}
              </template>
            </v-select>
          </b-col>
          <b-col :cols="$mq==='xl'||$mq==='lg' ? 3 : 12" class="py-1">
            <v-select
              v-model="filterPeriod"
              :reduce="period => period.value"
              label="text"
              class="sign-select"
              :options="periodList"
              :clearable="false"
              :searchable="false"
              @input="updateItems"
            >
              <template slot="no-options">
                {{ $t('no_match_options') }}
              </template>
            </v-select>
          </b-col>
          <template v-if="$mq==='xl'||$mq==='lg'">
            <b-col cols="6" class="d-flex align-items-center py-1">
              <h6 :class="filterPeriod!==3 ? 'text-info' : 'text-white'">
                {{ $t('start_date') }}
              </h6>
              <v-date-picker
                v-model="filterStartDate"
                :masks="calendarMask"
                :model-config="calendarConfig"
                :locale="$i18n.locale"
                is-dark
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <b-input-group class="management-input">
                    <template v-slot:prepend>
                      <b-input-group-text>
                        <font-awesome-icon :icon="['fas', 'calendar-alt']" :class="filterPeriod!==3 ? 'text-gray' : 'text-info'" />
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      :disabled="filterPeriod!==3"
                      readonly
                      class="bg-primary rounded"
                      :value="inputValue"
                      @click="togglePopover"
                    />
                  </b-input-group>
                </template>
              </v-date-picker>
              <h6 class="pl-2" :class="filterPeriod!==3 ? 'text-info' : 'text-white'">
                {{ $t('to') }}
              </h6>
              <v-date-picker
                v-model="filterEndDate"
                :masks="calendarMask"
                :model-config="calendarConfig"
                :locale="$i18n.locale"
                is-dark
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <b-input-group class="management-input">
                    <template v-slot:prepend>
                      <b-input-group-text>
                        <font-awesome-icon :icon="['fas', 'calendar-alt']" :class="filterPeriod!==3 ? 'text-gray' : 'text-info'" />
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      :disabled="filterPeriod!==3"
                      readonly
                      class="bg-primary rounded"
                      :value="inputValue"
                      @click="togglePopover"
                    />
                  </b-input-group>
                </template>
              </v-date-picker>
            </b-col>
          </template>
          <template v-else>
            <b-col cols="12" class="py-1 d-flex align-items-center justify-content-end">
              <h6 :class="filterPeriod!==3 ? 'text-info' : 'text-white'" class="text-nowrap">
                {{ $t('start_date') }}
              </h6>
              <v-date-picker
                v-model="filterStartDate"
                :masks="calendarMask"
                :model-config="calendarConfig"
                :locale="$i18n.locale"
                is-dark
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <b-input-group class="management-input">
                    <template v-slot:prepend>
                      <b-input-group-text>
                        <font-awesome-icon :icon="['fas', 'calendar-alt']" :class="filterPeriod!==3 ? 'text-gray' : 'text-info'" />
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      :disabled="filterPeriod!==3"
                      readonly
                      class="bg-primary rounded"
                      :value="inputValue"
                      @click="togglePopover"
                    />
                  </b-input-group>
                </template>
              </v-date-picker>
            </b-col>
            <b-col cols="12" class="py-1 d-flex align-items-center justify-content-end">
              <h6 class="pl-2 text-nowrap" :class="filterPeriod!==3 ? 'text-info' : 'text-white'">
                {{ $t('to') }}
              </h6>
              <v-date-picker
                v-model="filterEndDate"
                :masks="calendarMask"
                :model-config="calendarConfig"
                :locale="$i18n.locale"
                is-dark
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <b-input-group class="management-input">
                    <template v-slot:prepend>
                      <b-input-group-text>
                        <font-awesome-icon :icon="['fas', 'calendar-alt']" :class="filterPeriod!==3 ? 'text-gray' : 'text-info'" />
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      :disabled="filterPeriod!==3"
                      readonly
                      class="bg-primary rounded"
                      :value="inputValue"
                      @click="togglePopover"
                    />
                  </b-input-group>
                </template>
              </v-date-picker>
            </b-col>
          </template>
        </b-row>
      </b-col>
      <b-col cols="12">
        <b-overlay
          :show="loading"
          spinner-variant="secondary"
          opacity="0"
          no-wrap
        />
        <b-table
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          sort-icon-left
          responsive=""
          thead-tr-class="mytable-head"
          tbody-tr-class="mytable-body"
          head-variant="dark"
          table-variant="primary"
        >
          <template #cell(status)="data">
            <template v-if="data.value === 'pending'">
              <span class="text-danger" style="text-transform: uppercase;font-size: 12px;font-weight: 400;">{{ $t(data.value) }}</span>
            </template>
            <template v-else-if="data.value === 'complete'">
              <span class="text-success" style="text-transform: uppercase;font-size: 12px;font-weight: 400;">{{ $t(data.value) }}</span>
            </template>
            <template v-else>
              <span class="text-dark" style="text-transform: uppercase;font-size: 12px;font-weight: 400;">{{ $t(data.value) }}</span>
            </template>
          </template>
          <template #cell(amount)="data">
            <span>{{ data.value | currencyFormat }}</span>
          </template>
          <template #cell(name)="data">
            <b-badge v-if="data.item.is_bonus == true" variant="secondary">
              {{ $t('bonus') }}
            </b-badge>
            <span v-else>{{ data.value }}</span>
          </template>
          <template #cell(createdAt)="data">
            <span>{{ data.value | dateFormat(true) }}</span>
          </template>
          <template #cell(type)="data">
            <span>{{ $t(data.value) }}</span>
          </template>
          <template #cell(action)="data">
            <template v-if="data.item.type === 'withdrawal' && data.item.status === 'pending'">
              <b-badge
                variant="secondary"
                style="cursor:pointer;"
                @click="reversalAction(data.item.id)"
              >
                {{ $t('reversal') }}
              </b-badge>
            </template>
          </template>
        </b-table>
      </b-col>
      <b-col cols="12">
        <b-pagination
          v-model="page"
          class="mytable-pagination"
          :total-rows="totalRows"
          :per-page="itemsPerPage"
          align="right"
        />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import common from '~/mixins/common'

export default {
  mixins: [common],
  data: () => ({
    loading: false,
    statusList: [],
    periodList: [],
    calendarMask: {
      input: 'YYYY-MM-DD'
    },
    calendarConfig: {
      type: 'string',
      mask: 'YYYY-MM-DD'
    },
    fields: [],
    items: [],
    filterStatus: 'all',
    filterPeriod: 2,
    filterStartDate: '',
    filterEndDate: '',
    sortBy: 'createdAt',
    sortDesc: true,
    page: 1,
    itemsPerPage: 10,
    totalRows: 0
  }),
  computed: {
    ...mapGetters(['loggedUser'])
  },
  watch: {
    filterStartDate () {
      this.updateItems()
    },
    filterEndDate () {
      this.updateItems()
    },
    sortBy () {
      this.updateItems()
    },
    sortDesc () {
      this.updateItems()
    },
    page () {
      this.updateItems()
    }
  },
  async mounted () {
    this.statusList = [
      {
        text: this.$t('all'),
        value: 'all'
      },
      {
        text: this.$t('complete'),
        value: 'complete'
      },
      {
        text: this.$t('pending'),
        value: 'pending'
      },
      {
        text: this.$t('cancelled'),
        value: 'cancelled'
      }
    ]
    this.periodList = [
      {
        text: this.$t('last_24hours'),
        value: 0
      },
      {
        text: this.$t('last_7days'),
        value: 1
      },
      {
        text: this.$t('last_30days'),
        value: 2
      },
      {
        text: this.$t('custom'),
        value: 3
      }
    ]
    this.fields = [
      {
        key: 'type',
        label: this.$t('type'),
        sortable: true
      },
      {
        key: 'createdAt',
        label: this.$t('date'),
        sortable: true
      },
      {
        key: 'amount',
        label: this.$t('amount'),
        sortable: true
      },
      {
        key: 'name',
        label: this.$t('provider'),
        sortable: true
      },
      {
        key: 'status',
        label: this.$t('status'),
        sortable: true
      },
      {
        key: 'action',
        label: this.$t('action'),
        sortable: false
      }
    ]
    await this.updateItems()
  },
  methods: {
    ...mapActions('financialTransaction', ['getFinancialTransactions', 'cancelWithdrawalRequest']),
    async updateItems () {
      this.loading = true
      try {
        const data = await this.getFinancialTransactions({
          $axios: this.$axios,
          params: {
            playerId: this.loggedUser.id,
            filterPeriod: this.filterPeriod,
            filterStartDate: this.filterStartDate,
            filterEndDate: this.filterEndDate,
            filterStatus: this.filterStatus,
            sortBy: this.sortBy,
            sortDesc: this.sortDesc,
            page: this.page,
            itemsPerPage: this.itemsPerPage
          }
        })
        if (data.status === 1) {
          this.items = data.transactions.rows
          this.totalRows = data.transactions.count
        }
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    async reversalAction (id) {
      this.loading = true
      const data = await this.cancelWithdrawalRequest({
        $axios: this.$axios,
        params: {
          transactionId: id
        }
      })
      if (data.status === 1) {
        this.$bvToast.toast(this.$t('withdrawal_cancelled'), {
          variant: 'success',
          appendToast: true,
          toaster: 'b-toaster-top-right',
          noCloseButton: true,
          autoHideDelay: 3500,
          solid: true
        })
      }
      this.loading = false
      await this.updateItems()
    }
  }
}
</script>
