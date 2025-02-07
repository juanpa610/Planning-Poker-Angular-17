import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '@gameService';
import { LoadingService } from '@loadingService';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss',
})
export class FormUserComponent  implements OnInit {

  public formUser: FormGroup = this.formBuilder.group({
    nameUser: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern(
        /^(?=(?:[^0-9]*[0-9]){0,3}[^0-9]*$)[ñÑa-zA-Z0-9\s]{5,20}$/
      ),]], 
    role: ['', Validators.required]
  });

  showModalUserForm: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public gameService: GameService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {}

  onSubmit() {
    if (this.formUser.valid) {
      this.loadingService.show();
      this.gameService.setNameUser(this.formUser.get('nameUser')?.value);
      this.gameService.setRoleUser(this.formUser.get('role')?.value);
      setTimeout(() => {
        this.loadingService.hide();
        this.showModalUserForm = false;
      }, 3000);
    }
  }

  validateCharacterForm() {
    let valor = '';
    let field = this.formUser.controls['nameUser'].value;
    if (field != undefined) {
      for (let i = 0; i < field.length; i++) {
        let tecla = field[i].charCodeAt(0);
        let tecla_final = String.fromCharCode(tecla);
        if (tecla == 8 || /[ñÑA-Za-z0-9\s]/.test(tecla_final)) {
          valor += field[i];
        }
      }
    }
    this.formUser.patchValue({ nameUser: valor });
    this.formUser.updateValueAndValidity();
  }

}
