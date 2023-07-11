
import { Component } from '@angular/core';
import { HostListener, OnInit, ViewChild } from '@angular/core';
import { Categorie } from './categorie/categorie';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importer le module FormsModule;
import { ElementRef } from '@angular/core';
import { CategorieService } from './categorie/categorie.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import unidecode from 'unidecode';
import { Departement } from './departement/departement';
import { DepartementService } from './departement/departement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }


  refreshPage() {
    // Rafraîchir la page

    // Afficher la boîte de dialogue
    alert('Documents non lus récupérés avec succès.');
  }









  pageHtml: string = '';


  publicdeptNames: string[] = [];
  public categories: Categorie[] = [];
  
  public users: User[] = [];
  
  @ViewChild('departmentSelect') departmentSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('categorieSelect') categorieSelect!: ElementRef<HTMLSelectElement>;
  
  
  
  public editCategorie: Categorie | undefined|null;
  public deleteCategorie: Categorie | undefined|null;
  
  constructor(private router: Router,private UserService:UserService, private CategorieService: CategorieService, private DepartementService:DepartementService ){}
  
  
  ngOnInit() {
    this.getCategories();
    this.getUsers();
    this.getDepartements();
  
  }
  
  
  
  
  
  
  public selectedCategorie: Categorie | null = null; 
  
  
  clearSearchInput() {
    this.searchTerm = '';
    this.getCategories();
    
  }
  
  
  
  
  public getCategories(): void {
    this.CategorieService.getCategories().subscribe(
      (response: Categorie[]) => {
        this.categories = response;
        console.log(this.categories);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public getUsers(): void {
    this.UserService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  
  
  
  public onAddCategorie(addForm: NgForm): void {
    this.CategorieService.addCategorie(addForm.value).subscribe(
      (response: Categorie) => {
        console.log(response);
        this.getCategories();
        addForm.reset();
        document.getElementById('add-Categorie-form')!.click();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  
  
  
  
  public selectedCategorieId: number=5;
  
  public   onUpdateCategorie(Categorie: Categorie): void {
  
    this.CategorieService.updateCategorie(Categorie).subscribe(
      (response: Categorie) => {
        console.log(response);
        this.getCategories();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  
  
  
  public onDeleteCategorie(CategorieId: number|undefined): void {
    if (CategorieId){
      this.CategorieService.deleteCategorie(CategorieId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCategories();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }
    
  }
  
  
  public searchTerm: string = '';
  
  
  
  
  
  
  
  filteredDepartments: Categorie[] = [];
  
  
  
  
  
  
  
  
  searchTermm: string = '';
  
  
  // Recherche Categorie
  
  
  public searchCategoriess(key: string): void {
    console.log(key);
    const searchTerms = key.toLowerCase().split(' ').filter(term => term !== '');
  
    if (searchTerms.length === 0) {
      this.getCategories();
      return;
    }
  
    const results: Categorie[] = [];
  
    for (const categorie of this.categories) {
      let found = false;
  
      for (const term of searchTerms) {
        const normalizedTerm = unidecode(term);
        const normalizedNom = unidecode(categorie.nom.toLowerCase());
        const normalizedDescription = unidecode(categorie.description.toLowerCase());
  
        const termFoundInNom = normalizedNom.includes(normalizedTerm);
        const termFoundInDescription = normalizedDescription.includes(normalizedTerm);
  
        if (termFoundInNom || termFoundInDescription) {
          found = true;
          break;
        }
      }
  
      if (found) {
        results.push(categorie);
      }
    }
  
    this.categories = results;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  public searchItems(key: string): void {
    console.log(key);
    const searchTerms = key.toLowerCase().split(' ').filter(term => term !== '');
  
    if (searchTerms.length === 0) {
      this.getDepartements();
      this.getCategories();
      return;
    }
  
    const departementResults: Departement[] = [];
    const categorieResults: Categorie[] = [];
  
    for (const departement of this.departements) {
      let found = false;
  
      for (const term of searchTerms) {
        const normalizedTerm = unidecode(term);
        const normalizedNom = unidecode(departement.nom.toLowerCase());
        const normalizedDescription = unidecode(departement.description.toLowerCase());
  
        const termFoundInNom = normalizedNom.includes(normalizedTerm);
        const termFoundInDescription = normalizedDescription.includes(normalizedTerm);
  
        if (termFoundInNom || termFoundInDescription) {
          found = true;
          break;
        }
      }
  
      if (found) {
        departementResults.push(departement);
      }
    }
  
    for (const categorie of this.categories) {
      let found = false;
  
      for (const term of searchTerms) {
        const normalizedTerm = unidecode(term);
        const normalizedNom = unidecode(categorie.nom.toLowerCase());
        const normalizedDescription = unidecode(categorie.description.toLowerCase());
  
        const termFoundInNom = normalizedNom.includes(normalizedTerm);
        const termFoundInDescription = normalizedDescription.includes(normalizedTerm);
  
        if (termFoundInNom || termFoundInDescription) {
          found = true;
          break;
        }
      }
      if (found) {
        categorieResults.push(categorie);
      }
    }
  
    this.departements = departementResults;
    this.categories = categorieResults;
  }
  
  
  
  
  public departements: Departement[] = [];
  public getDepartements(): void {
    this.DepartementService.getDepartements().subscribe(
      (response: Departement[]) => {
        this.departements = response;
        console.log(this.departements);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  const encodedString = 'Hello%20World%21';
  const decodedString = decodeURIComponent(encodedString);
  console.log(decodedString); // Output: "Hello World!"
  
    
  }


  
}

