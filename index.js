const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('connected to mongodb'))
  .catch (err => console.log('could not connect to mongo db', err))


const salesSchema = new mongoose.Schema({
    customerName: String,
    amount: Number,
    product: [String],
    date: {
        type: Date,
        default: Date.now
    },
    salesType: String,
    quantity: Number,
    approved: false,
});

const Sale = mongoose.model('Sale', salesSchema);



async function createSale() {
    const sale = new Sale({
        customerName: 'zetta byte',
        amount: 330,
        product: ['c', 'b'],
        salesType: 'credit',
        quantity: 10,
        approved: false,
    })

    const result = await sale.save();
    console.log(result)
}



//.find({amount: {$lt:1000, $gt:10000}})
//.find({amount: {$in: [1000, 5000,4000]}})
////.find({amount: {$lt:1000}})
//and([{customerName:'panaroma'}, product: ['a', 'b']])
// regular expresaion {customerName:/^thun/} ---case sensative
// regular expresaion {customerName:/thun$/i} ---i => case insensative
// regular expresaion {customerName:/.*thun.*/i} ---i => case insensativ
//.or([{customerName: 'thunder global tech'},{approved: true}])
// .select()

async function getSales() {
    const sales = await Sale
    .find({approved:false})
    .sort({customerName: 1})
    .limit(10)
    console.log(sales)
}

getSales();


//query first approach
/*
async function updateCourse(id){
  const sale = await Sale.findById(id);
  if(!sale) return;
  
  sale.customerName = "shafe";
  
 const result = await sale.save();
 console.log(result);
}

updateCourse('60e85955b841c64deff9daee')
*/

//update first approach
async function updateSales(id){
  const result = await Sale.updateMany({_id:id}, {
      $set:{
          customerName: 'tanvir',
          amount: 50000,
      }
  });
  
 console.log(result);
}

updateSales('60e85955b841c64deff9daee')


async function deleteSales(id){
  //const result = await Sale.deleteOne({_id:id})
   const result = await Sale.findByIdAndRemove(id)
 console.log(result);
}

deleteSales('60e85955b841c64deff9daee')










