import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RvDialog } from "@revealbi/ui";

@Component({
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: "ui-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent {
  @ViewChild("dialog") dialog!: ElementRef<RvDialog>;
  @Input() title: string = "";
  @Input() open: boolean = false;

  show(): Promise<any> {
    return this.dialog.nativeElement.show();
  }

  close(source: any | "close-button" | "overlay") {
    this.dialog.nativeElement.close(source);
  }
}
