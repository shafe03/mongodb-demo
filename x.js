// trade of between query performance and cosistency

//using reference(normalization) = consistency
let author = {
  name: "shafe alam",
};

let course = {
  author: "id",
};

// using embadded document => denormalization = performance
let course = {
  author: {
    name: "shafe alam",
  },
};

// hybrid approac

let author = {
  name: "shafe",
  // 50 other properties,
};

let course = {
  author: {
    id: "ref",
    name: "mosh",
  },
};

// when we need snapshot of product in ecommerce
