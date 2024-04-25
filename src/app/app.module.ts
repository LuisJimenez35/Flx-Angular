import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SearchComponent } from './components/search/search.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import {HttpClientModule} from '@angular/common/http';
import { MovieApiServiceService } from './services/movie-api-service.service';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        WelcomeComponent,
        SearchComponent,
        MovieDetailsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule
    ],
    providers: [MovieApiServiceService],
    bootstrap: []
})
export class AppModule { }
