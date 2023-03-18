import './../../styles/Header.css';

const Header = () => (
  <header id='header' className='d-flex justify-content-center align-items-center'>
    <img
      src={process.env.REACT_APP_OWNER_AVATAR}
      alt={process.env.REACT_APP_API_REPOSITORY}
      height='80%'
      className='rounded'
    />

    <div className='ml-10'>
      <h4 className='text-white text-bold text-center text-uppercase'>
        {process.env.REACT_APP_API_REPOSITORY} - Utilizando api publica do GitHub&nbsp;
      </h4>
    </div>
  </header>
)

export default Header;