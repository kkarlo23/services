export default {
    sellingPriceValidation(buyingPrice, tax, margin){
        if(buyingPrice === "" || Number(buyingPrice) <= 0 || tax === "" || Number(tax) < 0 || Number(tax)>100 || margin === "" || Number(margin)<0 || Number(margin)>100){
            return ""
          }else{
              buyingPrice = Number(buyingPrice);
              tax = Number(tax);
              margin = Number(margin)
            return (buyingPrice +(buyingPrice * (tax / 100)) +(buyingPrice * (margin / 100)))
          }
    },
    totalValidation(quantity, sellingPrice, buyingPrice, tax){
        if(quantity === "" || Number(quantity) < 0 || sellingPrice === "" || buyingPrice === "" || Number(buyingPrice) < 0 || tax === "" || Number(tax) < 0){
            return ""
          }else{
            quantity = Number(quantity);
            sellingPrice = Number(sellingPrice);
            return quantity * sellingPrice;
          }
    },
    validateAndAdd(name, quantity, tax, buyingPrice){
      if(isNaN(name) == true && name != "" && quantity != "" && tax != "" && buyingPrice != "" && Number(buyingPrice) > 0 ) {
        return true;
      }else{
        return false;
      }

    }
}