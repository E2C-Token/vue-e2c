<template>
  <div class="container">
    <div>
      
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
            <p>{{ i.currentAmount }}</p>         
            <button
              @click="infoToken(i)"
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#liquidationModal"
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
      id="liquidationModal"
      tabindex="-1"
      aria-labelledby="liquidationModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="liquidationModalLabel">Liquidar quantos tokens?</h5>            
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
            <div>
              <p>Token emitido por: {{ fromName }}</p>
              <p>Descrição: {{ description }}</p>
              <p>Quantidade atual: {{ currentAmount }}</p>              
            </div>
            <label>Quantidade a liquidar</label>            
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
      amount: null,
      currentAmount: null,
      fromName: null,
      description: null     
    };
  },
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
      this.tokenId = i.emissionId;
      this.currentAmount = i.currentAmount;
      this.fromName = i.fromName;
      this.description = i.description;
      console.log("Emission ID: ", this.tokenId);      
    },
    liquidar() {
      let payload = {
        tokenId: this.tokenId,
        currentAmount: this.currentAmount,
        amount: this.amount
      }      
      this.$store.dispatch("liquidateTokens", payload);
      this.clearAndHideModal();          
    },
    clearAndHideModal() {
      this.amount = null;
      $('#liquidationModal').modal('hide');
    } 
  },
};
</script>
