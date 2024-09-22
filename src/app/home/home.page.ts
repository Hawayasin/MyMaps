import { Component, OnInit, resolveForwardRef } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point'; // Import Point
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol'
// import SimpleMarkerSymbol from '@arcgis/core/layers/ImageryLayer';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'; // Import PictureMarkerSymbol

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  mapView: MapView | any;
  userLocationGraphic: Graphic | any;

  public basemapOptions: string[] = ['topo-vector', 'satellite', 'streets', 'dark-gray', 'hybrid']; // Array of basemap options
  public selectedBasemap: string = 'topo-vector'; // Default basemap

  // private mapView: MapView | any;
  public latitude: number | any;
  public longitude: number | any;

  constructor() { }

  async ngOnInit() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    const map = new Map({
      basemap: this.selectedBasemap
      // basemap: 'topo-vector',
      // basemap: 'dark-gray-vector'
    });

    // const point = new Point({
    //   longitude: this.longitude,
    //   latitude: this.latitude
    // });


    // const position = await Geolocation.getCurrentPosition();

    //Penambahan koordinat sesuai lokasi
        console.log('Current Latitude:', this.latitude);
        console.log('Current Longitude:', this.longitude);


        // const markerSymbol = {
        //   type: "picture-marker",
        //   url: 'assets/icon/markerr.png',
        //   size: '100px',
        //   color: [238, 75, 43],
        //   outline: {
        //     color: [],
        //     width: '100px',
        //     height: '100px'
        //   }
        // };

 // Create a graphic for the point
      // const pointGraphic = new Graphic({
      //   geometry: point,
      //   // symbol: markerSymbol,
      // });


//       this.mapView.graphics.add(pointGraphic);

//       //Menambahkan marker ke map view
//       // view.graphics.add(pointGraphic);

//     } catch (error) {
//       console.error('Error getting location', error);
//     }

    this.mapView = new MapView({
      container: 'container',
      map: map,
      // zoom: 15,
      center: [this.latitude, this.longitude],

    });

    let weatherServiceFL = new ImageryLayer({ url: WeatherServiceUrl });
    map.add(weatherServiceFL);

    await this.updateUserLocationOnMap();
    this.mapView.center = this.userLocationGraphic.geometry as Point;
    setInterval(this.updateUserLocationOnMap.bind(this), 10000)
  }
  async getLocationService(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((resp) => {
        resolve([resp.coords.latitude, resp.coords.longitude]);
      });
    });
  }

  async updateUserLocationOnMap() {
  //   let latLng = await this.getLocationService();
  //   let geom = new Point({ latitude: latLng[0], longitude: latLng[1] });

  //   // Define a custom marker using PictureMarkerSymbol
  //   const markerSymbol = new PictureMarkerSymbol({
  //     url: 'assets/icon/marker.png',  // Path to your custom marker image
  //     width: '24px',
  //     height: '24px',
  //   });

  //   if (this.userLocationGraphic) {
  //     // Update existing location marker
  //     this.userLocationGraphic.geometry = geom;
  //   } else {
  //     // Create new location marker with custom icon
  //     this.userLocationGraphic = new Graphic({
  //       symbol: markerSymbol,
  //       geometry: geom,
  //     });
  //     this.mapView.graphics.add(this.userLocationGraphic);
  //   }
  // }
    let latLng = await this.getLocationService();
    let geom = new Point({ latitude: latLng[0], longitude: latLng[1] })


    // Define a custom marker using PictureMarkerSymbol
    const markerSymbol = new PictureMarkerSymbol({
      url: 'assets/icon/markerr.png',  // Path to your custom marker image
      width: '24px',
      height: '24px',
    });

    if (this.userLocationGraphic = new Graphic) {
      this.userLocationGraphic.geometry = geom;
    } else {
      this.userLocationGraphic = new Graphic({
        symbol: new SimpleMarkerSymbol(),
        geometry: geom,
      });
      this.mapView.graphics.add(this.userLocationGraphic);
    }
  }


  // public latitude: number | any;
  // public longitude: number | any;

  //   public async ngOnInit() {
  //     try {
  //       // Get the current position using Capacitor Geolocation
  //       const position = await Geolocation.getCurrentPosition();

  //       //Setting koordinat
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;

  //       //Penambahan koordinat sesuai lokasi
  //       console.log('Current Latitude:', this.latitude);
  //       console.log('Current Longitude:', this.longitude);

  //Membuat peta background
  // const map = new Map({
  //   basemap: this.selectedBasemap
  //   // basemap: 'dark-gray-vector'
  // });

  //       this.mapView = new MapView({
  //         container: 'container',
  //         map: map,
  //         zoom: 15,
  //         center: [this.longitude, this.latitude]
  //       });

  //       // Create the view and use the fetched latitude and longitude for the center point
  //       // const view = new MapView({
  //       //   container: 'container',
  //       //   map: map,
  //       //   zoom: 15,
  //       //   center: [this.longitude, this.latitude]
  //       // });

  //  // Mendefinisikan geometri titik menggunakan ArcGIS Point Class
  //  const point = new Point({
  //   longitude: this.longitude,
  //   latitude: this.latitude
  // });

  //       // Define the symbol for the point (marker)
  //       const markerSymbol = {
  //          type: "picture-marker",
  //         url: 'assets/icon/markerr.png',
  //         color: [238, 75, 43],
  //         outline: {
  //           color: [],
  //           width: '100px',
  //           height: '100px'
  //         }
  //       };

  //       // Create a graphic for the point
  //       const pointGraphic = new Graphic({
  //         geometry: point,
  //         symbol: markerSymbol
  //       });

  //       this.mapView.graphics.add(pointGraphic);

  //       //Menambahkan marker ke map view
  //       // view.graphics.add(pointGraphic);

  //     } catch (error) {
  //       console.error('Error getting location', error);
  //     }
  //   }

  public changeBasemap(basemap: string) {
    if (this.mapView) {
      this.mapView.map.basemap = basemap;
    }
  }
}

const WeatherServiceUrl = 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer'
