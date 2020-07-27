<template>
	<section class="formWrap" data-aos="bg-anim" >
		<el-container direction="vertical" data-aos="fade-down" data-aos-delay="400">
			<el-form :model="feedbackForm" class="feedbackForm">
				<el-row :gutter="20">
					<el-col class="feedbackForm__name" :span="24">
						<el-form-item prop="name">
							<el-input placeholder="Имя" v-model="feedbackForm.name" />
						</el-form-item>
					</el-col>
					<el-col class="feedbackForm__email" :span="24">
						<el-form-item prop="email">
							<el-input placeholder="Электронная почта" v-model="feedbackForm.email" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item prop="text">
							<el-input placeholder="Ваш отзыв" type="textarea" v-model="feedbackForm.msg" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<h6 class="feedbackForm__warning">Нажимая “Отправить”, Вы соглашаетесь с <router-link :to="{name: 'policy'}" target="_blank">политикой обработки персональных данных</router-link></h6>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">Отправить</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-container>
		

		<transition name="formWrap__thanks">
			<el-container direction="vertical" class="formWrap__thanks" v-if="isFormSent" @click.native="resetFields()">
				<h1>Спасибо за отзыв!</h1>
				<h3>Это очень ценно для нас</h3>
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
		shipName: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		isFormSent: false,
	}),
	computed: {
		feedbackForm() {
			return this.$store.state.feedbackForm;
        },
	},
    methods: {   
		onSubmit() {
			let error = null;
			if (!this.feedbackForm.name) error = "Введите ваше имя"
			else if (!this.feedbackForm.email || !this.feedbackForm.email.match(/.+\@.+/)) error = "Введите корректный email";
			
			if (error) {
				this.error(error);
				return;
			}

			this.$store.dispatch('post', {action: "ClaimSubmit", params: this.feedbackForm})
				.then((res) => {
					if (res.page.ClaimSubmit.result === 'ok') {
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
			this.feedbackForm.name = "";
			this.feedbackForm.email = "";
			this.feedbackForm.msg = "";
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