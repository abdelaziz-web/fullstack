import React, { Component } from 'react';
import {Button, Card, Table} from 'react-bootstrap'; // N'oubliez pas d'importer Table

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { falist } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export default class VoitureListe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voitures: []
        };
    }

    deleteVoiture = (voitureId) => {
        axios.delete("http://localhost:8000/voitures/"+voitureId)
            .then(response => {
                if(response.data != null){
                    alert("Voiture supprimée avec succès.");
                    this.setState({
                        voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
                    })
                }
            })
    };
    componentDidMount(){
        axios.get("http://localhost:8000/voitures")
            .then(response => {
                console.log(response.data);
                this.setState({ voitures: response.data });
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }

    render() {
        return (
            <Card className="border border-dark bg-dark text-white">
                <Card.Header>
                    <FontAwesomeIcon icon="faSave" />
                    <h3>Liste des Voitures</h3>
                </Card.Header>
                <Card.Body>
                    {/* Utilisation du composant Table de react-bootstrap */}
                    <Table bordered hover striped variant="dark" className="table-striped table-dark">
                        <thead>
                        <tr>
                            <th>Marque</th>
                            <th>Modèle</th>
                            <th>Couleur</th>
                            <th>Année</th>
                            <th>immatricule</th>
                            <th>Prix</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.voitures.length === 0 ? (
                            <tr align="center">
                                <td colSpan="6">Aucune voiture disponible.</td> {/* Corrected message */}
                            </tr>
                        ) : (
                            this.state.voitures.map((voiture) => (
                                <tr key={voiture.id}>
                                    <td>{voiture.marque}</td>
                                    <td>{voiture.modele}</td>
                                    <td>{voiture.couleur}</td>
                                    <td>{voiture.annee}</td>
                                    <td>{voiture.immatricule}</td>
                                    <td>{voiture.prix}</td>
                                    <td>
                                        {/* You can add action buttons here, e.g., Edit or Delete */}
                                        <Button variant="warning">Edit</Button>
                                        <Button variant="danger" onClick={this.deleteVoiture.bind(this,voiture.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </Table>

                </Card.Body>
            </Card>
        );
    }
}
