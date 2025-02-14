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
export class FormUserComponent implements OnInit {

  showModalUserForm: boolean = true;

  public formUser: FormGroup = this.formBuilder.group({
    userName: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern(/^(?!(?:\D*\d){4})(?!^\d+$)[\d\D]*$/),]],
    role: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public gameService: GameService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('gameName') && sessionStorage.getItem('userName')) {
      this.showModalUserForm = false;
      this.gameService.setUserName(sessionStorage.getItem('userName')!)
      this.gameService.newGame(sessionStorage.getItem('gameName')!)
    }
  }

  onSubmit() {
    if (this.formUser.valid) {
      this.loadingService.show();
      sessionStorage.setItem('userName', this.formUser.get('userName')?.value);
      this.gameService.setUserName(this.formUser.get('userName')?.value);
      this.gameService.setRoleUser(this.formUser.get('role')?.value);
      setTimeout(() => {
        this.showModalUserForm = false;
        this.loadingService.hide();
      }, 3000);
    }
  }

  getUserNameError(): string {
    if (this.formUser.get('userName')?.invalid) {
      if (this.formUser.get('userName')?.hasError('required')) return 'Por favor ingresa un nombre';
      if (this.formUser.get('userName')?.hasError('minlength')) return 'Por favor ingresa minimo 5 caracteres';
      if (this.formUser.get('userName')?.hasError('maxlength')) return 'Solo se permiten 20 caracteres';
      if (this.formUser.get('userName')?.hasError('pattern')) return 'Solo se permiten 3 numeros';
    }
    return '';
  }

  validateCharacterForm() {
    let valor = '';
    let field = this.formUser.controls['userName'].value;
    if (field != undefined) {
      for (let i = 0; i < field.length; i++) {
        let tecla = field[i].charCodeAt(0);
        let tecla_final = String.fromCharCode(tecla);
        if (tecla == 8 || /[ñÑA-Za-z0-9\s]/.test(tecla_final)) {
          valor += field[i];
        }
      }
    }
    this.formUser.patchValue({ userName: valor });
    this.formUser.updateValueAndValidity();
  }

}
