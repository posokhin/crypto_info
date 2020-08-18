<template>
  <div class="container py-3">
    <h1>CryptoInfo</h1>
    <b-table-simple striped>
      <b-thead>
        <b-tr>
          <b-td>Pair</b-td>
          <b-td>Bid</b-td>
          <b-td>Ask</b-td>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, index) of items" :key="index">
          <b-td>{{ item.pair }}</b-td>
          <b-td>{{ (+item.bid[0]).toFixed(2) }}</b-td>
          <b-td>{{ (+item.ask[0]).toFixed(2) }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: []
  }),
  mounted() {
    this.getPairs()
    setInterval(this.getPairs, 15000)
  },
  methods: {
    async getPairs() {
      try {
        const data = await this.$axios.get(
          'api/cryptopair?pair=XXBTZUSD,XXBTZEUR,ALGOUSD,BCHUSD,ADAUSD'
        )
        this.items = Object.entries(data.data.result).map((item) => {
          return {
            pair: item[0],
            bid: item[1].b,
            ask: item[1].a
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
