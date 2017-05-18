import { Component, OnInit } from '@angular/core';
import { PostDiControllerService } from 'app/services/backend/postdiController.service';
import * as d3 from 'd3';
import { Observable } from 'rxjs/Observable';
import { NouisliderModule } from 'ng2-nouislider';

@Component({
  selector: 'post-disposable-income-slider-bar',
  templateUrl: 'slider-bar.component.html',
  styleUrls: ['slider-bar.component.css']
})

export class SliderBarComponent implements OnInit {
  private show: boolean = false;
  private nouiSlider: { min: number, max: number, value: number, config: any };
  private yearExtent: number[];

  constructor(private pcs: PostDiControllerService, private ns: NouisliderModule) {
    this.nouiSlider = {
      min: 0,
      max: 0,
      value: 0,
      config: 0
    }
  }

  ngOnInit() {
    this.pcs.getPostDis().subscribe((di) => {
      this.yearExtent = d3.extent(di, d => {
        return d['year'];
      });
      this.setNouiSlider();
      this.loadingHTML();
    });
  };

  onSlideYear(userSelected: number) {
    console.log(userSelected);
  }

  /**
   * set the all values of nouiSlider
   */
  setNouiSlider(): void {
    this.nouiSlider.min = this.yearExtent[0];
    this.nouiSlider.max = this.yearExtent[1];
    this.nouiSlider.value = this.yearExtent[1];
    this.nouiSlider.config = {
      behaviour: 'tap',
      start: [this.nouiSlider.min, this.nouiSlider.max],
      step: 1,
      pageSteps: this.nouiSlider.max - this.nouiSlider.min,
      range: {
        min: this.nouiSlider.min,
        max: this.nouiSlider.max
      },
      pips: {
        mode: 'count',
        density: 100,
        values: this.nouiSlider.max - this.nouiSlider.min + 1,
        stepped: true
      }
    };
  }//..setNouiSlider

  /**
   * loading HTML when subscribe is done.
   */
  loadingHTML() {
    //when show = true, open class in html, and go to loading properties on nouislider
    this.show = true;
  }
}

