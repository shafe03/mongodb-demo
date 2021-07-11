const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('connected to mongodb'))
  .catch (err => console.log('could not connect to mongo db', err))


const salesSchema = new mongoose.Schema({
    customerName: {
        type:String, 
        required:true,
        minLength: 5,
        maxLength: 100,
        },     
    amount: {
        type:Number, 
    				required: function(){return this.customerName},
    				min:100,
    				max:1000,
    },  
    product: {
        type:Array,
        //custom validation
        validate: {
            isAsync: true,
            validator: function(v, callback){
                setTimeout(()=> {
                    const result = v && v.length > 0;
                				callback(result)
                }, 4000)
            },
           	message: 'product feild is mandatory',
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
    salesType: {
        type:String,
        enum: ['cash', 'credit'],
    }, 
    quantity: {
        type: Number, 
        required:true, 
        min:5, 
        max:110},
    
    approved: Boolean,
});

const Sale = mongoose.model('Sale', salesSchema);


//create sale 
async function createSale() {
    const sale = new Sale({
        customerName: 'sas tech',
        amount: 500,
        product: ['sledger'],
        salesType: '',
        quantity: 50,
       	approved: true, 
    })
    
    try{
        const result = await sale.save();
   				 console.log(result)
    }
    catch(ex){
      for(field in ex.errors)
      console.log(ex.errors[field].message)
    }
}

createSale();

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

//getSales();


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










