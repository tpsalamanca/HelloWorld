import React, { Component } from 'react';

class App1 extends Component {

  constructor() {
    super();
    this.state = {
      idVenta: '',
      documento: '',
      nombre: '',
      producto: '',
      valor: '',

      _id: '',
      tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          idVenta: this.state.idVenta,
          documento: this.state.documento,
          nombre: this.state.nombre,
          producto: this.state.producto,
          valor: this.state.valor,

        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Task Updated'});
          this.setState({_id: '', idVenta: '', documento: '',nombre: '',producto: '',valor: ''});
          this.fetchTasks();
        });
    } else {
      fetch('/api/tasks', {
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
          window.M.toast({html: 'Task Saved'});
          this.setState({idVenta: '', documento: '',nombre: '',producto: '',valor: ''});
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }

  }

  deleteTask(id) {
    if(confirm('Esta seguro que desea eliminar?')) {
      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Task deleted'});
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          idVenta: data.idVenta,
          documento: data.documento,
          nombre: data.nombre,
          producto: data.producto,
          valor: data.valor,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data});
        console.log(this.state.tasks);
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
                  <form onSubmit={this.addTask}>


                    <div className="row">
                      <div className="input-field col s12">
                        <input name="idVenta" onChange={this.handleChange} value={this.state.idVenta} type="text" placeholder="id Venta" autoFocus/>
                      </div>
                    </div>


                    <div className="row">
                      <div className="input-field col s12">
                        <input name="documento" onChange={this.handleChange} value={this.state.documento} type="text" placeholder="Documento cliente" autoFocus/>
                      </div>
                    </div>


                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="nombre" onChange={this.handleChange} value={this.state.nombre} cols="30" rows="10" placeholder="Nombre Cliente" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="producto" onChange={this.handleChange} value={this.state.producto} cols="30" rows="10" placeholder="producto" className="materialize-textarea"></textarea>
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
                    <th>Id Venta</th>
                    <th>Documento cliente</th>
                    <th>Nombre cliente</th>
                    <th>Producto</th>
                    <th>Valor</th>
            
                  </tr>
                </thead>

                <tbody>
                  { 
                    this.state.tasks.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.idVenta}</td>
                          <td>{task.documento}</td>
                          <td>{task.nombre}</td>
                          <td>{task.producto}</td>
                          <td>{task.valor}</td>
                        
                        

                          



                          <td>
                            <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
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

export default App1;
