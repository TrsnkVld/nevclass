<template>
<component :is="tag" class="scrollBtnWrap">
	<slot></slot>
	<buy-button :elName="scrollTo" :btnText="btnText" />
</component>
</template>

<script>
import buyButton from './buy-button';

export default {
	name: 'scroll-btn-wrap',
	components: {
		buyButton
	},
	props: [
		'tag',
		'scrollTo',
		'btnText'
	]
}
</script>

<style lang="less">


.scrollBtnWrap {
	&.in-viewport {
		.fixedBtn {
			transform: translateY(150%);
			opacity: 0;
			visibility: hidden;
		}
	}
}
</style>