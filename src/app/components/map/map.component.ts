import { Component, OnInit, Input } from '@angular/core';
import { query } from '@angular/core/src/render3/query';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @Input() newParams;

  zoom: number = 10;

  initialPosition
  positions = []
  detailsPositions = []
  fetchErrors = false
  endpoint = 'https://backend.smartwaypanel.com/api/tracking/historical_data/positions'
  params = {
    vehicles: 33,
    datetime_from: '2019-05-01T18:00',
    datetime_to: '2019-05-03T03:00',
  }
  authorization = 'Bearer IC5n6ZKd78ZZ79oxtweaZaUugV5u22'
  isLoading = false;

  constructor() { }

  // Consumimos de los endpoints datos de posiciones y luego la velocidad en cada posicion
  ngOnInit(){
    this.fetchData()
  }

  // Devuelve string formado por las parejas clave-valor del objeto params
  getQuery(params){
    let query = '?'
    let paramsKeyLength = Object.keys(params).length
    let index = 0
    for(let key in params){
      if(index < paramsKeyLength - 1)
        query += key + '=' + params[key] + '&'
      else
        query += key + '=' + params[key]
      index++
    }
    return query
  }

  // Escucha cualqueir cambio en el template, en particular si llegan nuevos parametro de filtraje al componente map
  ngOnChanges(event){
    if(Object.keys(event.newParams.currentValue).length > 0){
      this.params = event.newParams.currentValue
      this.fetchData()
    }
  }


  fetchData(){
    this.isLoading = true
    this.fetchErrors = false
    fetch(this.endpoint + this.getQuery(this.params), {
      method: 'get',
      headers: new Headers({
        'Authorization': this.authorization,
      }),
    }).then((res) => {
      return res.json() // res es un Promise, por lo tanto debemos capturar el resutlado en el siguiente then
    }).then((res) => {
      this.positions = res.tracking[0].data
      this.initialPosition = this.positions[0].position;
      console.log(this.initialPosition)
      fetch(this.endpoint + this.getQuery(Object.assign(this.params, {variable_name: 'speed'})), {
        method: 'get',
        headers: new Headers({
          'Authorization': this.authorization,
        }),
      }).then((res) => {
        return res.json() // res es un Promise, por lo tanto debemos capturar el resutlado en el siguiente then
      }).then((res) => {
        this.detailsPositions = res.tracking[0].data
        console.log(this.detailsPositions)
        this.isLoading = false
      }).catch((error) => {
        console.log('An error was ocurred!')
        this.isLoading = false
        this.fetchErrors = true // Capturamos cualquier error, asi podemos informarle al usuario desde el template
      })
    }).catch((error) => {
      console.log('An error was ocurred!')
      this.isLoading = false
      this.fetchErrors = true // Capturamos cualquier error, asi podemos informarle al usuario desde el template
    })
  }

}
