import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp({"projectId":"sumativariverasalinas","appId":"1:969177427789:web:308e9562e15d811346d104","storageBucket":"sumativariverasalinas.appspot.com","apiKey":"AIzaSyChi5a-rXryy-T_jt__pjxNwZKElnRPcf0","authDomain":"sumativariverasalinas.firebaseapp.com","messagingSenderId":"969177427789"}))
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  
  
})
export class AppModule {}
