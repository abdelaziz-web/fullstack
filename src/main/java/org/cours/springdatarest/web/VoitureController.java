package org.cours.springdatarest.web;


import io.swagger.v3.oas.annotations.tags.Tag;
import org.cours.springdatarest.modele.Voiture;
import org.cours.springdatarest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@Tag(name = "Voiture Controller", description = "API de gestion des voitures")
@CrossOrigin(origins = "http://localhost:3000")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @RequestMapping(value = "/voitures" , method = GET)
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }

    @PostMapping("/voitures")
    public Voiture addVoiture(@RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);
    }


    @DeleteMapping("/voitures/{id}")
    public void deleteVoiture(@PathVariable Long id) {
        voitureRepo.deleteById(id);
    }

}
