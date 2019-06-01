<template>
  <div id="app">
    <div class="header"><p>Services</p></div><br>
    <div class="container">
    <div>
      <label for>Name of service</label>
      <input type="text" v-model="name" placeholder="Provide a name for your service..">
      <label for>Quantity</label>
      <input type="number" v-model="quantity">
      <label for>Tax rate (%)</label>
      <input type="number" v-model="tax">
      <label for>Margin (%)</label>
      <input type="number" v-model="margin">
      <label for>Buying price</label>
      <input type="number" v-model="buyingPrice">
      <label for>Selling price</label>
      <input type="number" :value="sellingPrice" @focus="toggle" @blur="toggle" placeholder="Will be calculated automaticaly">
      <label for>Total</label>
      <input type="number" :value="total" @focus="toggle" @blur="toggle" placeholder="Will be calculated automaticaly">
      <br>
      <button @click="add">Add</button>
      <p class="warn" v-if="totalAndSpFocused == true">You should not change Selling price and Total manually</p>
      <p class="warn" v-if="totalAndSpFocused == true">If you change they will still be calculated by other fields</p>
    </div>
    <div class="services">
      <div class="entry" v-for="one in services" :key="one.id">
        <h1 class="description"> {{ one.name }} </h1>
        <p class="description"> Quantity: {{ one.quantity }} </p>
        <p class="description"> Tax: {{ one.tax }}%</p>
        <p class="description"> Margin: {{ one.margin }}%</p>
        <p class="description"> Buying price: {{ one.buyingPrice }}€ </p>
        <p class="description"> Selling price: {{ one.sellingPrice }}€ </p>
        <hr>
        <p class="description"><b>TOTAL: {{ one.total }}€ </b></p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
//scripts for validation
import validation from "./validation";

export default {
  name: "app",
  //no other components, I think is to liitle app to add them
  components: {},
  data() {
    return {
      //input field values are stored here
      id: 4,
      totalAndSpFocused: false,
      name: "",
      quantity: "",
      tax: "",
      margin: "",
      buyingPrice: "",
      //first few services
      services: [{
        id: 1,
        name: "first",
        quantity: 3,
        tax: 25,
        margin: 20,
        buyingPrice: 22,
        sellingPrice: 33,
        total: 44
      },
      {
        id: 2,
        name: "second",
        quantity: 3,
        tax: 25,
        margin: 20,
        buyingPrice: 22,
        sellingPrice: 33,
        total: 44
      },
      {
        id: 3,
        name: "third",
        quantity: 3,
        tax: 25,
        margin: 20,
        buyingPrice: 22,
        sellingPrice: 33,
        total: 44
      }]
      
    };
  },
  methods: {
    add(event){
      //validating input
      if(validation.validateAndAdd(this.name, this.quantity, this.tax, this.buyingPrice) == true){
        //adding to services array
        this.services.unshift({
        name: this.name,
        quantity: this.quantity,
        tax: this.tax,
        margin: this.margin,
        buyingPrice: this.buyingPrice,
        sellingPrice: this.sellingPrice,
        total: this.total,
        id: this.id

      })
      this.id++;
      this.reset();
      }else{
        alert(`You need to enter correct data in all the fields to proceed
        and please note that the name should not be number`)
      }
      
    },
    reset(){
      //setting input fields to blank after submitting
      this.name = "";
      this.quantity = "";
      this.tax = "";
      this.margin = "";
      this.buyingPrice = "";
      this.sellingPrice = "";
      this.total = "";
    },
    toggle(e){
      //toggling warning if user clicks on selling price or total
      this.totalAndSpFocused = !this.totalAndSpFocused;
    }
  },
  computed: {
    //computing selling price
    sellingPrice: {
      get(){
        return validation.sellingPriceValidation(this.buyingPrice, this.tax, this.margin);
      },
      set(){

      }
    },
    //computing total
    total: {
      get(){
        return validation.totalValidation(this.quantity, this.sellingPrice, this.buyingPrice, this.tax);
      },
      set(){

      }
    }
  }
};
</script>

<style>
.header {
  width: 100%;
  height: 50px;
  background-color: rgb(66, 66, 114);
  box-shadow: 0px 10px 15px -1px rgba(0,0,0,0.75);
}

.header > p{
  margin: 0 50px;
  padding-top: 10px;
  font-size: 20px;
  font-weight: bolder;
  color: white;
}

.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  margin-left: 10px;
}
.container *{
  margin-top: 5px;
}
.services {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  width: 80%;
  margin: 0 auto;
}
.entry {
  border: 1px solid black;
  border-radius: 10px;
  background-color: rgb(144, 212, 138);
  height: 250px;

}
.description {
  padding-left: 5px;
  margin: 10px;
}
input{
  width: 100%;
  height: 30px;
  background-color: rgb(223, 223, 223);
  border: 1px solid rgb(88, 86, 129);
  border-radius: 5px;
}
input:focus{
  outline: none;
  border: 2px solid rgb(133, 202, 133);
}

button {
  width: 50px;
  height: 40px;
  outline: none;
  border-radius: 20px;
  background-color: rgb(133, 202, 133);
}

label {
  display: block;
}

.warn {
  color: red;
}
</style>
