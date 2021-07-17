<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5">Experiencias e reconhecimentos</h1>
          <div class="row">
              
              <div class="col-md-4">
                  <div class="card product-item">
                    <img src="/img/products/product1.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Surface Book 2</h5>
                            <p class="card-text">
                                Complete your device with Office 365 and get 1TB cloud storage, Excel, Word, PowerPoint & more. Select your suite during checkout.
                            </p>
                            <a href="#" class="btn btn-primary">Liquidar</a>
                        </div>
                    </div>
              </div>              
          </div>
      </div>
    
  </div>
</template>

<script>
export default {
  name: "Products",
  data(){
    return {
        products: [],
     
    }
  },
  props: {
    msg: String
  },
  methods:{
    getImage(images){
      return images[0];
    }
  },

  firestore(){
      return {
        products: db.collection('emissions'),
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>
