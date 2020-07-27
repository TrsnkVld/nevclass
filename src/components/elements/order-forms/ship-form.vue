<template>
  <section class="formWrap" data-aos="bg-anim" @click="test">
    <el-container
      direction="vertical"
      data-aos="fade-down"
      data-aos-delay="400"
    >
      <slot></slot>
      <h2 class="sectionTitle">
        Забронируйте теплоход
        <span @clikc="fillForm" v-if="shipName">«{{ shipName }}»</span>
      </h2>
      <el-form :model="shipForm" class="feedbackForm">
        <el-row :gutter="20">
          <el-col class="feedbackForm__date" :span="24" :sm="{ span: 12 }">
            <el-form-item prop="date">
              <el-date-picker
                :class="{ 'is-focus': pickerOpened }"
                v-model="shipForm.date"
                :picker-options="pickerOptions"
                placeholder="Дата"
                format="dd.MM.yyyy"
                value-format="dd.MM.yyyy"
                @focus="pickerOpened = true"
                @blur="pickerOpened = false"
              />
            </el-form-item>
          </el-col>
          <el-col class="feedbackForm__time" :span="24" :sm="{ span: 12 }">
            <el-form-item prop="time">
              <el-time-select
                v-model="shipForm.time"
                :disabled="!shipForm.date"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:30',
                }"
                :is-range="true"
                format="hh:mm:ss A"
                value-format="hh:mm:ss A"
                placeholder="Время"
              />
            </el-form-item>
          </el-col>

          <transition name="show-form">
            <div v-if="shipForm.date && shipForm.time">
              <el-col
                v-if="$route.name === 'service' || $route.name === 'tariffs'"
                class="feedbackForm__ship"
                :span="24"
              >
                <el-form-item prop="ship">
                  <el-select
                    v-model="shipForm.shipId"
                    placeholder="Теплоход"
                    class="white"
                  >
                    <el-option
                      v-for="(item, index) in shipsList"
                      :key="index"
                      :label="item.NAME"
                      :value="item.ID"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="feedbackForm__name" :span="24">
                <el-form-item prop="name">
                  <el-input placeholder="Имя" v-model="shipForm.name" />
                </el-form-item>
              </el-col>
              <el-col class="feedbackForm__phone" :span="24">
                <el-form-item prop="phone">
                  <el-input
                    v-mask="'+7 (###) ###-##-##'"
                    placeholder="Номер телефона"
                    v-model="shipForm.phone"
                  />
                </el-form-item>
              </el-col>
              <el-col class="feedbackForm__email" :span="24">
                <el-form-item prop="email">
                  <el-input
                    placeholder="Электронная почта"
                    v-model="shipForm.email"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="text">
                  <el-input
                    placeholder="Комментарий"
                    type="textarea"
                    v-model="shipForm.text"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="option">
                  <el-select
                    v-model="shipForm.сonfirmOptions"
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
                    >Забронировать</el-button
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
  </section>
</template>

<script>
  import { mask } from "vue-the-mask";
  import { $showPayment } from "@/utils/utils.js";

  export default {
    name: "ship-form",
    directives: { mask },
    props: {
      shipName: {
        type: String,
        default: "",
      },
      shipsList: {
        type: Array,
        default: () => {},
      },
    },
    data: () => ({
      isFormSent: false,
      pickerOpened: false,
      pickerOptions: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          //Апрель, Май, Сентябрь, Октябрь, Июнь, Июль, Август
          const monthIndex = [3, 4, 5, 6, 7, 8, 9];
          return time.getTime() < Date.now() - 8.64e7 || monthIndex.indexOf(time.getMonth()) === -1;
        },
      },
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
    }),
    computed: {
      shipForm() {
        return this.$store.state.shipOrderForm;
      },
    },
    methods: {
      test() {
        // console.warn(this.shipForm);
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
        }, 2500);
      },
      onSubmit() {
        // validate
        let error = null;
        if (!this.shipForm.date) error = "Выберите дату";
        else if (!this.shipForm.time) error = "Выберите время";
        else if (!this.shipForm.name) error = "Введите ваше имя";
        else if (!this.shipForm.phone) error = "Введите номер телефона";
        //else if (!this.shipForm.phone || !this.shipForm.phone.match(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/)) error = "корректный телефон";
        else if (!this.shipForm.email || !this.shipForm.email.match(/.+\@.+/))
          error = "Введите корректный email";

        if (error) {
          this.error(error);
          return;
        }

        this.$store
          .dispatch("post", { action: "OrderShip", params: this.shipForm })
          .then((res) => {
            const data =
              res &&
              res.page &&
              res.page.OrderShip &&
              res.page.OrderShip.result;
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
              const self = this;
              const payment = {
                ...data.paymentRequest,
                successFunction() {
                  self.status("success");
                },
                failFunction() {
                  self.status("error");
                },
                closeFunction() {
                  // self.status(
                  //   "error",
                  //   "Заказ не оплачен",
                  //   "Вы закрыли форму не оплатив заказ"
                  // );
                },
              };
              if (data.isOrderSave) {
                self.status("success");
              }
              // TODO: онлайн оплаты для бронирование кораблей не подлкючаем
              // $showPayment(payment);
              console.groupEnd();
            }
          })
          .catch((e) => {
            console.error(e);
            this.status(
              "error",
              "Ошибка",
              "Для выбранной даты в наличии не осталось нужного количества билетов"
            );
            console.groupEnd();
          });
      },

      resetFields() {
        this.isFormSent = false;
        this.shipForm.date = "";
        this.shipForm.time = "";
        this.shipForm.name = "";
        this.shipForm.phone = "";
        this.shipForm.email = "";
        this.shipForm.text = "";
      },

      fillForm() {
        this.shipForm.name = "test-playnext";
        this.shipForm.phone = "+7 (000) 000-00-00";
        this.shipForm.email = "test@playnext.ru";
        this.shipForm.text = "playnext test";
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
  };
</script>
