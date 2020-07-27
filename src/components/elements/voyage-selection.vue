<template>
	<section class="voyageSelection">
		<el-container direction="vertical">
			<h2 data-aos="fade-down" data-aos-anchor=".voyageSelection" class="sectionTitle">Выберите рейс</h2>
			<filter-btns data-aos="fade-down" data-aos-anchor=".voyageSelection" data-aos-delay="200" type="voyage" :date="date" :time="time" @onDateOptionClick="isDatePicked=true" @onTimeOptionClick="isTimePicked=true" />
			<feedback-form type="ship" title="Выберите рейс" emailPlaceholder="Комментарий" data-aos="bg-anim" />
			<!--
			<seats-layout :isDatePicked="isDatePicked" :isTimePicked="isTimePicked" />
			-->
		</el-container>
	</section>
</template>

<script>
import filterBtns from '../elements/filter-btns';
import seatsLayout from '../elements/seats-layout';
import feedbackForm from './feedback-form';

export default {
	name: 'voyage-selection',
	props: {
		date: Array,
		time: Array,
	},
	components: {
		filterBtns,
		seatsLayout,
		feedbackForm
	},
	data: () => ({
		isDatePicked: false,
		isTimePicked: false,
	}),
}
</script>

<style lang="less">
@import '../../less/variables.less';

.voyageSelection {
	padding-bottom: 40px;

	&.in-viewport {
		.fixedBtn {
			transform: translateY(150%);
			opacity: 0;
			visibility: hidden;
		}
	}

	.up(@sm;{
		padding-bottom: 80px;
	})
}
</style>