<template>
  <section class="formWrap" @click="test" ref="form">
    <el-container
      direction="vertical"
      data-aos="fade-down"
      data-aos-delay="400"
    >
      <h2 class="sectionTitle">Выберите <span @click="fillForm">рейс</span></h2>
      <el-form
        :model="excursionForm"
        class="feedbackForm"
        @submit.native.prevent
      >
        <el-row :gutter="20">
          <el-col class="feedbackForm__date" :span="24" :sm="{ span: 12 }">
            <el-select
              v-model="excursionForm.date"
              placeholder="Дата"
              class="el-select-date"
              @change="isDateChanged ? (excursionForm.time = '') : null"
            >
              <el-option
                v-for="(item, index) in dates"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
          <el-col class="feedbackForm__time" :span="24" :sm="{ span: 12 }">
            <el-select
              ref="time"
              v-model="excursionForm.time"
              :disabled="!excursionForm.date"
              @change="isDateChanged = true"
              placeholder="Время"
              class="el-select-time"
            >
              <el-option
                v-for="(item, index) in times"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>

          <transition name="show-form">
            <div class="show-form ticket-types" v-if="isDateChanged && placesByDate.length">
              <el-col
                :span="8"
                class="ticket-types__single"
                v-for="(item, index) in placesByDate"
                :key="index"
              >
                <h4>{{ item.name }}</h4>
                <el-input-number
                  v-model="placesVModel[index]"
                  :min="0"
                  :max="item.max"
                />
              </el-col>
            </div>
          </transition>

          <transition name="show-form">
            <div class="show-form" v-if="isDateChanged && placesByDate.length">
              <el-col class="feedbackForm__name" :span="24">
                <el-form-item prop="name">
                  <el-input placeholder="Имя" v-model="excursionForm.name" />
                </el-form-item>
              </el-col>
              <el-col class="feedbackForm__phone" :span="24">
                <el-form-item prop="phone">
                  <el-input
                    v-mask="'+7 (###) ###-##-##'"
                    placeholder="Номер телефона"
                    v-model="excursionForm.phone"
                  />
                </el-form-item>
              </el-col>
              <el-col class="feedbackForm__email" :span="24">
                <el-form-item prop="email">
                  <el-input
                    placeholder="Электронная почта"
                    v-model="excursionForm.email"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="text">
                  <el-input
                    placeholder="Комментарий"
                    type="textarea"
                    v-model="excursionForm.text"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="option">
                  <el-select
                    v-model="excursionForm.сonfirmOptions"
                    :placeholder="options[0].label"
                    class="el-select-list white"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <h6 class="feedbackForm__warning">
                  Нажимая “Забронировать”, Вы соглашаетесь с
                  <router-link :to="{ name: 'policy' }" target="_blank"
                    >политикой обработки персональных данных</router-link
                  >
                </h6>
                <el-form-item>
                  <el-button type="success" @click="onSubmit"
                    >{{ btnText }}</el-button
                  >
                </el-form-item>
              </el-col>
            </div>
          </transition>
        </el-row>
      </el-form>
    </el-container>

    <transition name="formWrap__thanks">
      <el-container
        direction="vertical"
        class="formWrap__thanks"
        v-show="paymentStatus.showStatus"
        @click.native="resetFields()"
      >
        <h1>{{ paymentStatus.title }}</h1>
        <h3>{{ paymentStatus.desc }}</h3>
      </el-container>
    </transition>
    <!-- <paymentStatus :status="paymentStatus"> </paymentStatus>  -->

    <div style="pointer-events: none; visibility: hidden; position: absolute;" v-html="bankForm" v-if="bankForm"></div>
  </section>
</template>

<script>
  import { mask } from "vue-the-mask";
  import { $showPayment, $sortByDate } from "@/utils/utils.js";
  import paymentStatus from "./payment-status.vue";
  import api from "@/store/api";
  import axios from "axios";

  export default {
    name: "excursion-form",
    directives: { mask },
    components: {
      paymentStatus,
    },
    props: {
      offers: {
        type: Array,
        default: function() {
          return [];
        },
      },
    },
    data: () => ({
      adults: 1,
      children: 0,
      foreigners: 0,
      isDateChanged: false,
      dateTimes: [],
      options: [
        {
          value: "Телефонный звонок от менеджера компании",
          label: "Телефонный звонок от менеджера компании",
        },
        {
          value: "Смс-оповещение",
          label: "Смс-оповещение",
        },
        {
          value: "Электронное письмо на почту",
          label: "Электронное письмо на почту",
        },
      ],
      paymentStatus: {
        title: "Спасибо, что выбрали нас",
        desc: "Ожидайте обратной связи в ближайшее время",
        showStatus: false,
      },

      placesVModel: [0],

      bankForm: null,
    }),

    watch: {
      '$route.query': {
        handler: function(query) {
          const {success, error} = query;
          if (!success && !error) return;          
          this.$nextTick().then(() => {
            const form = this.$refs.form;
            if (form) {
              form.scrollIntoView();
            }

            if (success === 'true') {
              this.status("success");
            } else if (error === 'true') {
              this.status(
                "error",
                "Заказ не оплачен",
                "Во время оплаты заказа произошла ошибка"
              );
            } 
          })
          
        },
        deep: true,
        immediate: true
      },

      placesByDate(value) {
        this.placesVModel = [];
        value.forEach((place, index) => {
          this.placesVModel.push(index === 0 ? 1 : 0);
        }); 
      },
      btnText(val) {
        this.$emit('setBtnText', val);
      }
    },
    computed: {
      changedDate() {},

      btnText() {
        return this.isDateChanged && this.placesByDate.length ? 'Купить билет' : 'Забронировать';
      },

      excursionForm() {
        return this.$store.state.orderForm;
      },

      sctructuredOffers() {
        return $sortByDate(this.offers.map(function(item) {
          const splt = item.TIME.split(" ");
          return {
            ID: item.ID,
            TYPE: item.TYPE,
            DATE: splt[0],
            TIME: splt[1],
            sortDate: item.TIME,
          };
        }));
      },

      dates() {
        return [...new Set(this.sctructuredOffers.map((el) => el.DATE))];
      },

      times() {
        if (this.excursionForm.date) {
          const filteredTimes = this.sctructuredOffers
            .filter((el) => {
              return el.DATE == this.excursionForm.date;
            })
            .map((el) => {
              return el.TIME.substring(0, el.TIME.length - 3);
            });

          return [...new Set(filteredTimes)];
        }
      },

      placesByDate() {
        const dateTime = `${this.excursionForm.date} ${this.excursionForm.time}:00`;
        const isAlreadyInArr = (places, code) => {
          return !!places.find((item) => item.code === code);
        };
        const offersByDateTime = this.offers.filter((item) => item.QUANTITY > 0 && item.TIME === dateTime);
        const places = [];
        offersByDateTime.forEach((offer, index) => {
          if (!isAlreadyInArr(places, offer.CODE)) {
            const val = {
              value: 0,
              max: +offer.QUANTITY || 30,
              name: offer.TYPE,
              id: offer.ID,
              code: offer.CODE,
            };
            places.push(val);
          }
        });
        return places;
      },

      ticketTypes() {
        // return this.sctructuredOffers
        //   .filter((el) => {
        //     let date = el.DATE;
        //     let time = el.TIME.substring(0, el.TIME.length - 3);
        //     return (
        //       this.excursionForm.date == date && this.excursionForm.time == time
        //     );
        //   })
        //   .map((el) => {
        //     if (el.TYPE == "Взрослый") {
        //       if (this.adults > 0)
        //         this.excursionForm.adults = { [el.ID]: this.adults };
        //       else delete this.excursionForm.adults;
        //     } else if (el.TYPE == "Ребенок") {
        //       if (this.children > 0)
        //         this.excursionForm.children = { [el.ID]: this.children };
        //       else delete this.excursionForm.children;
        //     } else if (el.TYPE == "Иностранец") {
        //       if (this.foreigners > 0)
        //         this.excursionForm.foreigners = { [el.ID]: this.foreigners };
        //       else delete this.excursionForm.foreigners;
        //     }
        //   });
      },
    },
    methods: {
      test() {
        // console.log(this.excursionForm);
        // console.log(this.ticketTypes);
        // console.warn(this.times);
      },

      status(status, title, message) {
        if (status === "success") {
          this.paymentStatus = {
            title: title || "Спасибо, что выбрали нас",
            desc: message || "Ожидайте обратной связи в ближайшее время",
            showStatus: true,
          };
        } else if (status === "error") {
          this.paymentStatus = {
            title: title || "Ошибка при оплате",
            desc: message || "Пожалуйста повторите попытку позже",
            showStatus: true,
          };
        }

        setTimeout(() => {
          this.paymentStatus = {
            title: "",
            desc: "",
            showStatus: false,
          };
          if (status === "success") {
            this.resetFields();
          }
        }, 3500);
      },

      testBank() {
        const data = {
          marketplace: "113325233",
          message: "eyJub25jZSI6ImFmNGJhNjA4YjBlYjI4ZmVkMTdmNTcxNDY3Y2YxYTcyMTliYTE3ZDgiLCJjdXN0b21lckVtYWlsIjoidGVzdEBwbGF5bmV4dC5ydSIsImN1c3RvbWVyUGhvbmUiOm51bGwsImN1c3RvbWVyQ29tbWVudCI6InBsYXluZXh0IHRlc3QiLCJvcmRlcklkIjoyOTcsImRldGFpbHMiOiJcdTA0MWVcdTA0M2ZcdTA0M2JcdTA0MzBcdTA0NDJcdTA0MzAgXHUwNDM3XHUwNDMwXHUwNDNhXHUwNDMwXHUwNDM3XHUwNDMwIDI5NyIsImFtb3VudCI6NjAwMCwic3VjY2Vzc1VybCI6Imh0dHA6XC9cL25ldmNsYXNzLnNzLnNwaWRlci5wbGF5bmV4dC5uZXQ6NDAwODhcL2V4Y3Vyc2lvbnNcL21ldGVvcnktdi1wZXRlcmdvZj9zdWNjZXNzPXRydWUiLCJmYWlsVXJsIjoiaHR0cDpcL1wvbmV2Y2xhc3Muc3Muc3BpZGVyLnBsYXluZXh0Lm5ldDo0MDA4OFwvZXhjdXJzaW9uc1wvbWV0ZW9yeS12LXBldGVyZ29mP2Vycm9yPXRydWUiLCJkYXRhIjp7ImRlYnVnIjoiMSIsImZkUmVjZWlwdCI6eyJ0YXhTeXN0ZW0iOiIiLCJpdGVtcyI6W3sidGV4dCI6Ilx1MDBhYlx1MDQxZlx1MDQzNVx1MDQ0Mlx1MDQzNVx1MDQ0MFx1MDQzM1x1MDQzZVx1MDQ0NFx1MDBiYiBcdTA0MThcdTA0M2RcdTA0M2VcdTA0NDFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0M2RcdTA0MzVcdTA0NDYgMTFcLzYiLCJwcmljZSI6IjYwMDAuMDAwMCIsInF1YW50aXR5IjoiMS4wMDAwIn1dfX19",
          signature: "b0d57ff6108a09c3a5c236936db870e28b5251667ef950b7616ef9387675f574"
        }
        const url =  "https://oos.pscb.ru/pay/";
        axios.get(url, data);
      },

      onSubmit() {
        // validate
        let error = null;
        if (!this.excursionForm.date) error = "Выберите дату";
        else if (!this.excursionForm.time) error = "Выберите время";
        else if (!this.excursionForm.name) error = "Введите ваше имя";
        else if (!this.excursionForm.phone) error = "Введите номер телефона";
        //else if (!this.excursionForm.phone || !this.excursionForm.phone.match(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/)) error = "корректный телефон";
        else if (
          !this.excursionForm.email ||
          !this.excursionForm.email.match(/.+\@.+/)
        )
          error = "Введите корректный email";

        if (error) {
          this.error(error);
          return;
        }

        const places = {};
        this.placesByDate.forEach(({code, value, id}, index) => {
          if (this.placesVModel[index])
            places[code] = {
              [id]: this.placesVModel[index],
            };
        });
        const params = {...this.excursionForm, ...places, code: this.$route.params.code};

        this.$store
          .dispatch("post", {
            action: "OrderExcursion",
            params,
          })
          .then((res) => {
            const data =
              res &&
              res.page &&
              res.page.OrderExcursion &&
              res.page.OrderExcursion.result;
            if (!data) {
              this.status(
                "error",
                "Ошибка",
                "В наличии не осталось нужного количества билетов"
              );
            } else {
              console.group("OrderInfo");
              console.log("isOrderSave:", data.isOrderSave);
              console.log("isEmailSend:", data.isEmailSend);
              console.log("paymnetData:", data.paymentRequest);
              const {url} = data.paymentRequest;
              // TODO не используем виджет так как на новый версиях сафари форма не отрабатывает
              // const self = this;
              // const payment = {
              //   ...data.paymentRequest,
              //   successFunction() {
              //     self.status("success");
              //   },
              //   failFunction() {
              //     self.status("error");
              //   },
              //   closeFunction() {
              //     // self.status(
              //     //   "error",
              //     //   "Заказ не оплачен",
              //     //   "Вы закрыли форму не оплатив заказ"
              //     // );
              //   },
              // };

              // $showPayment(payment);
              // api(url, {
              //   method: 'POST',
              //   data: data.paymentRequest,
              // }).catch((e) => {
              //   console.error(e);
              // })
              // axios.post(url, data.paymentRequest).catch((e) => {
              //   console.error(e);
              // })
              this.bankForm = data.paymentRequest;
              this.$nextTick().then(() => {
                const form = document.querySelector('#bankForm');
                if (!form) {
                  console.log('Bank from not found');
                  return;
                }

                form.submit();
                console.log();
              });
              console.groupEnd();
            }
          })
          .catch((e) => {
            this.status(
              "error",
              "Ошибка",
              "В наличии не осталось нужного количества билетов"
            );
            console.error(e);
          });
      },

      resetFields() {
        this.isFormSent = false;
        this.excursionForm.date = "";
        this.excursionForm.time = "";
        this.excursionForm.name = "";
        this.excursionForm.phone = "";
        this.excursionForm.email = "";
        this.excursionForm.text = "";
        this.adults = 1;
        this.children = 0;
        this.foreigners = 0;
      },
      fillForm() {
        this.excursionForm.name = "test-playnext";
        this.excursionForm.phone = "+7 (000) 000-00-00";
        this.excursionForm.email = "test@playnext.ru";
        this.excursionForm.text = "playnext test";
      },

      error(msg) {
        setTimeout(
          () =>
            this.$message({
              showClose: false,
              message: msg,
              type: "error",
            }),
          500
        );
      },
    },
    mounted() {
    },
  };
</script>

<style lang="scss"></style>
