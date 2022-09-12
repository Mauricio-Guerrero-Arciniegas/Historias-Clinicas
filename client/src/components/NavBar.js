import '../styles/styles.css';
import Image from '../assets/logo Medicoop.png';

const LoadingScreen = () => {
  return (
    <div className="navbar-container">
      <ul>
        <li>
          <img className="logo" src={Image} alt="" />
        </li>
        <li>
          <a className="ingresar" href="/#/login">
            Ingresar
          </a>
        </li>
        <li>
          <a className="salir" role="button" href="/#/login">
            Salir
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LoadingScreen;
