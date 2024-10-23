package org.cours.springdatarest.modele;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;


@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:3000",
        methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE },
        maxAge = 3600)
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    List<Voiture> findByModele(@Param("modele") String modele);

    List<Voiture> findByCouleur(@Param("couleur") String couleur) ;

}
