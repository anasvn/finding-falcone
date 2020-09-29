import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loading = true;
  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.isLoading.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }
}
