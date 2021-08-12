<template>
  <div class="container">
    <div>
      <h3>Tem gente querendo liquidar tokens para você!</h3>    
      <div class="row">
        <div
          class="card ml-3 mr-3 mt-2 mb-2"
          v-for="(i, index) in intentions"
          :key="index"
          :value="i"
        >
          <div
            class="card-item ml-3 mr-3 mt-2 mb-2"
            
          >
            <h4>{{ i.fromName }}</h4>
            <p>{{ i.description }}</p>
            <button
              @click="infoToken(i)"
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Liquidar quantos tokens?</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Quantidade</label>            
            <input type="number" v-model="amount"/>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="liquidar()">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "WaitingToLiquidate",
  data: function() {
    return {
      user: {},
      tokenId: null,
      initialAmount: null,
      amount: null      
    };
  },
  // mounted() {
  //   this.getAmount();
  // },
  computed: {
    tokens: function() {
      return this.$store.state.tokens;
    },    
    intentions: function() {
      return this.$store.state.intentionLiquidation;
    }
  },
  methods: {
    infoToken(i) {     
      this.tokenId = i.tokenId;            
      console.log("liquidar", this.tokenId);      
    },
    liquidar() {
      let payload = {
        tokenId: this.tokenId,
        initialAmount: this.initialAmount,
        amount: this.amount
      }      
      this.$store.dispatch("liquidateTokens", payload);
      
    }, 
  },
};
</script>
