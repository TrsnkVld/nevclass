<template>
	<section class="formWrap" data-aos="bg-anim" >
		<el-container direction="vertical" data-aos="fade-down" data-aos-delay="400">
			<h2 v-if="title" class="sectionTitle">
				{{title}}
			</h2>
			<el-form :model="faqForm" class="feedbackForm">
				<el-row :gutter="20">
					<el-col class="feedbackForm__name" :span="24">
						<el-form-item prop="name">
							<el-input placeholder="Имя" v-model="faqForm.name" />
						</el-form-item>
					</el-col>
					<el-col class="feedbackForm__email" :span="24">
						<el-form-item prop="email">
							<el-input placeholder="Электронная почта" v-model="faqForm.email" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item prop="text">
							<el-input placeholder="Ваш вопрос" type="textarea" v-model="faqForm.msg" />
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
				<h1>Спасибо за вопрос!</h1>
				<h3>Мы свяжемся с Вами в ближайшее время</h3>
			</el-container>
		</transition>
	</section>
</template>

<script>
import {mask} from 'vue-the-mask'

export default {
	name: 'faq-form',
	directives: {mask},
	props: {
		shipName: {
			type: String,
			default: ''
		},
		title: String,
	},
	data: () => ({
		isFormSent: false,
	}),
	computed: {
		faqForm() {
			return this.$store.state.faqForm;
        },
	},
    methods: {   
		onSubmit() {
			let error = null;
			if (!this.faqForm.name) error = "Введите ваше имя"
			else if (!this.faqForm.email || !this.faqForm.email.match(/.+\@.+/)) error = "Введите корректный email";
			
			if (error) {
				this.error(error);
				return;
			}

			this.$store.dispatch('post', {action: "FAQSubmit", params: this.faqForm})
				.then((res) => {
					if (res.page.FAQSubmit.result === 'ok') {
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
			this.faqForm.name = "";
			this.faqForm.email = "";
			this.faqForm.msg = "";
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