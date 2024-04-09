import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [FormsModule, DecimalPipe, CommonModule],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css',
})
export class InputsComponent {
  billValue: number = 0;
  tipClicked: number = 0;
  tipAmountPerson: number = 0;
  totalAmountPerson: number = 0;
  person: number = 0;
  customValue: number = NaN;
  isCustomInput: boolean = true;
  personTouched: boolean = false;
  @ViewChild('customInput') customInput!: ElementRef<HTMLInputElement>;

  constructor() {}

  handleBillValueChange(): void {
    this.calculateTotal();
  }

  handlePeopleChange(): void {
    this.calculateTotal();
    this.personTouched = true;
  }

  handleTipClick(tipValue: number) {
    this.tipClicked = tipValue;
    this.calculateTotal();
  }
  handleCustomInput() {
    if (isNaN(this.customValue)) {
      return;
    }
    this.tipClicked = parseFloat(this.customValue.toString());
    this.calculateTotal();
  }

  resetInput() {
    this.customInput.nativeElement.value = ''; // Clear the input field
    this.customValue = NaN; // Reset the custom value to NaN
    this.isCustomInput = true; // Display "Custom" as placeholder text
  }
  handleReset() {
    this.resetInput();
    this.billValue = 0;
    this.tipClicked = 0;
    this.person = 0;
    this.tipAmountPerson = 0;
    this.totalAmountPerson = 0;
    this.personTouched = false;
    this.customValue = NaN;
  }

  private calculateTotal(): void {
    if (isNaN(this.billValue) || isNaN(this.tipClicked) || isNaN(this.person)) {
      this.tipAmountPerson = 0;
      this.totalAmountPerson = 0;
      return;
    }
    if (this.person === 0) {
      this.tipAmountPerson = 0;
    } else {
      this.tipAmountPerson = +(
        (this.billValue * this.tipClicked) /
        100 /
        this.person
      ).toFixed(2);
      this.totalAmountPerson = +(
        (this.billValue + this.tipAmountPerson * this.person) /
        this.person
      ).toFixed(2);
    }
  }
}
