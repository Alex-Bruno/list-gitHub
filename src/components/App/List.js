import Repository from './Repository';
import './../../styles/List.css';

const List = ({ repositories }) => (
  <section id='list' className='container'>
    <div className='row'>
      {
        (repositories?.length > 0) && (
          repositories.map(repository => (
            <Repository
              repository={repository}
              key={repository.id}
            />
          ))
        )
      }
    </div>
  </section>
)

export default List;