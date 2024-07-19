import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ApiService } from '../services/api.service';
import { DataPoint, GenreWeighting } from 'src/types';
import { of } from 'rxjs';


@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css'],
})
export class PieComponent {
	constructor(private apiService: ApiService){
		this.apiService.getTopArtists('long_term');
	}
	public arrayOfGenres: any[] = []

	chartOptions = {
		animationEnabled: true,
		title: {
		  text: "Yearly Breakdown"
		},
		data: [{
		  type: "pie",
		  startAngle: -90,
		  indexLabel: "{name}: {y}",
		  yValueFormatString: "#,###.##'%'",
		  dataPoints: [
			{ y: 14.1, name: "Toys" },
			{ y: 28.2, name: "Electronics" },
			{ y: 14.4, name: "Groceries" },
			{ y: 43.3, name: "Furniture" }
		  ]
		}]
	}	

	private formatTopArtists(): DataPoint| any {
		
		// of(this.apiService.getTopArtists('long_term')).subscribe(res => res.map(item => item.artists.map(artist => artist.items.map(artistMetadata => {
		// 	artistMetadata.genres.forEach(genre => {
		// 		if (this.arrayOfGenres.find(x => x.name === genre) != null ){
		// 			this.arrayOfGenres.filter(val => val.name === genre)[0].count += 1
		// 		} else {
		// 			this.arrayOfGenres.push({
		// 				name: genre,
		// 				count: 0,
		// 			})
		// 		}
		// 	})
		// })
		// ))) 
		
		// .map(response => {
		// 	response.artists.map(artist => artist.items.map(artistMetadata => {
		// 		artistMetadata.genres.forEach(genre => {
		// 			if (arrayOfGenres.find(x => x.name === genre) != null ){
		// 				arrayOfGenres.filter(val => val.name === genre)[0].count += 1
		// 			} else {
		// 				arrayOfGenres.push({
		// 					name: genre,
		// 					count: 0,
		// 				})
		// 			}
		// 		})
		// 	}))

		// 	console.log(arrayOfGenres)
		// })
	}
}
