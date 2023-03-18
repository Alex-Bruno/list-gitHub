import { useState, useEffect } from 'react';
import { BlockUI } from 'primereact/blockui';
import Badge from 'react-bootstrap/Badge';
import { useSearchParams } from 'react-router-dom';

import Header from './components/App/Header';
import List from './components/App/List';
import Filter from './components/App/Filter';

import { getRepositories } from './services/GitHub';
import './styles/App.css';

function App() {
  const [loading, setLoading] = useState([]);
  const [, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setSearchParams([])
    searchRepositories();
  }, [])

  const searchRepositories = async () => {
    setLoading(true);

    setRepositories([]);

    const comparableLastCommiter = (a, b) => {
      if(filter.order === 'asc')
        return a.last_committer > b.last_committer ? 1 : -1;
      return a.last_committer < b.last_committer ? 1 : -1;
    }

    getRepositories(filter)
      .then(response => {
        if (response.length) {
          
          if(filter.sort === 'last-commit')
            response.sort((a, b) => comparableLastCommiter(a, b))

          setRepositories(response)
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error)
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

      {
        (message) && (
          <div class="alert alert-danger" role="alert">
            {message}
          </div>
        )
      }

      <BlockUI blocked={loading}>
        <List
          repositories={repositories}
        />
      </BlockUI>
    </div>
  );
}

export default App;
