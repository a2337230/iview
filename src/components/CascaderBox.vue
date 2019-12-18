<template>
    <Cascader :data="data3" :render-format="format"></Cascader>
</template>
<script>
    export default {
        data () {
            return {
                data3: [{
                    value: 'zhejiang',
                    label: '浙江',
                    children: [{
                        value: 'hangzhou',
                        label: '杭州',
                        children: [{
                            value: 'xihu',
                            label: '西湖',
                            code: 310000
                        }]
                    }]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [{
                        value: 'nanjing',
                        label: '南京',
                        children: [{
                            value: 'zhonghuamen',
                            label: '中华门',
                            code: 210000
                        }]
                    }]
                }]
            }
        },
        methods: {
            format (labels, selectedData) {
                const index = labels.length - 1;
                const data = selectedData[index] || false;
                this.$emit('change', labels[index])
                // console.log(labels[index])
                return labels[index];
            }
        }
    }
</script>