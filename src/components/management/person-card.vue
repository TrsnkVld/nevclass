<template>
	<el-col :span="24" :sm="{span: 12}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}" >
		<div class="personCard" 
		:style="{ backgroundImage: `url('${photo}')` }"
		>
			<div class="personInfo">
				<h3 class="personInfo__item">{{ name }}</h3>
				<h6 class="personInfo__item">{{ position }}</h6>
				<h6 class="personInfo__item"><a :href="`mailto:${email}`">{{ email }}</a></h6>
			</div>
		</div>
	</el-col>
</template>

<script>

export default {
	name: 'person-card',
	props: [
		'name',
		'position',
		'email',
		'photo'
	],
}
</script>

<style lang="less">
@import "../../less/variables";

.person {
	
	&Card {
		margin-bottom: 20px;
		border-radius: 20px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
    	min-height: 450px;
		
		&::after {
			background: linear-gradient(180deg, rgba(0, 21, 53, 0) 50%, rgba(0, 21, 53, 0.75) 100%);
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}

		&::before {
			content: '';
			display: block;
			width: 100%;
			padding-top: 125%;
		}
	}

	&Info {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 2;
		padding: 40px 20px;
    	box-sizing: border-box;

		&__item {
			color: @white;
			text-align: center;

			a {
				&:hover {
					text-decoration: underline;
					color: @white;
				}
			}

			&:first-child {
				margin-bottom: 30px;
			}
		}

		.up(@sm;{
			padding: 40px 70px;
		});
	}
}
</style>