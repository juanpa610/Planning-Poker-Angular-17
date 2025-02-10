import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '@gameService';
import { LoadingService } from '@loadingService';

@Component({
    selector: 'app-create-game',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule,],
    templateUrl: './create-game.page.html',
    styleUrl: './create-game.page.scss',
})
export class CreateGamePage implements OnInit {

    public gameForm: FormGroup = this.formBuilder.group({
        gameName: ['', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
            Validators.pattern(/^(?!(?:\D*\d){4})(?!^\d+$)[\d\D]*$/),]],
    });

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private gameService: GameService,
        private loadingService: LoadingService
    ) { }

    ngOnInit() {
    }

    getFormControl(controlName: string) {
        return this.gameForm.get(controlName);
    }

    getGameNameError(): string {
        if (this.gameForm.get('gameName')?.invalid) {
            if (this.gameForm.get('gameName')?.hasError('required')) return 'Por favor ingresa un nombre';
            if (this.gameForm.get('gameName')?.hasError('minlength')) return 'Por favor ingresa minimo 5 caracteres';
            if (this.gameForm.get('gameName')?.hasError('maxlength')) return 'Solo se permiten 20 caracteres';
            if (this.gameForm.get('gameName')?.hasError('pattern')) return 'Solo se permiten 3 numeros';
        }
        return '';
    }

    validateCharacterForm() {
        let valor = '';
        let field = this.gameForm.controls['gameName'].value;
        if (field != undefined) {
            for (let i = 0; i < field.length; i++) {
                let tecla = field[i].charCodeAt(0);
                let tecla_final = String.fromCharCode(tecla);
                if (tecla == 8 || /[ñÑA-Za-z0-9\s]/.test(tecla_final)) {
                    valor += field[i];
                }
            }
        }
        this.gameForm.patchValue({ gameName: valor });
        this.gameForm.updateValueAndValidity();
    }

    onSubmit() {
        if (this.gameForm.valid) {
            const gameName = this.gameForm.get('gameName')?.value;
            this.gameService.newGame(gameName);
            sessionStorage.setItem('gameName', gameName);
            this.loadingService.show();
            setTimeout(() => {
                this.router.navigate(['/game']);
                this.loadingService.hide();
            }, 500);
        }
    }

}
