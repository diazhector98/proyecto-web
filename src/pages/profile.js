
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Navbar } from "react-bootstrap"
import Nav from 'react-bootstrap/Nav'
import * as firebase from "firebase/app";
import Library from '../utils/library'
import logo from '../pages/assets/logo_web.png'
import "firebase/auth";
import app from "../base.js"
import Mongo from '../utils/mongo'
import ManageUser from '../utils/manageUser'
import BookList from '../components/book-list'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import moment from 'moment'
import WeekStatsChart from '../components/week-stats-chart'
import Spinner from 'react-bootstrap/Spinner'
import Recommendations from '../components/recommendations'

const READING = 0
const PLANNING = 1
const READ = 2
const RECOMMENDATIONS = 3

const ProfilePage = ({ history }) => {
    var uid;
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        firebaseId: "",
        pagesRead: null
    })

    const [loading, setLoading] = useState(true)
    const [pagesRead, setPagesRead] = useState(null)
    let [textQuery, setTextQuery] = useState("")
    let [books, setBooks] = useState([])
    const [pagesReadToday, setPagesReadToday] = useState(0)
    const [userBooks, setUserBooks] = useState([])
    const [readingNowBooks, setReadingNowBooks] = useState([])
    const [planningToReadBooks, setPlanningToReadBooks] = useState([])
    const [readBooks, setReadBooks] = useState([])
    const [section, setSection] = useState(READING)
    const [recommendedBookIds, setRecommendedBookIds] = useState([])

    const bookIdInBooks = (id, books) => {
        for (let i = 0; i < books.length; i++) {
            const book = books[i]
            const { bookId } = book
            if (id === bookId) {
                return true
            }
        }
        return false
    }

    const getUserBookInfo = (id, books) => {
        for (let i = 0; i < books.length; i++) {
            const book = books[i]
            const { bookId } = book
            if (id === bookId) {
                return book
            }
        }
        return null
    }

    const onUpdateBookCurrentPage = (bookId, currentPage, delta) => {
        const today = moment().format("DD-MM-YY")
        const mongo = new Mongo()

        if (userInfo.pagesRead != null) {
            setPagesReadToday(pagesReadToday + delta)
            mongo.setPagesRead({firebaseId: userInfo.firebaseId, date: today, pages: pagesReadToday + delta}).then((result) => {
                console.log({result})
            })
            let pr = pagesRead
            pr.[today] = pagesReadToday + delta
            console.log({pr})
            setPagesRead(pr)
        } else {
            setPagesReadToday(pagesReadToday + delta)
            mongo.setPagesRead({firebaseId: userInfo.firebaseId, date: today, pages: pagesReadToday + delta}).then((result) => {
                console.log({result})
            })
        }
        mongo.updateBookCurrentPage({
            bookId,
            currentPage,
            firebaseId: userInfo.firebaseId
        }).then((result) => {
            console.log({ result })
        })
    }

    const NavBarStatus = ({ }) => {
        var user = firebase.auth().currentUser;
        if (user) {
            return [<Nav.Link href="/profile" key={3}> Profile </Nav.Link>,
            <Button variant="light" key={4} onClick={LogOut}>Log Out</Button>]
        }
        else {
            return [<Nav.Link href="/login" key={0}> Log In </Nav.Link>,
            <Nav.Link href="/signup" key={2}> Sign Up </Nav.Link>]
        }
    }

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            if (user != null) {
                uid = user.uid;
                const mongo = new Mongo()
                mongo.getUser({
                    firebaseId: uid
                }).then((result) => {
                    const userData = result.data
                    const today = moment().format("DD-MM-YY")
                    setUserInfo(userData)
                    if (userData.pagesRead != null) {
                        setPagesRead(userData.pagesRead)
                        if (userData.pagesRead.[today]) {
                            setPagesReadToday(userData.pagesRead.[today])
                        }
                    }

                    mongo.getUserRecommendations({firebaseId: uid}).then((result) => {
                        setRecommendedBookIds(result.data)
                    })

                    mongo.getUserBooks({
                        firebaseId: uid
                    }).then((result) => {

                        if (result.data === "Error") {
                            return
                        }
                        setUserBooks(result.data)


                        const books = result.data
                        let readingBooks = []
                        let planningBooks = []
                        let readBooks = []

                        books.forEach(book => {
                            const { bookId } = book
                            if (userData.planningToRead && bookIdInBooks(bookId, userData.planningToRead)) {
                                planningBooks.push(book)
                            }

                            if (userData.booksRead && bookIdInBooks(bookId, userData.booksRead)) {
                                readBooks.push(book)
                            }

                            if (userData.readingNow && bookIdInBooks(bookId, userData.readingNow)) {
                                let userBook = getUserBookInfo(bookId, userData.readingNow)
                                readingBooks.push({
                                    ...userBook,
                                    ...book
                                })
                            }


                        })
                        setPlanningToReadBooks(planningBooks)
                        setReadingNowBooks(readingBooks)
                        setReadBooks(readBooks)
                        setLoading(false)
                    })
                })
            }
        })
    }, [])

    const manage = new ManageUser()
    const LogOut = (() => {      
        manage.logOutUser({history})
    })

    const Delete = (() => {
        manage.deleteUser({history})
    })

    const onFinishBookClicked = (bookId) => {
        console.log({ bookId })
        const mongo = new Mongo()
        const today = new Date()
        mongo.addBookRead({bookId, firebaseId: userInfo.firebaseId, dateEnded: today}).then((result) => {
            let readingBooks = readingNowBooks.filter(book => book.bookId != bookId)
            let removedBook = readingNowBooks.filter(book => book.bookId == bookId)[0]
            let booksRead = readBooks
            booksRead.push(removedBook)
            setReadingNowBooks(readingBooks)
            setReadBooks(booksRead)
        })
    }

    const onMoreInfoClicked = (bookId) => {
        history.push(`/book/${bookId}`)
    }


    function formatName() {
        return userInfo.name;
    }


    const ProfileName = () => {

        return React.createElement('div', null, formatName())
    }

    return (
        <div>
            <Navbar bg="light"
                variant="light" >
                <Navbar.Brand >
                    <img src={logo} alt="Logo" height="60px" width="90" />
                </Navbar.Brand>
                <Nav className="mr-auto" >
                    <Nav.Link href="/books" > Buscar Libros </Nav.Link>
                </Nav >
            </Navbar>
            <Card style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 30
            }}>
                <Card style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 20,
                    padding: 10
                }}>
                    <h1>Perfíl</h1>
                    {loading ?  <Spinner animation="border" role="status"></Spinner> : null}
                    <form>
                        <div>
                            <label>
                                <ProfileName />
                            </label>
                        </div>
                        <div>
                            <label>
                                {userInfo.email}
                            </label>
                        </div>
                    </form>
                    <div>
                        <Row>
                            <Col>
                                <Button type="LogOut" onClick={LogOut}>Cerrar Sesión</Button>
                            </Col>
                            <Col>
                                <Button type="Danger" onClick={Delete}>Borrar cuenta</Button>
                            </Col>
                        </Row>
                    </div>

                    <div>
                        <h3> Hoy</h3>
                        <h4>{pagesReadToday}</h4>
                    </div>

                    <WeekStatsChart pagesRead={pagesRead}/>
                </Card>

                <div>
                    <div style={{
                        display: 'flex',
                    }}>
                        <Button 
                            variant={section === READING ? 'primary' : 'outline-primary'}
                            style={{fontSize: 30, margin: 10}} 
                            onClick={() => setSection(READING)}> 
                            Leyendo 
                        </Button>
                        <Button 
                            variant={section === PLANNING ? 'primary' : 'outline-primary'}
                            style={{fontSize: 30, margin: 10}} 
                            onClick={() => setSection(PLANNING)}> 
                            Planeando Leer 
                        </Button>
                        <Button 
                            variant={section === READ ? 'primary' : 'outline-primary'}
                            style={{fontSize: 30, margin: 10}} 
                            onClick={() => setSection(READ)}> 
                            Leídos 
                        </Button>
                        <Button 
                            variant={section === RECOMMENDATIONS ? 'primary' : 'outline-primary'}
                            style={{fontSize: 30, margin: 10}} 
                            onClick={() => setSection(RECOMMENDATIONS)}> 
                            Recomendaciones 
                        </Button>
                    </div>

                    {
                        section == READING ?
                            <BookList
                                showProgress={true}
                                title="Libros Leyendo"
                                books={readingNowBooks}
                                onUpdateBookCurrentPage={onUpdateBookCurrentPage}
                                onFinishBookClicked={onFinishBookClicked}
                                onMoreInfoClicked={onMoreInfoClicked}
                            /> :
                        section == PLANNING ?
                            <BookList 
                                title="Libros Planeando Leer" 
                                books={planningToReadBooks} 
                                onMoreInfoClicked={onMoreInfoClicked}
                                /> :
                        section == READ ?
                            <BookList title="Libros Leidos" books={readBooks} 
                                onMoreInfoClicked={onMoreInfoClicked}
                            
                            /> :
                        section == RECOMMENDATIONS ?
                            <Recommendations bookIds={recommendedBookIds} onMoreInfoClicked={onMoreInfoClicked}/> :
                        null
                    }
                </div>




            </Card>
        </div>

    )
}

export default ProfilePage;