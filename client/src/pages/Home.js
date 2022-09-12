import '../styles/styles.css';
import MultiForm from '../components/MultiForm';

function Home() {
  return (
    <div>
      <div></div>
      <h3 className="home-title">
        Su historia se encuentra disponible en nuestra base de datos, por favor
        complete el siguiente formulario con la información requerida.
      </h3>
      <div>
        <MultiForm />
        <h3 className="home-title-rec">Recuerde!</h3>
        <article className="main-text">
          <h4>Si usted es paciente debe anexar:</h4>
          Formato de carta de solicitud de historia clínica, Copia del documento
          de identificación del Paciente en formato PDF.
        </article>
      </div>

      <div>
        <article className="main-text">
          <h4>Si usted es autorizado por el paciente debe anexar:</h4>
          Formato de carta de autorización de entrega de historia clínica, Copia
          del documento de identificación del Paciente, Copia del documento de
          identificación del Autorizado. La normatividad Colombiana (Ley 23 de
          1981, en el capítulo III) es cautelosa en la protección y
          confidencialidad de la historia clínica, la cual es considerada un
          documento privado, sometido a reserva, que sólo puede ser conocido por
          terceros, previa autorización del paciente o en casos previstos por la
          Ley.
          <br />
        </article>
        <br />
        <br />
      </div>
      <footer>
        <div className="footer">
          © 2022 Copyright: Medicoop I.P.S. - all Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default Home;
