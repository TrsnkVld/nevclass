<template>
<div class="fixedBtn">
	<el-button  data-aos="fade-down" type="success" v-scroll-to="elName">{{btnText}}</el-button>
</div>
</template>

<script>
export default {
	name: 'buy-button',
	props: {
		elName: {
			default: '.fixedBtn'
		},
		btnText: {
			default: 'Купить'
		}
	}
}
</script>

<style lang="less">
@import '../../less/variables.less';

.fixedBtn {
	position: fixed;
	top: calc(100% - 80px);
	left: 0;
	width: 100vw;
	display: flex;
	justify-content: center;
	z-index: 200;
	opacity: 1;
	visibility: visible;
	transition: .6s;
	pointer-events: none;

	.el-button {
		pointer-events: all;
		transition-delay: 3s;
		width: auto;
		box-shadow: 0px 20px 20px rgba(0, 21, 53, 0.12);
		min-width: 170px;

		&:hover {
			box-shadow: 0px 20px 20px rgba(0, 255, 163, 0.5);
		}

		&:active {
			color: @black;
			background-color: #00E995;
		}

		.up(@sm;{
			min-width: 260px;
		});
	}

	&.hide {
		transform: translateY(150%);
		opacity: 0;
		visibility: hidden;
	}

	.up(@sm;{
		top: calc(100% - 140px);
	});
}

</style>