import React, { Component } from 'react';

class App2 extends Component {

  constructor() {
    super();
    this.state = {
      idProducto: '',
      nombre: '',
      marca: '',
      unidades: '',
      valor: '',

      _id: '',
      productos: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addProducto = this.addProducto.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addProducto(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/productos/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          idProducto: this.state.idProducto,
          nombre: this.state.nombre,
          marca: this.state.marca,
          unidades: this.state.unidades,
          valor: this.state.valor,

        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Producto Updated'});
          this.setState({_id: '', idProducto: '', nombre: '', marca: '', unidades: '',valor: ''});
          this.fetchProductos();
        });
    } else {
      fetch('/api/productos', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Producto Saved'});
          this.setState({idProducto: '', nombre: '', marca: '', unidades: '',valor: ''});
          this.fetchProductos();
        })
        .catch(err => console.error(err));
    }

  }

  deleteProducto(id) {
    if(confirm('Esta seguro que desea eliminar?')) {
      fetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Producto deleted'});
          this.fetchProductos();
        });
    }
  }

  editProducto(id) {
    fetch(`/api/productos/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          idProducto: data.idProducto,
          nombre: data.nombre,
          marca: data.marca,
          unidades: data.unidades,
          valor: data.valor,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchProductos();
  }

  fetchProductos() {
    fetch('/api/productos')
      .then(res => res.json())
      .then(data => {
        this.setState({productos: data});
        console.log(this.state.productos);
      });
  }

  render() {
    return (
      <div>
       

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addProducto}>


                    <div className="row">
                      <div className="input-field col s12">
                        <input name="idProducto" onChange={this.handleChange} value={this.state.idProducto} type="text" placeholder="id Producto" autoFocus/>
                      </div>
                    </div>


                    <div className="row">
                      <div className="input-field col s12">
                        <input name="nombre" onChange={this.handleChange} value={this.state.nombre} type="text" placeholder="Nombre produto" autoFocus/>
                      </div>
                    </div>


                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="marca" onChange={this.handleChange} value={this.state.marca} cols="30" rows="10" placeholder="Marca" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="unidades" onChange={this.handleChange} value={this.state.unidades} cols="30" rows="10" placeholder="unidades" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="valor" onChange={this.handleChange} value={this.state.valor} cols="30" rows="10" placeholder="valor" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Guardar 
                    </button>
                  </form>
                </div>
              </div>
            </div>


            <div className="col s7">
              <table>

                <thead>
                  <tr>
                    <th>Id Producto</th>
                    <th>Nombre Producto</th>
                    <th>Marca</th>
                    <th>Unidades</th>
                    <th>Valor</th>
            
                  </tr>
                </thead>

                <tbody>
                  { 
                    this.state.productos.map(producto => {
                      return (
                        <tr key={producto._id}>
                          <td>{producto.idProducto}</td>
                          <td>{producto.nombre}</td>
                          <td>{producto.marca}</td>
                          <td>{producto.unidades}</td>
                          <td>{producto.valor}</td>
                        
                        

                          



                          <td>
                            <button onClick={() => this.deleteProducto(producto._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editProducto(producto._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App2;