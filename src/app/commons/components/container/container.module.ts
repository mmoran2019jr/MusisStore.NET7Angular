import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedFormBasicModule } from '../../shared/shared-form-basic.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './container.component';

@NgModule({
	declarations: [ContainerComponent, FooterComponent, HeaderComponent],
	imports: [SharedFormBasicModule, RouterModule],
	exports: [ContainerComponent]
})
export class ContainerModule {}
