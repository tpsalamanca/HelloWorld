import React, { Component } from 'react';

class App4 extends Component {

  constructor() {
    super();
    this.state = {
      idDocumento: '',
      nombre: '',
      rol: '',
      correo: '',
      telefono: '',

      _id: '',
      usuarios: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addUsuario = this.addUsuario.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addUsuario(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/usuarios/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          idDocumento: this.state.idDocumento,
          nombre: this.state.nombre,
          rol: this.state.rol,
          correo: this.state.correo,
          telefono: this.state.telefono,

        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Usuario Updated'});
          this.setState({_id: '', idDocumento: '', nombre: '', rol: '', correo: '',telefono: ''});
          this.fetchUsuarios();
        });
    } else {
      fetch('/api/usuarios', {
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
          window.M.toast({html: 'Usuario Saved'});
          this.setState({idDocumento: '', nombre: '', rol: '', correo: '', telefono: ''});
          this.fetchUsuarios();
        })
        .catch(err => console.error(err));
    }

  }

  deleteUsuario(id) {
    if(confirm('Esta seguro que desea eliminar?')) {
      fetch(`/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Usuario deleted'});
          this.fetchUsuarios();
        });
    }
  }

  editUsuario(id) {
    fetch(`/api/usuarios/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          idDocumento: data.idDocumento,
          nombre: data.nombre,
          rol: data.rol,
          correo: data.correo,
          telefono: data.telefono,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchUsuarios();
  }

  fetchUsuarios() {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => {
        this.setState({usuarios: data});
        console.log(this.state.usuarios);
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
                  <form onSubmit={this.addUsuario}>


                    <div className="row">
                      <div className="input-field col s12">
                        <input name="idDocumento" onChange={this.handleChange} value={this.state.idDocumento} type="text" placeholder="id Documento" autoFocus/>
                      </div>
                    </div>


                    <div className="row">
                      <div className="input-field col s12">
                        <input name="nombre" onChange={this.handleChange} value={this.state.nombre} type="text" placeholder="Nombre usuario" autoFocus/>
                      </div>
                    </div>


                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="rol" onChange={this.handleChange} value={this.state.rol} cols="30" rows="10" placeholder="Rol" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="correo" onChange={this.handleChange} value={this.state.correo} cols="30" rows="10" placeholder="Correo" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="telefono" onChange={this.handleChange} value={this.state.telefono} cols="30" rows="10" placeholder="Telefono" className="materialize-textarea"></textarea>
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
                    <th>Id Documento</th>
                    <th>Nombre Usuario</th>
                    <th>Rol</th>
                    <th>Correo</th>
                    <th>Telefono</th>
            
                  </tr>
                </thead>

                <tbody>
                  { 
                    this.state.usuarios.map(usuario => {
                      return (
                        <tr key={usuario._id}>
                          <td>{usuario.idDocumento}</td>
                          <td>{usuario.nombre}</td>
                          <td>{usuario.rol}</td>
                          <td>{usuario.correo}</td>
                          <td>{usuario.telefono}</td>
                        
                        

                          



                          <td>
                            <button onClick={() => this.deleteUsuario(usuario._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editUsuario(usuario._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
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

export default App4;