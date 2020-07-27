<template>
<div class="shipSpec">
    <h3 data-aos="fade-left" data-aos-delay="2200" data-aos-anchor=".header">Характеристики судна</h3>
    <el-table data-aos="fade-left" data-aos-delay="2200" data-aos-anchor=".header" :data="specs" :showHeader="false">
        <el-table-column prop="specName" />
        <el-table-column prop="specValue" />
    </el-table>
</div>
</template>

<script>
export default {
    name: 'ship-specifications',
	data: () => ({}),
	props: [
		'specs'
	]
}
</script>

<style lang="less">
@import "../../less/variables";

.shipSpec {
	background-color: @bg;
	padding: 35px 20px 25px;
    box-sizing: border-box;
	width: 100%;
	
	h3 {
		text-align: left;
		padding-bottom: 20px;

		.up(@sm;{
			padding-bottom: 60px;
		});
	}

	.up(@sm;{
		padding: 75px 80px 65px;
	});

	.up(@lg;{
    	width: 50%;
    	max-width: 850px;
	});
}

.el-table {
	background-color: transparent;

	.cell {
		font-size: 25px;
		line-height: 30px;
		color: @black;
		word-break: normal;
    	padding: 15px 0;
	}

	tr {
		background-color: transparent;

		td {
			padding: 0 10px 0 0;
			border-bottom: 1px solid #cfd5e2;

			&:first-child {
				vertical-align: baseline;
			}
			&:last-child {
				text-align: right;
				padding: 0 0 0 10px;

				.cell {
					font-weight: bold;
				}

				.up(@sm;{
					text-align: left;
				});
			}
		}

		&:hover {
    		background-color: transparent;
			&>td {
    			background-color: transparent !important;
			}
		}
	}
}
</style>
