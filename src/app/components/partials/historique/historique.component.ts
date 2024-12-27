import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {
  @Output() closeOverlay = new EventEmitter<void>();

  close() {
    this.closeOverlay.emit();
  }
}
