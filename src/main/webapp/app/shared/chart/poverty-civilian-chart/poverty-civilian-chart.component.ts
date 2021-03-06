import { Component, Input, OnInit } from '@angular/core';
import { PovertyCivilianService } from 'app/entities/poverty-civilian/poverty-civilian.service';

@Component({
  selector: 'jhi-poverty-civilian-chart',
  templateUrl: './poverty-civilian-chart.component.html',
  styleUrls: ['./poverty-civilian-chart.component.scss']
})
export class PovertyCivilianChartComponent implements OnInit {
  @Input() containerClass = 'col-md-4';
  single: any[] = [];
  view: any[] = [700, 400];

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };

  constructor(private povertyCivilianService: PovertyCivilianService) {}

  ngOnInit(): void {
    this.povertyCivilianService.getRatio().subscribe(result => {
      if (result.body?.total === 0 && result.body?.size === 0) {
        this.single = [];
        return;
      }
      this.single = [
        { name: 'Total Warga', value: result.body?.total },
        { name: 'Jumlah Warga Miskin', value: result.body?.size }
      ];
    });
  }

  onSelect(data: any): void {}

  onActivate(data: any): void {}

  onDeactivate(data: any): void {}
}
