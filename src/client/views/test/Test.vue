<template>
  <div id="app">
    <ul>
      <li
        v-for="item in products"
        :key="item.name"
      >
        {{ item.name }} {{ item.num }}
        <span v-if="item.num === 0">
          --- 卖完了
        </span>
      </li>
    </ul>

    <span>Total: {{ productTotal }}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        products: [
          {id:0,num:2,name:'apple'},
          {id:1,num:1,name:'banana'},
          {id:2,num:0,name:'pear'},
          {id:3,num:4,name:'orange'},
        ]
      }
    },
    computed: {
      productTotal () {
        return this.products.reduce((sum, product) => {
          return sum + product.num
        }, 0);
      }
    }
  }
</script>

<style lang="sass" module>

</style>
