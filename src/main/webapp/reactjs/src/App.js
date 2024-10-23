import React, { Component } from 'react'; // Import de React et Component
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar';
import { Jumbotron } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Utiliser BrowserRouter et Routes
import Bienvenue from "./Components/Bienvenue";
import Voiture from "./Components/Voiture"; // Importer le composant Voiture
import VoitureListe from "./Components/VoitureListe"; // Importer le composant VoitureListe
import Footer from "./Components/Footer";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marque: '',
            modele: '',
            couleur: '',
            annee: '',
            prix: ''
        };
    }

    // Méthode pour gérer la soumission de la voiture
    submitVoiture(event) {
        alert(this.state.marque);
        event.preventDefault();
    }

    render() {
        const marginTop = { marginTop: "20px" };

        return (
            <div>
                <NavigationBar />
                <Container className="mt-4">
                    <div className="bg-light p-5 rounded-3">
                        <Container>
                            <Row>
                                <Col lg={12} style={marginTop}>
                                    <Routes>
                                        <Route path="/" element={<Bienvenue />} />
                                        <Route path="/add" element={<Voiture submitVoiture={this.submitVoiture.bind(this)} />} />
                                        <Route path="/list" element={<VoitureListe />} />
                                    </Routes>
                                    <Footer />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Container>
            </div>
        );
    }
}

export default App;
