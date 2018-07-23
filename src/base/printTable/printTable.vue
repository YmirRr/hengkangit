<template>
    <div class="print">
		<table border="1" cellspacing="0" cellpadding="0">
            <tr>
                <th v-for='item in head' :key="item.name">
                    {{item.name}}
                </th>
            </tr>
            <tr v-for='data in body' :key="data.age">
                <td v-for='item in head' :key='item.name'>{{data[item.prop]}}</td>
            </tr>
        </table>                
    </div>
</template>
<script type="text/javascript">
	export default{
        props: ['head','body'], 
        data(){
			return{
			}
		},
	}
</script>
<style>
/* .print table,.print table tr th, .print table tr td {text-align: center;border:1px solid #0094ff; }
.print table{text-align: center; border-collapse: collapse; padding:2px;}  */
</style>