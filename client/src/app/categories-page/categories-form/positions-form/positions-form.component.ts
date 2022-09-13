import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Position } from 'src/app/shared/models/position.interface';
import { PositionsService } from 'src/app/shared/services/positions.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css'],
})
export class PositionsFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input('categoryId') categoryId: any;
  @ViewChild('modal') modalRef: ElementRef;
  positions: Position[] = [];
  loading = false;
  positionId: string | null = null;
  modal: MaterialInstance;
  form: FormGroup;

  constructor(private positionsService: PositionsService) {}

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnInit(): void {
    console.log(this.categoryId);
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
    });

    this.loading = true;
    this.positionsService.fetch(this.categoryId).subscribe((positions) => {
      this.positions = positions;
      this.loading = false;
    });
    this.loading = false;
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id as string;
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onAddPosition() {
    this.positionId = null;
    this.modal.open();
    this.form.reset({
      name: null,
      cost: 1,
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onDeletePosition(event: Event,position: Position){
    event.stopPropagation();
   const decision = window.confirm(`удалить позицию ${position.name}`)
    if (decision) {
      this.positionsService.delete(position).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(idx,1);
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  onCancel() {
    this.modal.close();
  }

  completed() {
    this.modal.close();
    this.form.reset({ name: '', cost: 1 });
    this.form.enable();
  }

  onSubmit() {
    this.form.disable();
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionsService.update(newPosition).subscribe(
        (position: Position) => {
          const idx = this.positions.findIndex( p => p._id === position._id);
          this.positions[idx] = position;
          MaterialService.toast('позиция отредактирована');
          this.positions.push(position);
        },
        (error: any) => MaterialService.toast(error.error.message),
        this.completed
      );
    } else {
      this.positionsService.create(newPosition).subscribe(
        (position: Position) => {
          console.log(position);
          MaterialService.toast('позиция создана');
          this.positions.push(position);
        },
        (error: any) => MaterialService.toast(error.error.message),
        this.completed
      );
    }
  }
}
