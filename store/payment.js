export const actions = {
  getBitcoBrokerUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_bitco_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getBitpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_bitpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getOobitpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_oobitpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getMisterpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_misterpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getCoinpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_coinpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getCryptopayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_cryptopay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getKeypayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_keypay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_pay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getNeopayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_neopay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getRealpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_realpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPaytechnopayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_paytechnopay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getImpayapayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_impayapay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getFastcloudpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_fastcloudpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getBpwalletpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_bpwalletpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getAstropayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_astropay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getOppeypayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_oppeypay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getBennupay (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_bennupay', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPayopUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_payop', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getEpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_epay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPrismpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_prismpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getGreatpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_greatpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getEuPaymentFormData (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_eupayment_form', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPickSellPayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_picksellpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPayTriotPayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_paytriotpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getChargeMoneyUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_chargemoney_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getClientIP (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('https://ipinfo.io/?token=9a50bf62c4b1b0', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getSecurepayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_securepay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getKnoxpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_knoxpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPaystackUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_paystack_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPacificpayUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_pacificpay_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getBoomBillUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_boombill_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getBlackRabbitUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_blackrabbit_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getStripeUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_stripe_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getSirpagaUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_sirpaga_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getVegaahUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_vegaah_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPwclickUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_pwclick_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getKryptovaUrl (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/get_payment_kryptova_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
}
