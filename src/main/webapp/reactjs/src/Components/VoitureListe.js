import React, { Component } from 'react';
import {Button, Card, Table} from 'react-bootstrap'; // N'oubliez pas d'importer Table

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, falist} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {Link} from "react-router-dom";

export default class VoitureListe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voitures: []
        };
    }


    updateVoiture = (voitureId) => {
        const username = "user";
        const password = "user";
        const basicAuth = 'Basic ' + btoa(username + ':' + password);

        axios.put("http://localhost:8000/api/voitures/"+voitureId, {
            headers: {
                'Authorization': basicAuth
            }
        })
            .then(response => {
                if(response.data != null){
                    alert("Voiture supprimée avec succès.");
                    this.setState({
                        voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
                    })
                }
            })
            .catch(error => {
                console.error("Erreur lors de la suppression:", error);
                alert("Erreur lors de la suppression de la voiture");
            });
    };

    handleEditClick = (voitureId) => {
        this.props.history.push(`/edit/${voitureId}`);
    };

    deleteVoiture = (voitureId) => {
        const username = "user";
        const password = "user";
        const basicAuth = 'Basic ' + btoa(username + ':' + password);

        axios.delete("http://localhost:8000/api/voitures/"+voitureId, {
            headers: {
                'Authorization': basicAuth
            }
        })
            .then(response => {
                if(response.data != null){
                    alert("Voiture supprimée avec succès.");
                    this.setState({
                        voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
                    })
                }
            })
            .catch(error => {
                console.error("Erreur lors de la suppression:", error);
                alert("Erreur lors de la suppression de la voiture");
            });
    };
    componentDidMount(){
        // Add authentication headers to your axios request


        const username = "user";  // The username you set in Spring Security
        const password = "user";  // The password you set in Spring Security
        const basicAuth = 'Basic ' + btoa(username + ':' + password);

        axios.get("http://localhost:8000/voitures", {

            headers: {
                'Authorization': basicAuth
            }

        })
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
                                        <Button
                                            as={Link}
                                            to={`/voiture/${voiture.id}`}
                                            size="sm"
                                            variant="outline-primary"
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </Button>

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
