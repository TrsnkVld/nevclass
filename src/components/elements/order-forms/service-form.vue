<template>
	<section class="formWrap formWrap-service">
		<el-form :model="serviceForm" class="feedbackForm">
			<el-container class="formWrap-service__date" direction="vertical" data-aos="bg-anim" data-aos-delay="400">
				<div class="formWrap-service-inner" data-aos="fade-down" >
					<h2 class="sectionTitle">
						<span class="sectionTitle__step">2</span>
						Выберите желаемую дату
					</h2>
					<el-row :gutter="20">
						<el-col class="feedbackForm__date" :span="24" :sm="{span: 12}">
							<el-form-item prop="date" >
								<el-date-picker :class="{'is-focus': pickerOpened}" v-model="serviceForm.date" :picker-options="pickerOptions" placeholder="Дата" format="dd.MM.yyyy" value-format="dd.MM.yyyy" @focus="pickerOpened=true" @blur="pickerOpened=false" />
							</el-form-item>
						</el-col>
						<el-col class="feedbackForm__time" :span="24" :sm="{span: 12}">
							<el-form-item prop="time">
								<el-time-select
									v-model="serviceForm.time"
									:disabled="!serviceForm.date"
									:picker-options="{
										selectableRange: '18:30:00 - 20:30:00'
									}"
									:is-range="true"
									format="hh:mm:ss A"
									value-format="hh:mm:ss A"
									placeholder="Время"
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-container>
			<el-container class="formWrap-service__contact" direction="vertical" data-aos="bg-anim" data-aos-delay="400" data-aos-anchor=".formWrap-service__date"> 
				<div class="formWrap-service-inner" data-aos="fade-down" >
					<h2 class="sectionTitle">
						<span class="sectionTitle__step">3</span>
						Оформите заявку
					</h2>
					<el-row :gutter="20">
						<el-col class="feedbackForm__name" :span="24">
							<el-form-item prop="name">
								<el-input placeholder="Имя" v-model="serviceForm.name" />
							</el-form-item>
						</el-col>
						<el-col class="feedbackForm__email" :span="24">
							<el-form-item prop="email" >
								<el-input placeholder="Электронная почта" v-model="serviceForm.email" />
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<h6 class="feedbackForm__warning">Нажимая “Отправить заявку”, Вы соглашаетесь с <router-link :to="{name: 'policy'}" target="_blank">политикой обработки персональных данных</router-link></h6>
							<el-form-item>
								<el-button type="primary" @click="onSubmit">Отправить заявку</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-container>
		</el-form>
		

		<transition name="formWrap__thanks">
			<el-container direction="vertical" class="formWrap__thanks" v-if="isFormSent" @click.native="resetFields()">
				<h1>Спасибо, что выбрали нас</h1>
				<h3>Желаем Вам приятного времяпрепровождения</h3>
			</el-container>
		</transition>
	</section>
</template>

<script>
import {mask} from 'vue-the-mask'

export default {
	name: 'service-form',
	directives: {mask},
	data: () => ({
		isFormSent: false,
		pickerOpened: false,
        pickerOptions: {
			firstDayOfWeek: 1,
			disabledDate(time) {
				return time.getTime() < Date.now() - 8.64e7;
			}
        },
	}),
	computed: {
		serviceForm() {
			return this.$store.state.serviceForm;
        },
	},
    methods: {   
		onSubmit() {
			let error = null;
			if (!this.serviceForm.date) error = "Выберите дату"
			else if (!this.serviceForm.time) error = "Выберите время"
			else if (!this.serviceForm.name) error = "Введите ваше имя"
			//else if (!this.serviceForm.phone || !this.serviceForm.phone.match(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/)) error = "корректный телефон";
			else if (!this.serviceForm.email || !this.serviceForm.email.match(/.+\@.+/)) error = "Введите корректный email";

			if (error) {
				this.error(error);
				return;
			}

			this.$store.dispatch('post', {action: "TEST", params: this.shipForm})
				.then((res) => {
					if (res.page.TEST.result === 'ok') {
						this.isFormSent = true;
						setTimeout(() => {
							this.resetFields();
						}, 3000);
					} else {
						this.$alert("Что-то пошло не так. Пожалуйста, повторите попытку еще раз. Мы также будем очень признательны за звонок!", "Ошибка").then(() => {});
					}
				});

        },
        
		resetFields() {
			this.isFormSent = false;
			this.serviceForm.date = "";
			this.serviceForm.time = "";
			this.serviceForm.name = "";
			this.serviceForm.email = "";
		},
		
		error(msg) {
			setTimeout(() => this.$message({
				showClose: false,
				message: msg,
				type: 'error'
			}), 500);
        },
	},
	
}
</script>

<style lang="less">
@import "../../../less/variables";

.formWrap-service {
	padding: 0;

	&__contact {
		padding: 35px 20px 0;
		background-color: @bg;
	}

	&-inner {
		max-width: 660px;
		margin: 0 auto;
	}

	.feedbackForm {
		max-width: none;
		&__date,
		&__time,
		&__name,
		&__email {
			flex: 1 0 250px;
		}

		

	.formWrap-service__date,
	.formWrap-service__contact {
		padding: 35px 20px 0;
		background-color: @bg;

		.up(@sm;{
			//padding: 80px 20px 50px;
			padding: 75px 80px 35px;
		});

		.up(@md;{
			//padding: 80px 80px 50px;
		});
	}

	.formWrap-service__contact {
		background-color: @disabled;
	}
	}
}
</style>