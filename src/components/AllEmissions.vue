<template>
  <div class="container">
    <h3>Tokens Emitidos</h3> 
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Quantidade inicial</th>
           <th scope="col">Quantidade atual</th>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Quem recebeu</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in emissions" :key="index">
          <td>{{ i.initialAmount }}</td>
          <td>{{ i.currentAmount }}</td>
          <td>{{ i.fromName }}</td>
          <td>{{ i.name }}</td>
          <td>{{ i.description }}</td>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary mt-2 mb-2" @click="openIntentionModal(i)">
            Liquidar
          </button>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="intention" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="intentionLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="intentionLabel">Enviar intenção de liquidação</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">            
            <p><strong>Nome:</strong> {{ selected.name }}</p>            
            <p><strong>Fez pelo bem comum:</strong> {{ selected.description }}</p>            
            <h5>Escreva uma mensagem para {{ selected.name }}</h5>
            <div class="input-group">
              <textarea
                v-model="descricao"
                class="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="save">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AllEmissions",
  data(){
    return {
      emissions: [],
      selected: {},
      descricao: ""      
    }
  },
  mounted(){
    this.emissions = this.$store.state.tokens;
  }, 
  computed: {    
    userProfile: function() {
      return this.$store.state.userProfile;
    }    
  },
  methods: {
    openIntentionModal(i) {
      $('#intention').modal('show');
      this.selected = i;     
    },
    save() {
      let payload = {
        description: this.descricao,
        emissionId: this.selected.id,
        toName: this.selected.name,
        toUid: this.selected.uid
      }
      this.$store.dispatch('setLiquidateIntentionDb', payload);
      this.descricao = "";
      this.closeModal();
    },
    closeModal() {      
      $('#intention').modal('hide');
    }
  }
};
</script>
