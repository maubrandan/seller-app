const fs = require('fs');
const path = require('path');

// Función para crear un directorio y sus subdirectorios
function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Función para crear un archivo con contenido opcional
function createFile(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
  }
}

// Ruta base del proyecto
const baseDir = path.join(__dirname, 'seller-app');

// Estructura de directorios
const directories = [
  'e2e/src',
  'src/app/core/interceptors',
  'src/app/core/services',
  'src/app/core/guards',
  'src/app/core/models',
  'src/app/features/feature1/components',
  'src/app/features/feature1/services',
  'src/app/features/feature2/components',
  'src/app/features/feature2/services',
  'src/app/shared/components',
  'src/app/shared/directives',
  'src/app/shared/pipes',
  'src/assets/images',
  'src/assets/styles',
  'src/environments'
];

// Archivos base y su contenido
const files = [
  { path: 'src/app/core/core.module.ts', content: '' },
  { path: 'src/app/features/feature1/feature1.module.ts', content: '' },
  { path: 'src/app/features/feature2/feature2.module.ts', content: '' },
  { path: 'src/app/shared/shared.module.ts', content: '' },
  { path: 'src/app/app-routing.module.ts', content: `
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Feature1Component } from './features/feature1/components/feature1.component';
import { Feature2Component } from './features/feature2/components/feature2.component';

const routes: Routes = [
  { path: 'feature1', component: Feature1Component },
  { path: 'feature2', component: Feature2Component },
  { path: '', redirectTo: '/feature1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
` },
  { path: 'src/app/shared/components/menu/menu.component.ts', content: `
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {}
` },
  { path: 'src/app/shared/components/menu/menu.component.html', content: `
<nav>
  <ul>
    <li><a routerLink="/feature1" routerLinkActive="active">Feature 1</a></li>
    <li><a routerLink="/feature2" routerLinkActive="active">Feature 2</a></li>
  </ul>
</nav>
` },
  { path: 'src/app/shared/components/menu/menu.component.scss', content: `
nav ul {
  list-style-type: none;
  padding: 0;
}
nav li {
  display: inline;
  margin-right: 10px;
}
nav a.active {
  font-weight: bold;
}
` },
  { path: 'src/app/app.component.html', content: `
<app-menu></app-menu>
<router-outlet></router-outlet>
` },
  { path: 'src/app/app.component.ts', content: `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-angular-project';
}
` },
  { path: 'src/app/app.module.ts', content: `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
` },
  { path: 'src/assets/styles/styles.scss', content: '' },
  { path: 'src/environments/environment.ts', content: 'export const environment = { production: false };' },
  { path: 'src/environments/environment.prod.ts', content: 'export const environment = { production: true };' },
  { path: 'src/index.html', content: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>My Angular Project</title></head><body><app-root></app-root></body></html>' },
  { path: 'src/main.ts', content: `
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
` },
  { path: 'src/polyfills.ts', content: '' },
  { path: 'src/styles.scss', content: '' },
  { path: 'src/test.ts', content: '' },
  { path: '.editorconfig', content: '' },
  { path: '.gitignore', content: 'node_modules/' },
  { path: 'angular.json', content: '' },
  { path: 'package.json', content: `
{
  "name": "my-angular-project",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "dependencies": {
    "@angular/animations": "~14.0.0",
    "@angular/common": "~14.0.0",
    "@angular/compiler": "~14.0.0",
    "@angular/core": "~14.0.0",
    "@angular/forms": "~14.0.0",
    "@angular/platform-browser": "~14.0.0",
    "@angular/platform-browser-dynamic": "~14.0.0",
    "@angular/router": "~14.0.0",
    "rxjs": "~7.0.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.11.4"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~14.0.0",
    "@angular/cli": "~14.0.0",
    "@angular/compiler-cli": "~14.0.0",
    "@types/node": "^12.11.1",
    "@types/jasmine": "~3.8.0",
    "jasmine-core": "~3.8.0",
    "karma": "~6.3.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.0.3",
    "karma-jasmine": "~4.0.0",
    "karma-jasmine-html-reporter": "~1.7.0",
    "protractor": "~7.0.0",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~4.2.0"
  }
}
` },
  { path: 'README.md', content: '# My Angular Project' },
  { path: 'tsconfig.json', content: '' },
  { path: 'tslint.json', content: '' }
];

// Crear directorios
directories.forEach(dir => createDir(path.join(baseDir, dir)));

// Crear archivos
files.forEach(file => createFile(path.join(baseDir, file.path), file.content));

console.log('Project structure with routing and menu component created successfully.');
