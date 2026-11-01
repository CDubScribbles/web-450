/**
 * Week 2 Major (M-068): Sales by Salesperson report.
 * Adapted from sales-by-region-tabular. There is no region form here, because
 * the report covers every salesperson, so the data loads as soon as the page opens.
 */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TableComponent } from './../../../shared/table/table.component';

@Component({
  selector: 'app-sales-by-salesperson',
  standalone: true,
  imports: [TableComponent],
  template: `
    <h1>Sales by Salesperson</h1>
    <div class="salesperson-container">
      @if (salesData.length > 0) {
        <div class="card chart-card">
          <app-table
            [title]="'Sales by Salesperson'"
            [data]="salesData"
            [headers]="['Sales Person', 'Total Sales']"
            [sortableColumns]="['Sales Person', 'Total Sales']"
            [headerBackground]="'secondary'"
            >
          </app-table>
        </div>
      }
    </div>
  `,
  styles: `
    .salesperson-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .chart-card {
      width: 50%;
      margin: 20px 0;
      padding: 10px;
    }

    app-table {
      padding: 50px;
    }
  `
})
export class SalesBySalespersonComponent {
  salesData: any[] = [];

  constructor(private http: HttpClient) {
    // Same endpoint the server test covers: GET /api/reports/sales/salespeople
    this.http.get(`${environment.apiBaseUrl}/reports/sales/salespeople`).subscribe({
      next: (data: any) => {
        // Rename the API fields to the column headers the table expects
        this.salesData = data.map((row: any) => ({
          'Sales Person': row.salesperson,
          'Total Sales': row.totalSales
        }));
      },
      error: (err) => {
        console.error('Error fetching sales by salesperson:', err);
      }
    });
  }
}