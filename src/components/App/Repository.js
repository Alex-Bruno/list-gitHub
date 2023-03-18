import { BsCalendarFill, BsStarFill, BsArchiveFill } from 'react-icons/bs';

const Repository = ({ repository }) => {
  const locale = 'pt-br';
  const created = new Date(repository.created_at)
  const committer = new Date(repository.last_committer)
  return (
    <div className='col-md-4 p-2'>
      <div className='card p-2 repository-content'>
        <div className='card-body d-flex flex-column justify-content-between'>
          <h5 className='card-title text-dark text-bold text-uppercase border-bottom'>{repository.name}</h5>

          <h6 className='card-subtitle mb-2 text-muted'>{repository.description ?
            repository.description :
            <span className='text-warning'>Sem descrição!</span>}
          </h6>
          <hr />

          <div className='dates d-flex align-items-center'>
            <BsCalendarFill />&nbsp;
            <strong className='text-muted font-italic text-underline pt-2p' title={`Data de criação: ${created.toLocaleDateString(locale)} ${created.toLocaleTimeString(locale)}`}>
              {created.toLocaleDateString(locale)}
            </strong>
            <strong className='ms-2 me-2'> / </strong>
            <strong className='text-muted font-italic text-underline pt-2p' title={`Data do último commit:  ${committer.toLocaleDateString(locale)} ${committer.toLocaleTimeString(locale)}`}>
              {committer.toLocaleDateString(locale)}
            </strong>
          </div>

          <div className='star d-flex align-items-center'>
            <BsStarFill color='gold' />&nbsp;
            <small className='text-bold pt-2p'>{repository.stargazers_count}</small>
          </div>

          <div className={`star d-flex align-items-center ${repository.archived ? 'text-info' : 'text-default'}`}>
            <BsArchiveFill />&nbsp;
            <small className='text-bold pt-2p'>
              {repository.archived ? 'Sim' : 'Não'}
            </small>
          </div>

          <small className='small text-info'>{repository.language}</small>
        </div>

      </div>
    </div>
  )
}

export default Repository;