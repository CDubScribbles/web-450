import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SalesBySalespersonComponent } from './sales-by-salesperson.component';
import { environment } from '../../../../environments/environment';

describe('SalesBySalespersonComponent', () => {
  let component: SalesBySalespersonComponent;
  let fixture: ComponentFixture<SalesBySalespersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SalesBySalespersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesBySalespersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2
  it('should display the title "Sales by Salesperson"', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Sales by Salesperson');
  });

  // Test 3
  it('should load the API data and map it to the table columns', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/reports/sales/salespeople`);
    req.flush([
      { salesperson: 'Jane Smith', totalSales: 1500 },
      { salesperson: 'John Doe', totalSales: 1000 }
    ]);
    fixture.detectChanges();

    expect(component.salesData).toEqual([
      { 'Sales Person': 'Jane Smith', 'Total Sales': 1500 },
      { 'Sales Person': 'John Doe', 'Total Sales': 1000 }
    ]);
    expect(fixture.nativeElement.querySelector('app-table')).toBeTruthy();
  });
});