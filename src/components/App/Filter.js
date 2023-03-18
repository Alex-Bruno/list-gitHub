import { BsFillFunnelFill, BsStarFill, BsCalendarFill, BsSearch, BsFillEraserFill, BsSortAlphaDown } from 'react-icons/bs';

const Filter = ({ filter, handleChange, clearFilter, handleSubmit }) => {
  const today = new Date();
  return (
    <section id='list' className='mt-2'>
      <div className='container'>
        <div className='card bg-light'>
          <div className='card-body'>

            <h5 className='card-title text-bold mb-3'>
              <BsFillFunnelFill />&nbsp;
              Filtro
            </h5>

            <form id='form-filter' onSubmit={handleSubmit}>
              <div className='row'>

                <div className='col-md-3'>
                  <label className='sr-only'>Nome</label>
                  <input type='text' name='name' placeholder='ALGORITMO-DE-ESCALONAMENTO' className='form-control' onChange={handleChange} />
                </div>

                <div className='col-md-3'>
                  <label className='sr-only'>Arquivado?</label>
                  <select className='form-control' id='select-archived' name='archived' defaultValue={'all'} onChange={handleChange}>
                    <option value='all'>Todos</option>
                    <option value='1'>Sim</option>
                    <option value='0'>Não</option>
                  </select>
                </div>

                <div className='col-md-3'>
                  <label className='sr-only'>
                    <BsStarFill />&nbsp;
                    Min
                  </label>
                  <input type='number' name='min_star' className='form-control' min='0' step='1' onChange={handleChange} />
                </div>

                <div className='col-md-3'>
                  <label className='sr-only'>
                    <BsStarFill />&nbsp;
                    Max
                  </label>
                  <input type='number' name='max_star' className='form-control' min='0' step='1' onChange={handleChange} />
                </div>

                <div className='col-md-3'>
                  <label className='sr-only'>
                    <BsCalendarFill title='Data de criação' />&nbsp;
                    De
                  </label>
                  <input type='date' name='start_date' className='form-control' max={today.toISOString().split('T')[0]} onChange={handleChange} />
                </div>

                <div className='col-md-3'>
                  <label className='sr-only'>
                    <BsCalendarFill title='ata de criação' />&nbsp;
                    Até
                  </label>
                  <input type='date' name='end_date' className='form-control' max={today.toISOString().split('T')[0]} onChange={handleChange} />
                </div>

              </div>

              <div className='row mt-3'>
                <h6 className='card-title text-bold mb-3'>
                  <BsSortAlphaDown />&nbsp;
                  Ordenar
                </h6>
              </div>

              <div className='row text-muted'>

                <div className='col-md-3'>
                  <label className='sr-only'>Por</label>
                  <select className='form-control' id='select-name' name='sort' defaultValue={'name'} onChange={handleChange}>
                    <option value='name'>Nome</option>
                    <option value='last-commit'>Último commit</option>
                  </select>
                </div>
                <div className='col-md-3'>
                  <label className='sr-only'>Ordem</label>
                  <select className='form-control' id='select-name' name='order' defaultValue={'asc'} onChange={handleChange}>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                  </select>
                </div>

              </div>

              <div className='row mt-3'>
                <div className='col-12 float-right'>
                  <button type='submit' className='btn btn-primary ms-2 float-end'>
                    <BsSearch />&nbsp;
                    Buscar
                  </button>

                  <a href='/' className='btn btn-dark float-end' onClick={() => clearFilter()}>
                    <BsFillEraserFill />&nbsp;
                    Limpar filtro
                  </a>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Filter;