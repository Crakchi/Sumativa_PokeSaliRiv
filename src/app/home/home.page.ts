import { APIServiceService } from '../Services/apiservice.service';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemonID: number=0;
  pokemonName: string="";
  pokemonIDResult: any;
  pokemonNameResult: any;

  constructor(private api: APIServiceService, private afs: AngularFirestore) {}



  getPokemonDataID(id: number) {
    try {
      this.api.getPokemonID(id).subscribe((response => {
        this.pokemonIDResult = response;
      }));
    } catch (error) {
      console.log(error);
    }
  }

  getPokemonDataName(name: string) {
    try {
      this.api.getPokemonName(name).subscribe((response => {
        this.pokemonNameResult = response;
        // Obtiene el documento de Firebase
        const docRef = this.afs.collection('Pokedex').doc('Tipo');
        docRef.get().subscribe(doc => {
          if (doc.exists) {
            // Si el documento existe, obtiene los datos
            const data: { [key: string]: boolean } = doc.data() as { [key: string]: boolean };
            // Comprueba si data es null o undefined
            if (data) {
              // Establece todos los tipos a false
              for (const type in data) {
                data[type] = false;
              }
              // Establece el tipo del Pokémon actual a true
              data[this.pokemonNameResult.types[0].type.name] = true;
              // Actualiza el documento con los nuevos datos
              docRef.update(data);
            } else {
              console.log('No hay datos en el documento');
            }
          }
        });
      }));
    } catch (error) {
      console.log(error);
    }
  }
  
  
  
  
getLedColor(type: string): string {
  const typeColorMap: { [key: string]: string } = {
    'steel': 'Gris',
    'water': 'Azul',
    'bug': 'Verde claro',
    'dragon': 'Morado',
    'electric': 'Amarillo',
    'ghost': 'Lila',
    'fire': 'Rojo',
    'fairy': 'Rosa',
    'ice': 'Blanco',
    'fighting': 'Marrón',
    'normal': 'Beige',
    'grass': 'Verde',
    'psychic': 'Rosa fuerte',
    'rock': 'Marrón oscuro',
    'dark': 'Negro',
    'ground': 'Naranja',
    'poison': 'Violeta',
    'flying': 'Celeste'
  };
  return typeColorMap[type];
}

  
    

}
