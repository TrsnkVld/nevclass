<template>
<main class="wrapper faqPage">
	<main-section :pageData="page" />
	<text-block class="yellow single" data-aos-anchor=".header" :textDataL="text" />
	<collapse-wrap :itemsDelay="1400" :data="items" />
	<faq-form title="Не нашли ответа на свой вопрос?" emailPlaceholder="Ваш вопрос" data-aos="bg-anim" />
	<map-section
		mapId="mapContacts"
		:coords="['31.16','59.95']"
		:mapZoom="10"
		class="mapContacts"
		data-aos="flip-down" 
	/>
</main>
</template>

<script>
import mainSection from './excursion/main-section';
import mapSection from './home/map-section';
import faqForm from './elements/order-forms/faq-form';
import collapseWrap from './faq/collapse-wrap';
import textBlock from './elements/text-block';

export default {
	name: 'faq',
	components: {
		mainSection,
		mapSection,
		faqForm,
		collapseWrap,
		textBlock
	},
	data: () => ({
		page: {
			title: 'Часто задаваемые вопросы',
			bg: require(`../assets/img/faq.jpg`),
		},
		text: 'Итак, вы решили устроить незабываемую речную прогулку по живописному Санкт-Петербургу. У большинства клиентов сразу возникает масса вопросов. Чтобы сэкономить ваше и свое время, мы решили дать ответы на наиболее распространенные из них.',
	}),
	computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.FAQs) return null;
            return this.$store.state.page.FAQs;
		},

		items() {
			if (!this.pageData) return null;
			return this.pageData.items;
		}

	}
}
</script>

<style lang="less">
@import "../less/variables";


.faqPage {
	.mainSection {
		background-position: 100% 25%;
	}

	.textBlock {
		animation-delay: .8s !important;

		&__rows {
			transition-delay: 1.2s !important;
		}
	}

	.formWrap {
		//animation-delay: 0s !important;
		.aos-animate {
			animation-delay: 0s !important;
		}
	}
}
</style>