import './css/style.css'
import './css/font-awesome.min.css'
import { Link } from 'react-router-dom'

const Error: React.FC = () => {
  return (
    <div id='notfound'>
      <div className='notfound-bg'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='notfound'>
        <div className='notfound-404'>
          <h1>404</h1>
        </div>
        <h2>Page Not Found</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <Link to='/'>Back to Homepage</Link>
        <div className='notfound-social'>
          <a href='#'>
            <i className='fa fa-facebook'></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Error
