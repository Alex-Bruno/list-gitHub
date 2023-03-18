import { MdSearchOff } from 'react-icons/md';

import Repository from './Repository';
import './../../styles/List.css';

const List = ({ repositories }) => (
  <section id='list' className='container'>
    <div className='row'>
      {
        (repositories?.length > 0) ? (
          repositories.map(repository => (
            <Repository
              repository={repository}
              key={repository.id}
            />
          ))
        ) : (
          <div className='col-12'>
            <div className='alert alert-warning'>
              <MdSearchOff />&nbsp;
              Nenhum repositório foi encontrado.
            </div>
          </div>
        )
      }
    </div>
  </section>
)

export default List;