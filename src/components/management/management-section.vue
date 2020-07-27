<template>
	<el-container class="managementSection">
		<el-row :gutter="20">
			<person-card v-for="(person, index) in teamData"
			:key="index"
			:name="person.NAME"
			:position="person.POST"
			:email="person.EMAIL"
			:photo="person.image"
			data-aos="fade-down"
			:data-aos-delay="(index+1)*150+cardsDelay"
			data-aos-anchor=".managementSection"
			/>
		</el-row>
	</el-container>
</template>

<script>
import personCard from './person-card';

export default {
	name: 'management-section',
	props: {
		teamData: {
			type: Array,
			default: function(){return []},
		},
		cardsDelay: {
			type: Number,
			default: 0,
		}
	},
	components: {
		personCard,
	}
}
</script>

<style lang="less">
@import "../../less/variables";

.managementSection {
	padding-top: 20px;

	.el-row {
		flex-shrink: 0;
    	flex: auto;
	}

}
</style>