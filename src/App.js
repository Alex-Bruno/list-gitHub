import { useState, useEffect } from 'react';
import { BlockUI } from 'primereact/blockui';
import Badge from 'react-bootstrap/Badge';

import Header from './components/App/Header';
import List from './components/App/List';
import Filter from './components/App/Filter';

import { getRepositories } from './services/GitHub';
import './styles/App.css';

function App() {
  const [loading, setLoading] = useState([]);
  const [filter, setFilter] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    searchRepositories();
  }, [])

  const searchRepositories = async () => {
    setLoading(true);

    setRepositories([]);

    const comparableLastCommiter = (a, b) => {
      if (filter.order === 'asc')
        return a.last_committer > b.last_committer ? 1 : -1;
      return a.last_committer < b.last_committer ? 1 : -1;
    }

    getRepositories(filter)
      .then(response => {
        if (response.length) {

          if (filter.sort === 'last-commit')
            response.sort((a, b) => comparableLastCommiter(a, b))

          setRepositories(response)
          setLoading(false);
        }
      })
      .catch(error => {
        let message = 'Houve um erro ao realizar a busca, tente novamente.';

        const status = error.response.status;
        if (status === 401) {
          message = 'Houve um erro com o seu token, atualize-o e tente novamente.';
        } else if (status === 403) {
          message = 'Número de requests excedido, tente novamente mais tarde.';
        } else if (status === 402) {
          message = 'Houve um erro com a sua consulta, verifique o filtro e tente novamente.';
        }

        setMessage(message)
        setLoading(false);
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFilter({ ...filter, [name]: value })
  }

  const clearFilter = (event) => {
    setFilter([])
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRepositories()
  }

  const renderTitle = () => (
    <div className='title container mt-2'>
      <div className='row'>
        <div className='col-12'>
          <h4 className='text-bold'>
            Listagem de repositórios&nbsp;
            <Badge bg='info'>{repositories?.length}</Badge>
          </h4>
        </div>
      </div>
    </div>
  );

  const renderErrorMessage = () => (
    (message) && (
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-12'>
            <div className='alert alert-danger' role='alert'>
              {message}
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className='App'>
      <Header />

      {renderTitle()}

      <Filter
        filter={filter}
        handleChange={handleChange}
        clearFilter={clearFilter}
        handleSubmit={handleSubmit}
      />

      {renderErrorMessage()}

      <BlockUI blocked={loading}>
        <List
          repositories={repositories}
        />
      </BlockUI>
    </div>
  );
}

export default App;
