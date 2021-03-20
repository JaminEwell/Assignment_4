
/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "react/no-multi-comp": "off" */
/* eslint "no-alert": "off" */


async function graphQLFetch(query, variables = {}) {
  const response = await fetch(window.ENV.UI_API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  })
  const body = await response.text()
  const result = JSON.parse(body)
  return result.data
}




  function ProductRow(props)  {
        const product = props.product;
        return (
          <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.image}</td>
          </tr>
        );
  }

  class ProductFilter extends React.Component {
    render() {
      return (
        <div>Showing all available products</div>
      );
    }
  }

  
  function ProductTable(props){
        const productRows = props.products.map(product =>
          <ProductRow key={product.id} product={product} />
        );
    
        return (
          <table className="bordered-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {productRows}
            </tbody>
          </table>
        )
  }
  
  class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;
        const product = {
          name: form.name.value, 
          price: form.price.value, 
          category: form.category.value,
          image: form.image.value
        }
        this.props.createProduct(product);
        form.name.value = ""; 
        form.price.value = "";
        form.category.value = "";
        form.image.value = "";
     }

    render() {
      return (
      <form name="productAdd" onSubmit={this.handleSubmit}>
        <div><u>Add a new product to inventory</u></div>
        <b>Category</b><br/> 
        <select id="category" name="category">
          <option value="Shirts">Shirts</option>
          <option value="Jeans">Jeans</option>
          <option value="Jackets">Jackets</option>
          <option value="Sweaters">Sweaters</option>
          <option value="Accessories">Accessories</option>
        </select><br/>
        <b>Price Per Unit</b><br/>
        <input type="text" name="price" placeholder="$" /><br/>
        <b>Product Name</b><br/>
        <input type="text" name="name" placeholder="" /><br/>
        <b>Image URL</b><br/>
        <input type="text" name="image" placeholder="" /><br/>
        <button>Add Product</button>
      </form>
        
      );
    }
  }
  
  class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
      }

      componentDidMount() {
        this.loadData();
      }
    
      // get product data
      async loadData() {
        const query = `query {
          productList {
            id 
            category
            name
            price
            image
          }
        }`;


        const data = await graphQLFetch(query)
        if (data) {
          this.setState({ products: data.productList })
        }
      }


      async createProduct(product) {
        const query = `mutation productAdd($product: ProductInputs!) {
          productAdd(product: $product) {
            id 
          }
        }`
    
        const data = await graphQLFetch(query, { product })
        if (data) {
          this.loadData()
        }
      }

    render() {
      return (
        <React.Fragment>
          <h1>My Company Inventory</h1>
          <ProductFilter />
          <hr />
          <ProductTable products={this.state.products}/>
          <hr />
          <ProductAdd createProduct={this.createProduct} />
        </React.Fragment>
      );
    }
  }
  
  const element = <ProductList />;
  

ReactDOM.render(element, document.getElementById('contents'));
