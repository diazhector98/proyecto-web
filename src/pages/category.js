import React, {
  useState
} from 'react'
import Mongo from '../utils/mongo'
import Library from '../utils/library'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../pages/assets/logo_web.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './gridStyles.css'
var aventuraimg = "https://www.thebigsmoke.com.au/wp-content/uploads/Moby-Dick-illustrazione-romanzo-.jpg"
var clasicosimg = "https://www.zabaan.com/wp-content/uploads/trojanhorse-e1480340127898.jpeg"
var historiaimg = "https://i.pinimg.com/originals/eb/a4/09/eba409d4d2251a1827460f5d324fa16f.jpg"
var biografiaimg = "https://factsandtrends.net/wp-content/uploads/2018/05/biographies-680x349.jpg"
var cienciaimg = "https://www.brown.edu/academics/classics/sites/academics-classics/files/field/image/ancient%20hipparchus-greek-astronomer-science-source%20LARGE.jpg"
var cuentosimg = "https://thestoryofsnark.files.wordpress.com/2017/05/gulliver-019.jpg?w=460"


const CategoryPage = () => {

  //Declaración de variables
  let [textQuery, setTextQuery] = useState("")
  let [books, setBooks] = useState([])



  const onInsertUser = () => {


    const mongo = new Mongo()
    mongo.insertUser({
      firebaseId: "testId",
      name: "testName",
      email: "testEmail"
    }).then(result => {
      console.log({
        result
      })
    })
  }

  const searchBooks = () => {
    const library = new Library()
    library.searchBooks({
      textQuery
    }).then(result => {
      console.log({
        result
      })
      const {
        books
      } = result.data
      setBooks(books)
    })
  }



  return ( 
  
  <div>

    <Navbar bg = "light"
    variant = "light" >
    <Navbar.Brand href = "/home" >

    <img src = {
      logo
    }
    alt = "Logo"
    height = "60px"
    width = "90" / >
    </Navbar.Brand>

    <Nav className = "mr-auto" >
    <Nav.Link href = "/books" > Mis libros </Nav.Link> </Nav > 
    
    
      
    <Form inline >
     
    <Form.Control type = "text"
    placeholder = "Busca un libro"
    className = "mr-sm-2"
    onChange = {
      (e) => setTextQuery(e.target.value)
    }/> 
    
    
    
 </Form > 

</Navbar>

<div class="card-deck">
  <div class="card">
  
    <img class="card-img-top" src= {aventuraimg} alt="Card image cap" height="190"/>
    <div class="card-body">
    <a href="#" class="btn">
      <h5 class="card-title">Aventura y acción</h5>
      <p class="card-text">Los libros de acción y aventuras constantemente te mantienen al borde de tu asiento con emoción, ya que tu personaje principal favorito se encuentra repetidamente en situaciones de alto riesgo.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </a>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src={clasicosimg} height="190"/>
    <div class="card-body">
    <a href="#" class="btn">
      <h5 class="card-title">Clásicos</h5>
      <p class="card-text">Los clásicos han existido durante décadas y, a menudo, fueron historias innovadoras en el momento de su publicación, pero han continuado siendo impactantes durante generaciones, y han servido como base para muchas obras populares que leemos hoy.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </a>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src= {historiaimg} alt="Card image cap" height="190"/>
    <div class="card-body">
    <a href="#" class="btn">
      <h5 class="card-title">Historia</h5>
      <p class="card-text">Estos libros narran y presentan un momento específico en el tiempo, con el objetivo de educar e informar al lector, mirando todas las partes del mundo en un momento dado.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </a>
    </div>
  </div>
</div>
<div class="card-deck">
  <div class="card">
    <img class="card-img-top" src= {biografiaimg} alt="Card image cap" height="190"/>
    <div class="card-body">
    <a href="#" class="btn">
      <h5 class="card-title">Biografía</h5>
      <p class="card-text">Sirviendo como un relato oficial de los detalles y eventos de la vida de una persona, las autobiografías son escritas por el propio sujeto, mientras que las biografías son escritas por un autor que no es el tema central del libro.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </a>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src={cienciaimg} height="190"/>
    <div class="card-body">
    <a href="#" class="btn">
      <h5 class="card-title">Ciencia</h5>
      <p class="card-text">Conjunto de libros de distintas ramas de la ciencia como las matememáticas, geografía, química, astronomía, biología, libors de ingeniería, etc..</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </a>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src= {cuentosimg} alt="Card image cap" height="190"/>
    <div class="card-body">
    <a href="#" class="btn">
      <h5 class="card-title">Cuentos</h5>
      <p class="card-text">Los cuentos son una prosa breve que es significativamente, bueno, más breve que las novelas. Los escritores cuentan estrictamente sus narrativas a través de un tema específico y una serie de breves escenas.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </a>
    </div>
  </div>
</div>

    <div>
   

    <div style = {
      {
        display: "flex",
        flexWrap: "wrap"
      }
    } > {
      books.map((book, index) => {
        return (

          <a href = "/books">
          <div style = {
            {
              margin: 40,
              width: 200
            }
          } >
           
            <img style = {
            {
              width: 100,
              height: 200
            }

         
          }
          src = {
            book.imageLinks ? book.imageLinks.smallThumbnail : ""
          }/> <p key = {
            index
          } > < b > {
            book.title
          } </b></p >
          <p> {
            book.subtitle
          } </p> </div >

      </a>    

        )
      })
    } </div> </div>

    </div>
  )
}

export default CategoryPage