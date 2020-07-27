<template>
	<section class="formWrap" :class="{'formWrap-small': type=='request'}" @click="test">
		<el-container direction="vertical" data-aos="fade-down" data-aos-delay="400">
			<h2 v-if="title" class="sectionTitle">
				<span class="sectionTitle__step" v-if="type=='request'">3</span>
				{{title}}
			</h2>
			<el-form :model="form" ref="ruleForm" class="feedbackForm">
				<el-row :gutter="20">
					<template v-if="type=='ship' || type=='excursion'">
						<el-col class="feedbackForm__date" :span="24" :sm="{span: 12}">
							<el-select v-if="type=='excursion'" v-model="form.date" placeholder="Дата" class="el-select-date">
								<el-option
									v-for="(item, index) in Object.keys(testArray2)"
									:key="index"
									:label="item"
									:value="item"
								/>
							</el-select>
							<el-form-item prop="date" v-else>
								<el-date-picker :class="{'is-focus': pickerOpened}" v-model="form.date" :picker-options="pickerOptions" placeholder="Дата" format="dd.MM.yyyy" value-format="dd.MM.yyyy" @focus="pickerOpened=true" @blur="pickerOpened=false" />
							</el-form-item>
						</el-col>
						<el-col class="feedbackForm__time" :span="24" :sm="{span: 12}">
							<el-select  v-if="type=='excursion'" v-model="form.time" :disabled="!form.date" placeholder="Время" class="el-select-time">
								<el-option
									v-for="(item, index) in times"
									:key="index"
									:label="item"
									:value="item"
								/>
							</el-select>
							<el-form-item prop="time" v-else >
								<el-time-select
									v-model="form.time"
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
					</template>

					<transition name="show-form">
						<div v-if="form.date && form.time && type=='excursion'" class="show-form ticket-types">
							<el-col :span="8" class="ticket-types__single">
								<h4>Взрослый</h4>
								<el-input-number v-model="form.adults[ticketTypes]" :min="0" :max="30"  />
							</el-col>
							<el-col :span="8" class="ticket-types__single">
								<h4>Ребёнок</h4>
								<el-input-number v-model="form.children[ticketTypes]" :min="0" :max="30" />
							</el-col>
							<el-col :span="8" class="ticket-types__single">
								<h4>Иностранец</h4>
								<el-input-number v-model="form.foreigners" :min="0" :max="30" />
							</el-col>
						</div>
					</transition>

					<transition name="show-form">
						<div v-if="form.date && form.time && type=='excursion' || type=='ship' || type=='header'" class="show-form">
							<el-col class="feedbackForm__name" :span="24">
								<el-form-item prop="name">
									<el-input placeholder="Имя" v-model="form.name" />
								</el-form-item>
							</el-col>
							<el-col class="feedbackForm__phone" :span="24">
								<el-form-item prop="phone">
									<el-input v-mask="'+7 (###) ###-##-##'" placeholder="Номер телефона" v-model="form.phone" />
								</el-form-item>
							</el-col>
							<el-col class="feedbackForm__email" :span="24">
								<el-form-item prop="email" >
									<el-input placeholder="Электронная почта" v-model="form.email" />
								</el-form-item>
							</el-col>
							<el-col :span="24" v-if="type!=='request' && type!=='header'">
								<el-form-item prop="text">
									<el-input :placeholder="emailPlaceholder" type="textarea" v-model="form.text" />
								</el-form-item>
							</el-col>
							<el-col :span="24" v-if="type=='header'">
								<el-form-item prop="option">
									<el-select v-model="form.сonfirmOptions" :placeholder="options[0].label" class="el-select-list white">
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
								<h6 class="feedbackForm__warning">Нажимая “{{btnText}}”, Вы соглашаетесь с <router-link :to="{name: 'policy'}" target="_blank">политикой обработки персональных данных</router-link></h6>
								<el-form-item>
									<el-button type="primary" @click="onSubmit">{{btnText}}</el-button>
								</el-form-item>
							</el-col>
						</div>
					</transition>
				</el-row>
			</el-form>
		</el-container>
		

		<transition name="formWrap__thanks">
			<el-container direction="vertical" class="formWrap__thanks" v-if="thanks" @click.native="hideThanks()">
				<h1 v-if="type=='header' || type=='ship'">Спасибо за заявку!</h1>
				<h1 v-else>Спасибо за отзыв!</h1>
				<h3 v-if="type=='header'">Перезвоним Вам в ближайшее время</h3>
				<h3 v-else>Это очень ценно для нас</h3>
			</el-container>
		</transition>
	</section>
</template>

<script>
import {mask} from 'vue-the-mask'

export default {
	name: 'feedback-form',
	directives: {mask},
	props: {
		type: String,
		title: {
			default: false
		},
		emailPlaceholder: {
			default: 'Ваш отзыв'
		},
		btnText: {
			type: String,
			default: 'Отправить'
		}
	},
	data: () => ({
		test1: '',
		testArray: [],
		testArray2: [],
		testArray3: [],
        options: [
			{
				value: 'Телефонный звонок от менеджера компании',
				label: 'Телефонный звонок от менеджера компании'
			}, 
			{
				value: 'Смс-оповещение',
				label: 'Смс-оповещение'
			}, 
			{
				value: 'Электронное письмо на почту',
				label: 'Электронное письмо на почту'
			}, 
		],
		pickerOpened: false,
        date: [
			{
				value: 'Opt1',
				label: '25.07.19 '
			}, {
				value: 'Opt2',
				label: '27.07.19'
			}, {
				value: 'Opt3',
				label: '29.07.19'
			}, {
				value: 'Opt4',
				label: '31.07.19'
			}, {
				value: 'Opt5',
				label: '02.08.19'
			}, {
				value: 'Opt6',
				label: '04.08.19'
			}
		],
        time: [
			{
				value: 'Option1',
				label: '11:30 '
			}, {
				value: 'Option2',
				label: '12:00'
			}, {
				value: 'Option3',
				label: '13:30'
			}, {
				value: 'Option4',
				label: '14:00'
			}, {
				value: 'Option5',
				label: '15:30'
			}, {
				value: 'Option6',
				label: '16:00'
			}
		],
        valueDate: 'Дата',
        valueTime: 'Время',
		thanks: false,
		ruleForm: {
			date: '',
			time: '',
			name: '',
			email: '',
			text: ''
		},
		rules: {
			name: [
				{  required: true, message: 'Пожалуйста, введите Ваше имя', trigger: ['change', 'submit']},
			],
			phone: [
				{  required: true, message: 'Пожалуйста, введите Ваш телефон', trigger: ['change', 'submit']},
			],
			email: [
				{  required: true, message: 'Пожалуйста, введите адрес Вашей электронной почты', type: 'email', trigger: ['submit']},
			],
			text: [
				{  required: true, message: 'Пожалуйста, введите Ваш отзыв', trigger: ['change', 'submit']}
			],
		},
        pickerOptions: {
			firstDayOfWeek: 1,
        },
        valueDate: '',
        valueTime: '',
	}),
	computed: {
		form() {
			if(this.type=='excursion') return this.$store.state.orderForm
			else return this.$store.state.shipOrderForm;
		},
		tested() {
			// TODO: get rid of checking page.ExcursionPage
			if (this.$store.state.page.ExcursionPage) {
				return this.$store.state.page.ExcursionPage.excursion;
			}
			return {};
		},
		offers() {
			// todo: put excursion access here
			return this.tested.offers;
		},
		dates() {
			return this.offers.filter(el=>{
				// TODO: find unique items by date
			});
		},
		times() {
			return this.offers.filter(el=>{
				//todo: let date = some date extracted from el.date string
				return this.form.date === date;
			}).map(el=>{
				// todo: let time = some time extracted from al.date string
				return {
					time
				};
			});
		},
		ticketTypes() {
			return this.offers.filter(el=>{
				//todo: let date = some date extracted from el.date string
				//todo: let time = some time extracted from al.date string
				return this.form.date === date && this.form.time === time;
			}).map(el=>{
				return {
					id: el.ID,
					label: el.NAME
				};
			});
		}
	},
    methods: {
		dedupe() {
			const keys = Object.keys(this.testArray2);
			keys.forEach(element => {
				//console.log(element);
				
				let unique = new Set(this.testArray2[element]);
				let go = [...unique];

				this.testArray3[element] = go;

				//this.testArray3.push({[element]: go})
			});
				//console.log(this.testArray3);
		},
		test() {
			console.log(this.$store.state.shipOrderForm);
		},

		hideThanks() {
			this.thanks = false;
			this.form.date = "";
			this.form.time = "";
			this.form.name = "";
			this.form.phone = "";
			this.form.email = "";
			this.form.text = "";
			this.$emit('onFormSent');
		},
		onSubmit() {
			// validate
			let error = null;
			if (!this.form.date) error = "Выберите дату"
			else if (!this.form.time) error = "Выберите время"
			else if (!this.form.name) error = "Введите ваше имя"
			else if (!this.form.phone) error = "Введите номер телефона"
			//else if (!this.form.phone || !this.form.phone.match(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/)) error = "корректный телефон";
			else if (!this.form.email || !this.form.email.match(/.+\@.+/)) error = "Введите корректный email";
			/*
			if ( !error ) {
				if (!this.form.isAgreed) error = ", что Вы согласны с обработкой персональных данных";
			}
			*/
			if (error) {
				this.error(error);
				return;
			}

			this.$store.dispatch('post', {action: "OrderShip", params: this.$store.state.shipOrderForm})
				.then((res) => {
					if (res.page.OrderShip.status === 'OK') {
						this.thanks = true;
						setTimeout(() => {
							this.hideThanks();
						}, 3000);
					} else {
						this.$alert("Что-то пошло не так. Пожалуйста, повторите попытку еще раз. Мы также будем очень признательны за звонок!", "Ошибка").then(() => {});
					}
				});
			});

		},
		
		error(msg) {
			setTimeout(() => this.$message({
				showClose: false,
				message: msg,
				type: 'error'
			}), );
		}
	},
	mounted() {
	//	console.log(this.tested.offers);
	

		if (this.type=='excursion') {
			let ar = [];

			this.testArray = this.tested.offers.map(function(item) {
				const splt = item.TIME.split(" ");
				return {
					ID: item.ID,
					date: splt[0],
					time: splt[1]

				}
			});

			const groupBy = (array, key) => {
				return array.reduce((result, currentValue) => {
					(result[currentValue[key]] = result[currentValue[key]] || []).push(
						currentValue.time
					);
					return result;
				}, {});
				
			};

			// Group by color as key to the person array
			this.testArray2 = groupBy(this.testArray, 'date');
			/*//console.log(ar);
			const unique = new Set(ar["17.04.2020"]);
			const go = [...unique];
			//console.log(ar);*/
			this.dedupe();
			
		}

		console.log('-----------------------')
 
		console.log(this.testArray);
		console.log(this.testArray2);
		console.log(this.testArray3);

		//console.log(this.dedupe(this.testArray2));

/*
		const removeDuplicates = (ar) => console.log(array.filter((a, b) => array.indexOf(a) === b))
		//console.log(ar);

		this.testArray2 = ar.map(function(x) {
			if (!this.testArray2.includes(x)) return this.testArray2.push(x);
		});
*/
		//console.log(Object.keys(this.testArray2))
	}
	
}
</script>

<style lang="less">
@import '../../less/variables';

.formWrap {
	padding: 40px 0 0;
	//background-color: @disabled;
	position: relative;
	overflow: hidden;
	background: linear-gradient(0deg, #ffffff 50%, #F2F4FA 0%);
	background-size: 100% 200%;
	background-position: 100% 100%;
	animation-fill-mode: forwards !important;

	.sectionTitle {
		padding-top: 0;
	}

	.el-container {
		.up(@sm;{
			padding: 0 80px;
		});
	}

	&-small {
		padding: 35px 0 0;
	
		.up(@sm;{
			padding: 85px 0 50px;
		});
	}

	&__thanks {
		position: absolute;
    	z-index: 5;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: @disabled;
		color: @black;

		h1 {
			color: @black;
			margin-bottom: 40px;
		}

		&-enter-active, &-leave-active {
			transition: .6s !important;
			opacity: 1;
			transform: translateY(0);
		}
		&-enter, &-leave-to {
			transition: .6s !important;
			opacity: 0;
			transform: translateY(-40px);
		}
	}

	&.headerForm {
		width: 100%;
		height: 100%;
		background: transparent;
		box-sizing: border-box;
		padding: 0;
		display: flex;

		.el-container {
			max-width: 400px;
			padding: 0;
			transition-delay: 0s !important;
		}

		h6 {
			color: #405068;
		}

		.el-row {
			height: 100%;
			padding: 0;
    		margin-top: 20px;

			* {
				width: 100%;
			}
		}

		.feedbackForm {
			margin: auto;

			&__warning {
				margin: 0 0 20px;

				.up(@sm;{
					margin: 20px 0 40px;
				});
			}
		}

		.formWrap {
			width: 100%;
			height: 100%;
			padding: 0;
			display: flex;
			align-items: center;

			&__thanks {
				display: flex;
				align-items: center;
				justify-content: center;
				max-width: none;
				background: #001535;

				h1,h3 {
					color: white;
				}
			} 
		}

	}
	
	.up(@sm;{
		padding: 80px 0 50px;
	});
}

.feedbackForm {
	margin: 0 auto;
	width: 100%;
	max-width: 590px;

	&__date, &__time {
		flex: 1 0 300px;
		width: auto;
	}

	&__warning {
		color: #B5BCC9; 
		margin-bottom: 40px;
		margin-top: 20px;

		a {
			transition: .2s;
			&:hover {
				color: @active;
			}
		}
	}

	.el-row {
		display: flex;
		flex-flow: wrap;
	}

	.el-button {
		margin: 0 auto;
		display: block;
	}

	.el-select {
		min-width: auto;
		margin-bottom: 20px;
	}
}

.show-form {

}

.ticket-types {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	&__single {
		padding: 0 10px;

		h4 {
			margin-bottom: 10px;
		}
	}
}
</style>