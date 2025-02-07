import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '@gameService';
import { LoadingService } from '@loadingService';
import { HeaderGameComponent } from '@components/header-game/header-game.component';
import { TableComponent } from '@components/table/table.component';
import { CardOptionsComponent } from '@components/card-options/card-options.component';
import { FormUserComponent } from '@components/form-user/form-user.component';

@Component({
    selector: 'app-create-game',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterOutlet, FormUserComponent, HeaderGameComponent, TableComponent, CardOptionsComponent],
    templateUrl: './create-game.page.html',
    styleUrl: './create-game.page.scss',
})
export class CreateGamePage implements OnInit {

    public gameForm: FormGroup = this.formBuilder.group({
        nameGame: ['', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
            Validators.pattern(/^(?=(?:[^0-9]*[0-9]){0,3}[^0-9]*$)[ñÑa-zA-Z0-9\s]{5,20}$/),]],
    })

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private gameService: GameService,
        private loadingService: LoadingService
    ) { }

    ngOnInit() {
    }

    validateCharacterForm() {
        let valor = '';
        let field = this.gameForm.controls['nameGame'].value;
        if (field != undefined) {
            for (let i = 0; i < field.length; i++) {
                let tecla = field[i].charCodeAt(0);
                let tecla_final = String.fromCharCode(tecla);
                if (tecla == 8 || /[ñÑA-Za-z0-9\s]/.test(tecla_final)) {
                    valor += field[i];
                }
            }
        }
        this.gameForm.patchValue({ nameGame: valor });
        this.gameForm.updateValueAndValidity();
    }

    onSubmit() {
        if (this.gameForm.valid) {
            this.gameService.newGame(this.gameForm.get('nameGame')?.value);
            this.loadingService.show();
            setTimeout(() => {
                this.router.navigate(['/game']);
                this.loadingService.hide();
            }, 1000);
        }
    }

}
