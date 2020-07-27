<template>
	<div class="formWrap formWrap-header">
		<el-container direction="vertical">
			<el-form :model="headerForm" class="feedbackForm">
				<el-row :gutter="20">
					<el-col class="feedbackForm__name" :span="24">
						<el-form-item prop="name">
							<el-input placeholder="Имя" v-model="headerForm.name" />
						</el-form-item>
					</el-col>
					<el-col class="feedbackForm__phone" :span="24">
						<el-form-item prop="phone">
							<el-input v-mask="'+7 (###) ###-##-##'" placeholder="Номер телефона" v-model="headerForm.phone" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<h6 class="feedbackForm__warning">Нажимая “Перезвонить”, Вы соглашаетесь с <router-link :to="{name: 'policy'}" target="_blank">политикой обработки персональных данных</router-link></h6>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">Перезвонить</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-container>
		

		<transition name="formWrap__thanks">
			<el-container direction="vertical" class="formWrap__thanks" v-if="isFormSent" @click.native="resetFields()">
				<h1>Спасибо за заявку!</h1>
				<h3>Перезвоним Вам в ближайшее время</h3>
			</el-container>
		</transition>
	</div>
</template>

<script>
import {mask} from 'vue-the-mask'

export default {
	name: 'header-form',
	directives: {mask},
	data:() => ({
		isFormSent: false,
	}),
	computed: {
		headerForm() {
			return this.$store.state.headerForm;
        },
	},
    methods: {   
		onSubmit() {
			let error = null;
			if (!this.headerForm.name) error = "Введите ваше имя"
			else if (!this.headerForm.phone) error = "Введите номер телефона"

			if (error) {
				this.error(error);
				return;
			}

			//TODO Заменить TEST на контроллер, как будет готов
			this.$store.dispatch('post', {action: "CallSubmit", params: this.headerForm})
				.then((res) => {
					if (res.page.CallSubmit.result === 'ok') {
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
			this.headerForm.name = "";
			this.headerForm.phone = "";
			this.$emit('onFormSent');
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
@import '../../../less/variables';

.formWrap-header {
	width: 100%;
	height: 100%;
	background: transparent;
	box-sizing: border-box;
	padding: 0;
	display: flex;

	& > .el-container {
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

	.formWrap__thanks {
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
</style>