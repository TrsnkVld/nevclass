<template>
<section class="errorSection" data-aos="bg-main" :style="{ backgroundImage: `url('${require(`../../assets/img/${data.bg}`)}')` }">
	<el-container direction="vertical">
		<div>
			<h1 data-aos="fade-down" data-aos-delay="800" >{{ data.title }}</h1>
			<h3 data-aos="fade-down" data-aos-delay="800" >{{ data.subtitle }}</h3>
			<el-button data-aos="fade-down" data-aos-delay="1200"  type="primary" @click="$router.push({ name: 'home' })">На главную</el-button>
		</div>
	</el-container>
</section>
</template>

<script>
export default {
	name: 'server-error',
	props: [
		'data'
	],	
	data: () => ({
		
	}),
}
</script>

<style lang="less">
@import "../../less/variables";

.errorSection {
	//background-image: url("../assets/img/error.jpg");
	background-position: bottom;
	background-size: cover;
	display: flex;
	padding: 90px 0 40px;
	min-height: 515px;
    min-height: 100vh;
	box-sizing: border-box;
	position: relative;

	&::before {
		display: block;
		content: "";
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: white;
		-webkit-transform: translateY(0%);
		transform: translateY(0%);
	}

	.el-container {
		.up(@sm;{
			padding: 0 80px;
		});
	}

	.el-button {
		display: block;
		margin: 0 auto;

		.down(@xs;{
			min-width: auto;
			//max-width: 260px;
			width: 100%;
		});
	}

	div {
		margin: auto;
	}

	h1 {
		margin-bottom: 40px;
	}

	h3 {
		color: @white;
		margin-bottom: 80px;

		.up(@sm;{
			margin-bottom: 80px;
		});
	}

	.up(@sm;{
		padding: 204px 0 80px;
		min-height: 600px;
	});

	.up(@md;{
		height: 100vh;
	});
}

</style>