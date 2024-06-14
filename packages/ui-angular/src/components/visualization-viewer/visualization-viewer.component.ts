import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { VisualizationViewer, VisualizationViewerOptions } from '@revealbi/ui';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'visualization-viewer',
  template: `<div #revealView [id]="id"></div>`,
  styleUrls: ['./visualization-viewer.component.scss'],
})
export class VisualizationViewerComponent implements AfterViewInit, OnChanges {

  @ViewChild('revealView') el!: ElementRef;
  private viewer!: VisualizationViewer;
  id: string = `revealView-${Math.random().toString(36).substr(2, 9)}`; 

  /**
   * The dashboard to be displayed.
   */
  @Input() dashboard?: string | unknown;

  /**
   * The options to configure the visualization viewer.
   */
  @Input() options?: VisualizationViewerOptions;
  
  /**
   * The visualization to be displayed.
   */
  @Input() visualization?: string | number;

  ngAfterViewInit(): void {
    this.viewer = new VisualizationViewer(this.el.nativeElement, this.dashboard, this.visualization, this.options);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dashboard"] && !changes["dashboard"].isFirstChange()) {
      this.viewer.updateDashboard(this.dashboard, this.visualization);
    } else if (changes["options"] && !changes["options"].isFirstChange()) {
      this.viewer.updateOptions(this.options);
    } else if (changes["visualization"] && !changes["visualization"].isFirstChange()) {
      this.viewer.updateVisualization(this.visualization);
    }
  }  
}
